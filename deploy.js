
const HDWalletProvider = require("truffle-hdwallet-provider")       //requiring module from npm we just installed
const Web3 = require('web3')                                        //this is the Web3 Contsuctor becuase its capitalized, when lower case to be an instance
const { interface, bytecode} = require('./compile')                 // importing interface and bytecode from our compile.js script. interface = contract interface

const provider = new HDWalletProvider(                              //specifyfing which account we want to unlock and use as a source of either
   'clutch script pulse captain swim maple enlist wink teach series ivory neutral',   //mnemonic helps us derive public and private key. 
   'https://rinkeby.infura.io/v3/9fe59de2457e482ba05207c5dadc5dfd'    //mnemonic cam be used to generate many accoounts and does not specify a single spedific account
    )
const web3 = new Web3(provider)                                       // i removed the quotes here. passing the provider in. its gonna pass provider to Web3 Constructor 

const deploy = async () => {                                           //fucntion deploy, then calling depploy. mark it wuth async                   
   const accounts = await web3.eth.getAccounts(); 
   console.log('attempting to deploy account', accounts[0]);           // this specific account will be paying for the gas trasnsaction
   const result = await new web3.eth.Contract(JSON.parse(interface))      //you had a bug here because you forgot 'eth' , like error was : web3.Contract is not a constructor result is going to be an instance of our contract. actual deployment statement. accessting ethereum module inside the web3 instance thats been configured to connect to rinkeby net. making a new Contract taking in ABI(interface) and its being parsed by JSOn int a js object. 
   .deploy( { data: bytecode } )                                         //the .deploy() statement is going to contain the contracts bytecode and any arguments. Initial argumetns we are passing into contract above. data is bytecode
   .send ( { gas: '1000000' , from: accounts[0] } );                     //sending transaction to the network
   console.log(interface);
   console.log('contracts location at', result.options.address);        //logging the address to which the contract was deployed to
   }                                                                     //the only reason we are writing a func is to be able to use the async await syntax
 
deploy(); 






















//   562.298.9285 Alma Ruiz
//   Metro PCS
//    possible guy we are looking for 
//   lion pic on profile
//    lpz  possible username
//   JL Lpz         
//   may 2nd 1970 dob
//   rosarioruiz842@yahoo.comtelkghjdg
//
//
//
//
//
//
















//some  guys is saying I cant get the account since its undefined
//some other guy said im not passing over provider correctly
//some toher girls said metamask has stopped injecting web3
//altonytech95@hotmail.com     Texrt-Free app for iphone, 
//310.242.0493 Antonio Lopez Ortiz (husband)
//323.301.9132 she may show up on Whats , Gomez Victoria 
//andy0528 possible password
//adriana9090 passoord posssible
//09/19/81   mixed dob password possbble
// 05 09 80 real DOB 
// 07 30 10        7/20/2007    05 28 05     28 05    28 2005    
// tony, nicknames, tono with spanish ene, babe, rosci lopez, leydi-wifes middle name, barrera, 
// barrerarosci@yahoo.com








