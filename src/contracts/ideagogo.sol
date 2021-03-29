pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract ideagogo is ERC721 {
  string[] private messages;
  uint256 private createTime;
     uint256 public deadline;
       uint256 public dayss;
   // uint public totalSupply;
   MSG[] private msgs; // where all messages go
   uint[] public ids;
   
    address payable public owner;// address is payable
   uint256 public totalSupply;
  string public name;
    string public symbol;
    uint8 public decimals;
     
  struct MSG{
      
      string name;
       string text;
      address payable senderr;
      
    //  uint mins;
     // uint key;
  }
  
  mapping(string => bool) _msgExists;

 //constructor() ERC721Full("Capsulecorp", "CAPSULE") public {


 // }
 
  constructor() public
   {
       
      name = "Ideagogo";                          // Set the name for display purposes
       symbol = "gogo";                               // Set the symbol for display purposes
       decimals = 0; 
    }
  
   function Time() public {

       createTime = block.timestamp;
         
    }
    

  function mint(string memory _name, string memory _msg) public {
   // require(!_msgExists[_msg]);
    uint id = msgs.length;

    // deadline = block.timestamp + (_mins *  1 minutes);// get the time in minutes
     
     // dayss = deadline + (_days *  1 days);// get the time in minutes
      
    //  deadline = deadline + dayss;
     
     
    ids.push(deadline);
    msgs.push(MSG(_name, _msg , msg.sender)); 
    
    _mint(msg.sender, id);
     totalSupply++;
   
  //  _msgExists[_msg] = true;
  }
  
  
  //gets message for fornt end
  function showMessage(uint _id)public view returns(string memory){
        //require(block.timestamp >= ids[_id]);
      
       MSG  storage usermsg = msgs[_id];
     //  if(usermsg.key == _k){
     //       return(usermsg.text); //add if need a key or use another function
     //  }
       //else if
       
     //  if(block.timestamp >= ids[_id])//require time stamp
        //  {
          
              return(usermsg.text);
      // }else {
      //     return("This message will be unlocked soon...");
      // }
   
  }
  
  //gets message for fornt end
  function showName(uint _id)public view returns(string memory){
        //require(block.timestamp >= ids[_id]);
      
       MSG  storage usermsg = msgs[_id];
     //  if(usermsg.key == _k){
     //       return(usermsg.text); //add if need a key or use another function
     //  }
       //else if
       
     //  if(block.timestamp >= ids[_id])//require time stamp
        //  {
          
              return(usermsg.name);
      // }else {
      //     return("This message will be unlocked soon...");
      // }
   
  }

 

//anybody with address can send idea creator donations
 function giveKudos(uint _id)public payable{
     
  MSG  storage usermsg = msgs[_id];
  
       usermsg.senderr.transfer(msg.value);// give funds to idea creator - gas fees
          
        

  }






}
