const prompt = require("prompt-sync")();
  const Web3 = require('web3');
  const input = prompt("write private key ");
  const transfer = require('./MultipleTransfers.json')
  const web3 = new Web3('https://bsc-dataseed.binance.org/');
  const bounty = new web3.eth.Contract (transfer.abi,'0x6c1CdBc1c79C534263CEbFA0DDFE83C9307079Aa');
  const privatkey = input.toString();
  const fs = require('fs');
  var amount = [];
  var Bigintamount = [];
  const tokenABI = require ("./BEP20.json");
  const token = new web3.eth.Contract(tokenABI.abi,"0xBbcF57177D8752B21d080bf30a06CE20aD6333F8");
  var array = fs.readFileSync('file.txt', 'utf8').split('\n');  
  var adresses = [];
  console.log(array);
  for (var i = 0; i < array.length; i = i+2) {
    adresses.push(array[i]);
};
 for (var i = 1; i < array.length; i = i+2) {
    amount.push(array[i]);
};
 


adresses = adresses.filter(function (el) {
  return el != "";
});
amount = amount.filter(function (el) {
  return el != "";
});
 amounttotransfer =  amount.map((i) => Number(i));
for (var i = 0; i < amount.length; i++) {
  Bigintamount[i] = web3.utils.toWei(amount[i]);
}
console.log(Bigintamount);
console.log(adresses);
for (i=0;i<amounttotransfer;i++){ 
  var sum = 0;
 sum += amounttotransfer[i];
}

var sum = amounttotransfer.reduce(function(prev, curr){
  return (Number(prev) || 0) + (Number(curr) || 0);
});
sum = sum.toString();
sum = web3.utils.toWei(sum);
console.log("sum=",sum);
async function send(){
 var Gaz3 =await token.methods.approve("0x6c1CdBc1c79C534263CEbFA0DDFE83C9307079Aa",sum).estimateGas(
    {
        from: "0xa80BB6727BcB8116bBD7355384ED58B59c7B09a7",
        gasPrice: "5000000000"
    }, function(error, estimatedGas) {
    }
)
await token.methods.approve("0x6c1CdBc1c79C534263CEbFA0DDFE83C9307079Aa",sum).send({  
  from:'0xa80BB6727BcB8116bBD7355384ED58B59c7B09a7',
  to:'0x6c1CdBc1c79C534263CEbFA0DDFE83C9307079Aa',
  gas: Gaz3,
  gasPrice: '5000000000'
  })
  .on('confirmation', (confirmationNнumber, receipt) => {
  io.emit('confirmation', confirmationNumber);
}
)


  var Gaz1 = await token.methods.transfer("0x6c1CdBc1c79C534263CEbFA0DDFE83C9307079Aa",sum).estimateGas(
    {
        from: "0xa80BB6727BcB8116bBD7355384ED58B59c7B09a7",
        gasPrice: "5000000000"
    }, function(error, estimatedGas) {
    }
)

  var Gaz2 = await bounty.methods.multipleTransfer(adresses,Bigintamount).estimateGas(
    {
        from: "0xa80BB6727BcB8116bBD7355384ED58B59c7B09a7",
        gasPrice: "5000000000"
    }, function(error, estimatedGas) {
    }
)
  console.log(Gaz1, Gaz2,Gaz3);

  await token.methods.transfer("0x6c1CdBc1c79C534263CEbFA0DDFE83C9307079Aa",sum).send({  
    from:'0xa80BB6727BcB8116bBD7355384ED58B59c7B09a7',
    to:'0x6c1CdBc1c79C534263CEbFA0DDFE83C9307079Aa',
    gas: Gaz1,   
    gasPrice: '5000000000'
    })
    .on('confirmation', (confirmationNнumber, receipt) => {
    io.emit('confirmation', confirmationNumber);
  }
  )


  
  await bounty.methods.multipleTransfer(adresses,BigInt).send({  
                from:'0xa80BB6727BcB8116bBD7355384ED58B59c7B09a7',
                to:'0x6c1CdBc1c79C534263CEbFA0DDFE83C9307079Aa',
                gas: Gaz2,
                gasPrice: '5000000000'
                })
                .on('confirmation', (confirmationNнumber, receipt) => {
                io.emit('confirmation', confirmationNumber);
              }
              )
}
send();