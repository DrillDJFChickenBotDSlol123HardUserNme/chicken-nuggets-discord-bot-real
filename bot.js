const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = "ks/";
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
let coins = require("./coins.json");
const talkedRecently = new Set();
const dailyTimeout = new Set();
const ce = require("embed-creator");
var numeral = require('numeral');
let minimaldaily = require("./dminimaldaily.json")
let maximaldaily = require("./dmaximaldaily.json")
//Startup
client.login(process_env.TOKEN);

client.on("ready", () => {
	console.log(`Online: ${new Date()} COMPLETE FIRST: NaN Glitch Daily Reward`);
	client.user.setActivity("Online");
	
})

client.on("message", async message => {
	//ignore bots
	if(message.author.bot) return;
	
	
	//Coins system:
	if(!coins[message.author.id]) {
		coins[message.author.id] = {
			coins: 10000
		};
	}
	
	if(!minimaldaily[message.author.id]) {
		minimaldaily[message.author.id] = {
			minimaldaily: 10000
		};
		fs.writeFile("./dminimaldaily.json", JSON.stringify(minimaldaily), (err) => {
		if (err) console.log(err)
		});
	}
	if(!maximaldaily[message.author.id]) {
		maximaldaily[message.author.id] = {
			maximaldaily: 20000
		};
		fs.writeFile("./dmaximaldaily.json", JSON.stringify(maximaldaily), (err) => {
		if (err) console.log(err)
		});
	}
	
	
	
	let uCoins = coins[message.author.id].coins;
	
	//Auto Respond
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	if (parseInt(h) < 10) h = "0"+h; 
	if (parseInt(m) < 10) m = "0"+m;
	if (parseInt(s) < 10) s = "0"+s; 
	if (message.channel.name != "spam") {
		console.log("["+h+":"+m+":"+s+"] >> "+message.channel.name+" >> "+message.author.username+": "+message.content)
	}
	var newmessage = (message.content).replace(/[^\w\s]|_/g, "");
	var finalmessage = newmessage.toLowerCase();
	
	if (finalmessage == "hoe gaat het") {
		if (Math.random() < 0.5) {
			message.channel.send("Goed, met jou?")
		} else {
			message.channel.send("Mijn dag is verpest...")
		}
	}
	
	//Make sure
	if(message.content.indexOf(config.prefix) !== 0) return;
	
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	
	
	
					
		
			
			

				   if (command === "bal") {
						let member1 = message.mentions.members.first();
						if (member1 === undefined) {
							member1 = message.author;
						}
						message.channel.send({embed: {
						color: 3447003,
						description: member1 + " has $ " +  numeral(coins[`${member1.id}`].coins).format("0,0") + " balance."
						}});
				   }
			
			
		
			
				
				   if (command === "daily") {
					   if(!minimaldaily[message.author.id]) {
							minimaldaily[message.author.id] = {
								minimaldaily: 10000
							};
							if(!maximaldaily[message.author.id]) {
								maximaldaily[message.author.id] = {
									maximaldaily: 20000
								};
							}
							fs.writeFile("./dminimaldaily.json", JSON.stringify(minimaldaily), (err) => {
								if (err) console.log(err)
							});
							fs.writeFile("./dmaximaldaily.json", JSON.stringify(maximaldaily), (err) => {
								if (err) console.log(err)
							});
											
						}
						
					   if (!dailyTimeout.has(message.author.id))  {
							var dailyreward = Math.floor(Math.random() * (parseInt(maximaldaily[message.author.id].maximaldaily) - parseInt(minimaldaily[message.author.id].minimaldaily) + 1)) + parseInt(minimaldaily[message.author.id].minimaldaily);
							message.channel.send({embed: {
							color: 3447003,
							description: `${message.author}` + ", " + "you recieved your daily reward! (" + dailyreward  + " coins)"

							}});
							coins[message.author.id] = {
							coins: coins[message.author.id].coins + dailyreward
						}
						fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
						});
					// Adds the user to the set so that they can't use this command for 24h
					dailyTimeout.add(message.author.id);
					setTimeout(() => {
				  // Removes the user from the set after 24h
				  dailyTimeout.delete(message.author.id);
				}, 86400000);
				   }  else {
						   message.channel.send({embed: {
							color: 3447003,
							description: "Daily reward can be obtained once every 24h."
							}});
					   }
				   }

				
			
		
		if (command === "getid") {
			message.reply(message.author.id);
		}
		
		//coin flip
		if (command === "flip") {
			let pick = args[0];
			let bet = args[1];
			let user = `${message.author}`
			if (bet !== undefined) {
				bet = bet.toLowerCase()
			} else {
				message.channel.send({embed: {
						color: 3447003,
						description: `${message.author}` + " Command Usage: ```ks/flip [heads/tails] [bet/all/half]```"

						}});
			}
			if (bet.indexOf("k")) bet = bet.replace(/k/,"000");
			if (bet.indexOf("m")) bet = bet.replace(/m/,"000000");
			if (bet.indexOf("b")) bet = bet.replace(/b/,"000000000");
			if (bet.indexOf("t")) bet = bet.replace(/t/,"000000000000");
			if (bet.indexOf("qa")) bet = bet.replace("qa","000000000000000");
			if (bet.indexOf("qi")) bet = bet.replace("qi","000000000000000000");
			if (bet === "all") {
				bet = coins[message.author.id].coins
			}		
			if (bet === "half") {
				bet = coins[message.author.id].coins/2
			}
			if (((pick !== "tails") && (pick !== "heads")) || (pick == undefined)) {
				message.channel.send({embed: {
						color: 3447003,
						description: `${message.author}` + ", you must choose 'heads' or 'tails' instead of " + pick + ". Command Usage: ```ks/flip [heads/tails] [bet/all/half]```"

						}});
				
			} else {
				if (bet > coins[message.author.id].coins) {
					message.channel.send({embed: {
						color: 3447003,
						description: `${message.author}` + ", don't try to bluff me. You've bet " + bet + " coin(s), but you only have " + coins[message.author.id].coins+ " coin(s)." 

						}});
					
					
					
				} else {
					if ((String(bet).match(/[a-z]/i))) {
						message.channel.send({embed: {
						color: 3447003,
						description: `${message.author}` + ", please bet actual numbers instead of letters." 

						}});
					} else {
						
						if ((Math.random() < 0.5)) {
						coins[message.author.id] = {
							coins: (Number(coins[message.author.id].coins) + Number(bet*3))
						}
							fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
						
							message.channel.send(ce(
							  "#00FF00", {"name": "Flip Results:", "icon_url": undefined, "url": undefined},"ðŸ’° It's "+ pick + "! You won:", bet*3 + " ðŸ’°",
								 [{"name": "Bet:", "value":  numeral(bet).format('0,0')},
								 {"name": "Balance:", "value": `${message.author}` + "': $ " + numeral(coins[`${message.author.id}`].coins).format('0,0')},
								 {"name": "Netto gain", "value": numeral((bet*3)-bet).format("0,0")}]
							));
							
						} else {
							coins[message.author.id] = {
							coins: coins[message.author.id].coins - (parseInt(bet))
							}
							fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
							let realpick
							if (pick == "heads") realpick = "tails"
							if (pick == "tails") realpick = "heads"
							message.channel.send(ce(
							  "#FF0000", {"name": "Flip Results:", "icon_url": undefined, "url": undefined},"ðŸ’° It's "+ realpick + "! You lost your bet of", numeral(bet).format("0,0") + "$ ðŸ’°",
								 [{"name": "Bet:", "value":  numeral(bet).format('0,0')},
								 {"name": "Balance:", "value": `${message.author}` + "': $ " + numeral(coins[`${message.author.id}`].coins).format('0,0')}, 
								 {"name": "Netto gain", "value": "-"+(numeral(bet).format("0,0"))}]
							));
						}
						
								
					}
					
					
					
					
				}
				
				
				
			}
			
			
			
			
		}
		
		if(command=="devs") {
			let bottest = message.guild.roles.get("443072310090530856");
			if (message.member.roles.has("443072310090530856")) {
				let cash = args[0];
				
					cash = cash.replace(/k/,"000");
					cash = cash.replace(/m/,"000000");
					cash = cash.replace(/b/,"000000000");
					cash = cash.replace(/t/,"000000000000");
					cash = cash.replace("qa","000000000000000");
					cash = cash.replace("qi","000000000000000000");
				cash = parseInt(cash)	
				
					coins[message.author.id] = {
							coins: coins[message.author.id].coins = cash
							}
							fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
				message.reply(message.author +"'s balance has been set to: $ " + cash)
				fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
			}
		}
		
		if(command=="deva") {
			let bottest = message.guild.roles.get("443072310090530856");
			if (message.member.roles.has("443072310090530856")) {
				let cash = args[0];
					cash = cash.replace(/k/,"000");
					cash = cash.replace(/m/,"000000");
					cash = cash.replace(/b/,"000000000");
					cash = cash.replace(/t/,"000000000000");
					cash = cash.replace("qa","000000000000000");
					cash = cash.replace("qi","000000000000000000");
					coins[message.author.id] = {
							coins: (coins[message.author.id].coins + parseInt(cash))
							}
							fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
				message.reply(message.author +cash+" added!")
				fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
			}
		}
		
		if(command==="devr") {
			let bottest = message.guild.roles.get("443072310090530856");
			if (message.member.roles.has("443072310090530856")) {
				coins[message.author.id] = {
							coins: coins[message.author.id].coins = 10000
							}
							fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
				message.reply(message.author +"'s balance has been reset to $ " + "10000")
				fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
			}
		}
		
		
		if (command==="donate") {
			var person = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
			
			if (!coins[person.id]) {
				coins[person.id].coins = {
					coins: 10000
				};
			}
			let amount = args[1];
			amount = amount.replace(/k/,"000");
			amount = amount.replace(/m/,"000000");
			amount = amount.replace(/b/,"000000000");
			amount = amount.replace(/t/,"000000000000");
			amount = amount.replace("qa","000000000000000");
			amount = amount.replace("qi","000000000000000000");
			var tempamount = parseInt(amount)
			if ((coins[message.author.id].coins)>amount) {
				coins[message.author.id].coins = parseInt(coins[message.author.id].coins) - (tempamount*1);
				fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
				coins[person.id].coins = Number(coins[person.id].coins) + (tempamount*1)
				fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
							if (err) console.log(err)
							});
			   
							message.channel.send(`**Success! :white_check_mark:**\nSuccesfully donated ` + numeral(amount).format("0,0")+"$ to " + person + `\nYour balance: $`+ numeral(coins[message.author.id].coins).format("0,0")+`\n`+person+"'s balance: $" + numeral(coins[person.id].coins).format("0,0"))
			} else {
				
							message.channel.send(`**You don't have enough balance to donate!**\n **Your balance:** $ `+ numeral(coins[message.author.id].coins).format("0,0")+` \n **Donation:** ` + numeral(amount).format("0,0"))
			}
			
		}
		
		
		
		if (command == "help")  {
			message.channel.send(`**Command help // Prefix: ks/**\n ks/help :: Shows this help message.\n ks/flip :: Play a game of coinflip\n ks/bal @mention :: Shows the balance of the member you mention.\n   -examples: 'ks/bal @NoFontNL' will return NoFontNL's balance.\nLetters help: \n              k,"1000"
			m,"1000000"
			b,"1000000000"
			t,"1000000000000"
			qa,"1000000000000000"
			qi,"1000000000000000000"`)
		}
	
		
		
	
})


	


