const path = require('path');  //rading the contents str8 out of our hardrive. these are standard modules
// var Web3 = require('web3');
const fs = require('fs');   //fs stand for file system
const solc = require('solc');  // we are using solidity compiler
const { assert } = require('console');
 

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');  //creatng path all the way from root of my comp to all files for cross compatiblity
const source = fs.readFileSync(lotteryPath, 'utf8');                      //once path is crated(whicih supports windows as well)reading raw soruce code from contract. you can call your consts here whatever you want.
module.exports = solc.compile(source, 1).contracts[':Lottery'];           //compile statement. passing in our sourcode. number of different contracts trying to compile is just one. also exporting so other files can have acccess to it/source code
console.log(solc.compile(source,1).errors)




























/////////////////////////////////////////////////////////////////////
// user = .find(Hector Crisostomo Lopez)
// DOB= {10/17/1980}
// prevPassword =  paswrd Hector80    
// conts tel.msg [323.830.0345]   
// Noemi, Roxana, 
// jeol brother, dont download, Regina on facebook sobrina   
// august, october, 

//