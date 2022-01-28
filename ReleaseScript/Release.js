  const prompt = require("prompt-sync")();
  const Web3 = require('web3');
  const input = prompt("write private key: ");
  const VestingPool = require('./VestingPoolABI.json');
  const TokenVestingjson = require('./TokenVestingABI.json');
  const Multiply = require('./MultipleRelease.json');;  
  const web3 = new Web3('https://bsc-dataseed.binance.org/');
  web3.eth.accounts.wallet.add(input.toString());
  const MultipleRelease = new web3.eth.Contract (Multiply.abi,'0x917f4c1F4278A9c1D32494FAA8B72870C0f67188');
  const VestingPoolBSC = new web3.eth.Contract (VestingPool, '0x3ccaD1a87f5DdCD7Af315D64006E2E9b4Dd7e807');
  const privatkey = input.toString();
  const fs = require('fs');
  const arr = require("./Wallets.json");
const { release } = require("os");
  let gasPrice ;
  let gasEstimate;
  let adresses = [];
  let checksum;
  var wallets = [];
  var releases = new Array;
  let amount;
  let d = 1000;
  let b;
  for(var i in arr) {
      wallets.push(arr[i]);
  }


async function Release(){
    for (j=0;j<1112;j++){
  //    console.log(j,wallets[j],"проверка");
    adresses = await VestingPoolBSC.methods.getDistributionContracts(wallets[j]).call();
    var vestings = Object.values(adresses);
    //console.log(vestings.length);
    if (vestings.length>0){
      //console.log(vestings,"прошло первое");
      for(b=0;b<vestings.length;b++){
       // console.log(vestings[b], "проверка 2го");
      let VestingToken = new web3.eth.Contract (TokenVestingjson,vestings[b]);
      amount = await VestingToken.methods.releasableAmount("0xBbcF57177D8752B21d080bf30a06CE20aD6333F8").call();
      if(amount>0){
        console.log(vestings[b],amount);
        //console.log(amount, "amount to release");
         releases.push(vestings[b]);
         _lenght = releases.length;
          console.log(releases);
          fs.writeFile('./File.json', JSON.stringify(releases),

          function (err) {
              if (err) {
                  console.error('Crap happens');
              }
          }
      );
          // if (_lenght >=100){
          //   console.log(releases);
                      
          //   releases = [];
            
            
            
          // }
           
         }
         else {
           continue;
         }
      }
      
      
    }
    else {
      continue;
           }
  }
  
  
    
}


Release();
