const fs = require('fs'),
readline = require('readline'),
stream = require('stream');
		
		var instream = fs.createReadStream('../data_Source/Production-Department_of_Agriculture_and_Cooperation_1.csv'),
			outstream = new stream;
		outstream.readable = true;
		outstream.writable = true;

		var outfile1 = '../json/json1.json',outfile2 = '../json/json2.json',outfile3 = '../json/json3.json',outfile4 = '../json/json4.json';
		var rl = readline.createInterface({input: instream,output: outstream,terminal: false}),
		lineCount=0,
		myHeader="",
		recordCount=0,
		result1 = [],
		result2 = [],
		result3 = [],
		result4 = [],
		temp =[];

		fs.writeFileSync(outfile1,'','utf-8');
		fs.writeFileSync(outfile2,'','utf-8');
		fs.writeFileSync(outfile3,'','utf-8');
		fs.writeFileSync(outfile4,'','utf-8');

		rl.on('line', function(line) 
		{
			
			var headers = myHeader.split(","),//all headers
			obj = {},
			row = line,
			headCount = 0,
			startValue = 0,
			count = 0;	
						while (count < row.length) //check all char 
						{
							var c = row[count];
							if (c == '"') //to check if this char is " or not......
							{
								do
								{
									c = row[++count]; 
									
								} 
								while(c !== '"' && count < row.length - 1);
							}

							if (c == ',' || count == row.length - 1) //to check each column with ,
							{
								
								var value = row.substr(startValue,count - startValue).trim();//one column

								/* skip first double quote */
								if (value[0] == '"') 
								{ 
									value = value.substr(1); 
								}
								/* skip last comma */
								if (value[value.length - 1] == ',') 
								{ 
									value = value.substr(0, value.length - 1); 
								}
								/* skip last double quote */
								if (value[value.length - 1] == '"') 
								{ 
									value = value.substr(0, value.length - 1); 
								}

								var key = headers[headCount++];
								obj[key] = value;
								startValue = count + 1;
							}
							++count;
						}
						if(lineCount==0)
						{
							lineCount++;
							myHeader=line;
						}
						else
						{
							//filtering for 1st json
							if(obj['Particulars'].includes("Oilseeds"))
							{
								var oil=obj.Particulars.split(" ");
								var fin=oil[2];
								if(fin=="Oilseeds")
								{
									var obj1={};
									obj1["Oilseeds"]= obj.Particulars.substr(32);
									obj1["Production"]=obj[' 3-2013'];
									result1.push(obj1);
								}
							}
							//end of filter 1

							//filtering for 2nd json file
							if(obj['Particulars'].includes("Agricultural Production Foodgrains"))
							{
								if(!(obj['Particulars'].includes("Yield")||
									obj['Particulars'].includes("Area")||
									obj['Particulars'].includes("Volume")||
									obj['Particulars'].includes("Foodgrains Production Foodgrains")))
								{
									var obj2={};
									obj2["Foodgrains"]=obj.Particulars.substr(34);
									obj2["Production"]=obj[' 3-2013'];
									result2.push(obj2);
								}
							}
							//end of filter 3
							
							//filtering for 3rd json file
							if(obj['Particulars'].includes("Commercial"))
							{

								for (var k = 3, j = 0; k < headers.length; k++,j++) 
								{
									if (isNaN(temp[j])) {temp[j] = 0;}
									if(obj[headers[k]] === 'NA')
										{continue;}
									else
										{temp[j] += parseFloat(obj[headers[k]]);}
								}

							}
							//end of filter 3
							
							//filtering for 4th json
							if(obj['Particulars'].includes("Rice Yield Andhra Pradesh")
								||obj['Particulars'].includes("Rice Yield Kerala")
								||obj['Particulars'].includes("Rice Yield Tamil Nadu")
								||obj['Particulars'].includes("Rice Yield Karnataka"))
							{
								var obj4 = {};
								for (var k = 3, j=1993; k < headers.length; k++,j++) 
								{
									if(obj[headers[k]] === 'NA' ||obj[headers[k]] === 'N')
									obj4[j]="0";
									else
									obj4[j]=obj[headers[k]].substr(45);
								}
								result4.push(obj4);
							}
							//end of filter 4
					}
	});

		rl.on('close', function()
		{
			
			var res1 = [];
			res1 = result1.sort(function (a, b) //sorting in descending order
			{
				return parseFloat(b['Production'])-parseFloat(a['Production']);
			}
			);
			fs.appendFile(outfile1, JSON.stringify(res1)+"\n", function (err) 
			{

			});

			var res2 = [];
			res2 = result2.sort(function (a, b) //sorting in descending order
			{
				return parseFloat(b['Production'])-parseFloat(a['Production']);
			}
			);
			fs.appendFile(outfile2, JSON.stringify(res2)+"\n", function (err) 
			{

			});

			//pushing aggregated values of 3rd filter to array
			for (var m=1993, l=0; m<=2014; l++, m++) 
			{

				var obj3= {};
				obj3['year'] = m;
				obj3['val'] = temp[l];
				result3.push(obj3);
			}
			fs.appendFile(outfile3, JSON.stringify(result3)+"\n", function (err) 
			{

			});
			// 4th array
			fs.appendFile(outfile4, JSON.stringify(result4)+"\n", function (err) 
			{

			});
	});

		console.log("Records Written");	
		var start= Date.now();
		process.on("exit",function()
		{
			var end=Date.now();
			console.log("This " + (end-start)/1000 + " milliseconds.")
		});



