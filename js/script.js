		var fs = require('fs'),
			readline = require('readline'),
			stream = require('stream');
		
		var instream = fs.createReadStream('../data_Source/Production-Department_of_Agriculture_and_Cooperation_1.csv');
		var outstream = new stream;
		outstream.readable = true;
		outstream.writable = true;

		var outfile1 = '../json/json1.json',outfile2 = '../json/json2.json',outfile3 = '../json/json3.json',outfile4 = '../json/json4.json';

		fs.writeFileSync(outfile1,'','utf-8');
		fs.writeFileSync(outfile2,'','utf-8');
		fs.writeFileSync(outfile3,'','utf-8');
		fs.writeFileSync(outfile4,'','utf-8');

		var rl = readline.createInterface({input: instream,output: outstream,terminal: false});

		var lineCount=0;
		var myHeader="";
		var recordCount=0;
		var result1 = [];
		var result2 = [];
		var result3 = [];
		var result4 = [];
		var obj3={};
		
		var sum93 = 0,sum94 = 0,sum95 = 0,sum96 = 0,sum97 = 0,sum98 = 0,sum99 = 0,sum00 = 0,sum01 = 0,sum02 = 0,sum03 = 0,sum04 = 0,sum05 = 0,sum06 = 0,sum07 = 0,sum08 = 0,sum09 = 0,sum10 = 0,sum11 = 0,sum12 = 0,sum13 = 0,sum14 = 0;

		rl.on('line', function(line) 
		{
			
			var headers = myHeader.split(",");//all headers
			var obj = {};

			var row = line,
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
							//console.log(myHeader);
							
							
						}
						else
						{
							
							if(obj['Particulars'].includes("Oilseeds"))
							{
							var oil=obj.Particulars.split(" ");
							var fin=oil[2];
							if(fin=="Oilseeds")
								{
								var obj1={};
								obj1["Oilseeds"]= obj.Particulars;
								obj1["Production"]=obj[' 3-2013'];
								result1.push(obj1);
								}
							}


						 if(obj['Particulars'].includes("Agricultural Production Foodgrains"))
							{
								if(!(obj['Particulars'].includes("Yield")||
									obj['Particulars'].includes("Area")||
									obj['Particulars'].includes("Volume")||
									obj['Particulars'].includes("Foodgrains Production Foodgrains")))
								{
									var obj2={};
									obj2["Foodgrains"]=obj.Particulars;
									obj2["Production"]=obj[' 3-2013'];
									result2.push(obj2);
								}
							}

							if(obj['Particulars'].includes("Commercial"))
							{
							
								if(obj[' 3-1993'] == 'NA'){obj[' 3-1993']= 0;}  sum93 = sum93 + +(obj[' 3-1993']);
								if(obj[' 3-1994'] == 'NA'){obj[' 3-1994']= 0;}	sum94 = sum94 + +(obj[' 3-1994']);
								if(obj[' 3-1995'] == 'NA'){obj[' 3-1995']= 0;}	sum95 = sum95 + +(obj[' 3-1995']);
								if(obj[' 3-1996'] == 'NA'){obj[' 3-1996']= 0;}	sum96 = sum96 + +(obj[' 3-1996']);
								if(obj[' 3-1997'] == 'NA'){obj[' 3-1997']= 0;}	sum97 = sum97 + +(obj[' 3-1997']);
								if(obj[' 3-1998'] == 'NA'){obj[' 3-1998']= 0;}	sum98 = sum98 + +(obj[' 3-1998']);
								if(obj[' 3-1999'] == 'NA'){obj[' 3-1999']= 0;}	sum99 = sum99 + +(obj[' 3-1999']);
								if(obj[' 3-2000'] == 'NA'){obj[' 3-2000']= 0;}	sum00 = sum00 + +(obj[' 3-2000']);
								if(obj[' 3-2001'] == 'NA'){obj[' 3-2001']= 0;}	sum01 = sum01 + +(obj[' 3-2001']);
								if(obj[' 3-2002'] == 'NA'){obj[' 3-2002']= 0;}	sum02 = sum02 + +(obj[' 3-2002']);
								if(obj[' 3-2003'] == 'NA'){obj[' 3-2003']= 0;}	sum03 = sum03 + +(obj[' 3-2003']);
								if(obj[' 3-2004'] == 'NA'){obj[' 3-2004']= 0;}	sum04 = sum04 + +(obj[' 3-2004']);
								if(obj[' 3-2005'] == 'NA'){obj[' 3-2005']= 0;}	sum05 = sum05 + +(obj[' 3-2005']);
								if(obj[' 3-2006'] == 'NA'){obj[' 3-2006']= 0;}  sum06 = sum06 + +(obj[' 3-2006']);
								if(obj[' 3-2007'] == 'NA'){obj[' 3-2007']= 0;}	sum07 = sum07 + +(obj[' 3-2007']);
								if(obj[' 3-2008'] == 'NA'){obj[' 3-2008']= 0;}	sum08 = sum08 + +(obj[' 3-2008']);
								if(obj[' 3-2009'] == 'NA'){obj[' 3-2009']= 0;}	sum09 = sum09 + +(obj[' 3-2009']);
								if(obj[' 3-2010'] == 'NA'){obj[' 3-2010']= 0;}	sum10 = sum10 + +(obj[' 3-2010']);
								if(obj[' 3-2011'] == 'NA'){obj[' 3-2011']= 0;}	sum11 = sum11 + +(obj[' 3-2011']);
								if(obj[' 3-2012'] == 'NA'){obj[' 3-2012']= 0;}	sum12 = sum12 + +(obj[' 3-2012']);
								if(obj[' 3-2013'] == 'NA'){obj[' 3-2013']= 0;}	sum13 = sum13 + +(obj[' 3-2013']);
								if(obj[' 3-2014'] == 'NA'){obj[' 3-2014']= 0;}	sum14 = sum14 + +(obj[' 3-2014']);
								
							obj3["y1993"] = sum93;
							obj3["y1994"] = sum94;
							obj3["y1995"] = sum95;
							obj3["y1996"] = sum96;
							obj3["y1997"] = sum97;
							obj3["y1998"] = sum98;
							obj3["y1999"] = sum99;
							obj3["y2000"] = sum00;
							obj3["y2001"] = sum01;
							obj3["y2002"] = sum02;
							obj3["y2003"] = sum03;
							obj3["y2004"] = sum04;
							obj3["y2005"] = sum05;
							obj3["y2006"] = sum06;
							obj3["y2007"] = sum07;
							obj3["y2008"] = sum08;
							obj3["y2009"] = sum09;
							obj3["y2010"] = sum10;
							obj3["y2011"] = sum11;
							obj3["y2012"] = sum12;
							obj3["y2013"] = sum13;
							obj3["y2014"] = sum14;
							}
						

						 if(obj['Particulars'].includes("Rice Yield Andhra Pradesh")
								||obj['Particulars'].includes("Rice Yield Kerala")
								||obj['Particulars'].includes("Rice Yield Tamil Nadu")
								||obj['Particulars'].includes("Rice Yield Karnataka"))
							{
								var obj4={};
								
								obj4["particulars"]=obj[headers[0]];
								for (let k = 3, j=1993; k < headers.length; k++,j++) 
								{
									
									if(obj[headers[k]]==='NA')
									obj4[j]="0";
									else
									obj4[j]=obj[headers[k]];
								}
								
								result4.push(obj4);
								
							}


	}


	});

		rl.on('close', function()
		{
			
			var res1 = [];
			res1 = result1.sort(function (a, b) 
			{
				return parseFloat(b['Production'])-parseFloat(a['Production']);
			}
			);
			// res1.forEach(function(item)
			// {
				fs.appendFile(outfile1, JSON.stringify(res1)+"\n", function (err) 
				{

				});
			//});

					// fs.appendFile(outfile1, JSON.stringify(res1)+"\n", function (err) 
					// {

					// });			



		var res2 = [];
		res2 = result2.sort(function (a, b) 
		{
			return parseFloat(b['Production'])-parseFloat(a['Production']);
		}
		);

		res2.forEach(function(item)
		{
			fs.appendFile(outfile2, JSON.stringify(item)+"\n", function (err) 
			{

			});
		});


		result3.push(obj3);

		fs.appendFile(outfile3, JSON.stringify(result3)+"\n", function (err) 
		{

		});
		
		result4.forEach(function(item)
		{
			fs.appendFile(outfile4, JSON.stringify(item)+"\n", function (err) 
			{

			});
		});




		});
		console.log("Records Written");	
		var start= Date.now();
		process.on("exit",function()
		{
			var end=Date.now();
			console.log("This " + (end-start)/1000 + " milliseconds.")
		});



