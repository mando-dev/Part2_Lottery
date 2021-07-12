pragma solidity ^0.4.17;
    contract Lottery {
            address public manager;                          //iniitlaizing, manager is person whom crated the contract
            address[] public players;                        //iniitlaizing
            
            function Lottery() public { 
                manager = msg.sender;                         // global var
                }
            function enter() public payable{
                require(msg.value > .01 ether);              //forcing or asking ppl to pay when playing the lottery so they dont send in zero
                players.push(msg.sender);                    //plyrs address getting added to the players array here. numbr of players here
                }
            function random() private view returns (uint){
                return uint(keccak256(block.difficulty, now, players)); //passing hashed function into 
                }                                                   
            function pickWinner() public restricted { //restricted keeps from just anyone calling this func, thus only the loettery manager can call this func           //index will be used to send winner some money. sender - whowever is attempting to call the function
                                                        //screening to pick a player as the manager for privelages. so we gotta make sure whoever is tyring ot access this function is a manager. 
                uint index = random() % players.length;       //local variable to store the index of the winner inside of our players array
                
               players[index].transfer(this.balance);       //accessing the address of the person whom just won  .transfer() is what is actuaqlly sending the money
                                                                                 //  lastWinner = players[index]//recording address address of last winner of lottery
                 players = new address[](0);                  //empting out contract to do inifinite reset of lotteries. Creates a dynamic of array of type address. (0) just means starting off with an empty array
                
                 }                    
            modifier restricted() {                             // function modifier can be used so we dont repeat our code logic
              require(msg.sender == manager);                    //restriced was just a name 
              _;
           }
      function getPlayers() public view returns (address[] ) {  // grabbing all the players in the lottery at once.
          return players;                                    //ppl can call  //accessing the players address within the players array
        }                                
        
    }