const assert = require('assert');        // testing set up. requiring in the assert library. This is a helper library part of the node standard library
const { ENGINE_METHOD_CIPHERS } = require('constants');
const ganache = require('ganache-cli');   //local test network
const { utils } = require('mocha');
const Web3 = require('web3');     //we are requiring web3 in the constructor func
const web3 = new Web3(ganache.provider());      //setting up our instance of web3 //provider is a replaceable little block that we stick into the Web3 library.
const {interface, bytecode} = require('../compile');                                         //rewuiting in interface is the abi of our contract and requiring in the bytecode (which is the raw compile contract from complile.js)    //provider() is what allows us to connect to any givennetwork

let lottery;//declaring 2 local variables, one will hold instance of contract and other will list of all different accoutns that are automatically generated and unlocked for us as part of the ganache cli
let accoutns;

                                                                //setting up our before each statment that will attempt to deploy our contract and get our list of accounts
beforeEach(async () => {                           // the func that we are going to pass beforeEach() is going to have some asychronus code inside of it.
        accounts = await web3.eth.getAccounts();         //immadiately reassing a value to accounts var. We need to get a list accounts and we are going to use web 3 for that. web3 will access the Etherum module and get accounts.
       
        lottery =  await new web3.eth.Contract(JSON.parse(interface))           //taking care of deploying an instance of our lottery contract, then we will pass it our interface after we parse it from json   
             .deploy({ data: bytecode })                                 //chaining on our deploy statement thats going to take in our raw compiled contract (which is the bytecode above in our const)
             .send({from: accounts[0], gas:'1000000'});   //sending it off as a transaction to the local test network. We need to specify the account we are going to use for deployment 
        });                                                         
                                                    //it statement veriffies that our contract was successfully deployed to local netwrk
   describe('Lottery Contract', () => {         //writing our first top level describe statement. describing our first lottery contract
          it('deploys a contract', () => {        //adding all our it statements. Every it statement. it statement is going to verify that our contra
          assert.ok(lottery.options.address);      // making sure that some value is defined. address here is location of where the contract was deployed to local test network
          });                                      
          
          it('allows one account to enter', async () => {             //marking it async because its going to have some async code inside of it
              await lottery.methods.enter().send({            //immediately attempting to enter into the lottery. in send()-we specifify who is atempting to eneter the lottery
               from: accounts[0],              //so only this addy should be inside the array
               value: web3.utils.toWei('0.2', 'ether')                //in order to send money we need to specify the value property. also coversion of ether/wei is easier to ready with web3.utils  wei is on longer form with longer zeroes. ether is our 2nd argument here
                    });   //this code will enter us into the lottery
                                            
                     const players = await lottery.methods.getPlayers().call({//immediately after entering the lottery we should be able to call the get players method and get back our list of players. it will be a set number of addresses and we gotta make sure a certain amount of addresses are different
                        from: accounts[0] //.call() is specifying who is calling the func getallplayers? its an await asyn method since its attempting to reach a contract and obtain some value
         
                    });
                    assert.strictEqual(accounts[0], players[0]);    //here it is double echeking that the only person to be able to grab all the players shoul be addy 0. 
                    assert.strictEqual(1, players.length);       //inside equal(the value that it should be, and the value that it is). im a bit confused about these last 2 lines
                });
                                                                      //first arg of it statement is description of test
                it('allows multiple accoutns to enter', async () => {             //marking it async because its going to have some async code inside of it
                    await lottery.methods.enter().send({            //immediately attempting to enter into the lottery. in send()-we specifify who is atempting to eneter the lottery
                     from: accounts[0],                              //so only this addy should be inside the array
                     value: web3.utils.toWei('0.2', 'ether')                //in order to send money we need to specify the value property. also coversion of ether/wei is easier to ready with web3.utils  wei is on longer form with longer zeroes. ether is our 2nd argument here
                          });                                           //this code will enter us into the lottery
                    await lottery.methods.enter().send({            //immediately attempting to enter into the lottery. in send()-we specifify who is atempting to eneter the lottery
                    from: accounts[1],                      //so only this addy should be inside the array
                    value: web3.utils.toWei('0.2', 'ether')                //in order to send money we need to specify the value property. also coversion of ether/wei is easier to ready with web3.utils  wei is on longer form with longer zeroes. ether is our 2nd argument here
                            });                                          //this code will enter us into the lottery
                    await lottery.methods.enter().send({            //immediately attempting to enter into the lottery. in send()-we specifify who is atempting to eneter the lottery
                    from: accounts[2],                          //so only this addy should be inside the array
                    value: web3.utils.toWei('0.2', 'ether')                //in order to send money we need to specify the value property. also coversion of ether/wei is easier to ready with web3.utils  wei is on longer form with longer zeroes. ether is our 2nd argument here
                            });                                      //this code will enter us into the lottery
                                                                      // with traditional promises we would use catch error but with async await we use try catch 
                          




                           const players = await lottery.methods.getPlayers().call({//immediately after entering the lottery we should be able to call the get players method and get back our list of players. it will be a set number of addresses and we gotta make sure a certain amount of addresses are different
                              from: accounts[0] //.call() is specifying who is calling the func getallplayers? its an await asyn method since its attempting to reach a contract and obtain some value
               
                          });
                          assert.strictEqual(accounts[0], players[0]);    //here we are just saying that for example accounts 0 should equal player 0(matching)//here it is double echeking that the only person to be able to grab all the players shoul be addy 0. 
                          assert.strictEqual(accounts[1], players[1]);
                          assert.strictEqual(accounts[2], players[2]);
                          assert.strictEqual(3, players.length);       //inside equal(the value that it should be, and the value that it is). im a bit confused about these last 2 lines
                      });             // the numbr 3 means how many addresses/players are in the array
                  it('requires minimum amount of ether to enter', async () => { //trying to make sure something goes wrong to make sure ppl are depositing at least greater than 0.1 ether 
                    try { //becasue we are using sync await we can tell the block that it can expect an error by using basic javascriot try catch error. we are wrapping the await inside of a try 
                    await lottery.methods.enter().send({        //send is for sending in the ether into contract
                       from: accounts[0],
                       value: 0                                     //sending in too little 200 or 0 wei
                     });
                    assert(false) //triple making sure this test fails. this is just in case no error is caught from above. if error is caught, then it will just be counght next on catch
                    } catch (err)  {      //catching an error object. basic js catch try error. try catch error is only triggered if it spots an error from the it block
                       assert(err);                 //this just makes sure the error is caught. ok() just makes sure that some value is past into this func
                    }   //assert checks for truthiness where as ok() checks for existence
                  });  
                  
                it('can only b called my manager, func pickWinner is it', async () => { //making sure right person calls pickWinnr
                     try {           //no need to call the enter meth. no need to enter contract b4 calling pickwiner
                        await lottery.methods.pickWinner().send({   //transaction send/object we are going to provide
                            from: accounts[1], //we are specifically saying this is coming from accoutns1, def not the managr.
                        });
                            
                            assert(false);   //this just says that if we reach this line, it will atuo fail this test   
                     } catch(err)  {    //receiving the error object
                        assert(err)//assertin that ther err exizts
                     }         
                            
                       
                }); 
                  
                  it('sends money to winner and resets players array', async () => {
                     await lottery.methods.enter().send({ //for now to simplify the logic, we are using one account only
                     from: accounts[0],//person who is going to enter into the contract
                     value: web3.utils.toWei('2', 'ether') //money being sent in and value must be in terms of wei    
                }) ;
                const initialBalance = await web3.eth.getBalance(accounts[0]);  //at this point here we are 2 ether less-confirmed by instructor//i think this records ether After they have sent in//getting the initial counta at 0//figuring out whose the winner or randomly picking winner-in this specific case the accoutns[0]//one way if picking winner is by looking at whose account got a gain of 2 
                await lottery.methods.pickWinner().send({from: accounts[0]});   //attempting to pick a winner inside of our contract. we shoudl be able to tell that this account went up 2 ether
                const finalBalance = await web3.eth.getBalance(accounts[0]);
                const difference = finalBalance - initialBalance;   //comparing diff between initial and final balance. but remember that there was some gas spent during transaction so it will be less than 2 eth
                console.log(finalBalance - initialBalance);//checking to see how much we actually aspent on gas 
                assert(difference > web3.utils.toWei('1.8', 'ether')); // u can think of this line as 2 must be grater than 1.8
            });
        });  //this is still inside the describe block// we use await because they are asynchronuse requests we are making to local eth newrk                                     

