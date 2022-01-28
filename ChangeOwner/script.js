const Web3 = require('web3');
const prompt = require("prompt-sync")();
const input = prompt("write private key ");
const contractabi = require ('./MultipleVesting.json');
const web3 = new Web3('https://bsc-dataseed.binance.org');
web3.eth.accounts.wallet.add(input.toString());
const vestingcontract  = new web3.eth.Contract(contractabi.abi,'0x09A97335581D08e62D22cdb56aEa6FdD5eE61799');
 
async function change_owner(){
let Gaz = await vestingcontract.methods.changeOwnershipOfPool().estimateGas(
   {
       from: "0xa80BB6727BcB8116bBD7355384ED58B59c7B09a7",
       gasPrice: "5000000000"
   }, function(error, estimatedGas) {
   }
)



await vestingcontract.methods.changeOwnershipOfPool().send({
   from:'0xa80BB6727BcB8116bBD7355384ED58B59c7B09a7',
   to:'0x09A97335581D08e62D22cdb56aEa6FdD5eE61799',
   gas: Gaz,
   gasPrice:'5000000000'
      })
   .on('confirmation', (confirmationNumber, receipt) => {
    io.emit('confirmation', confirmationNumber);
  })};
change_owner();

