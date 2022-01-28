const Web3 = require('web3');
const fs = require('fs');
const routerjson = require('./PancakeRouter.json');
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
web3.eth.accounts.wallet.add('6a75751b8538b66b3f2210c34985c27bcac33c3dfbed36d8afe55cd17828cf7a');
const router = new web3.eth.Contract (routerjson.abi, '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3');
var Address = ['0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd','0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'];
const privatekey = '6a75751b8538b66b3f2210c34985c27bcac33c3dfbed36d8afe55cd17828cf7a';
let kol;
let swap;

async function MySwapFunction(){
swap = await router.methods.getAmountsOut('1', Address).call();   //поменять первый аргумент шобы свапнуть другое кол-во
console.log(swap);
kol =(swap[1]);
console.log (kol);
async function Swap(){
var receipt = await router.methods.swapExactETHForTokens(kol,Address,'0x223fc52f91258715186c33e8bd91d00dfB92795B',1637082661).send({
   from:'0x223fc52f91258715186c33e8bd91d00dfB92795B',
   gas:2000000,
   to:'0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
   value:1000000000000000000
      })
   .on('confirmation', (confirmationNumber, receipt) => {
    io.emit('confirmation', confirmationNumber);
  });
   
 }
 Swap();
}

async function AddLiquidity(){
let tokenA = '0x2A2E4D83A22087C77dd8623aC0Cc4f81016209d4'   //TEST TOKEN ADDRESS
let tokenB = '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7'  // any other token
let amountADesired = '10000000000000000000'  //кол-во тест токенов для предоставления ликвидности
let amountBDesired = '100000000000000000000'  // кол-во других токенов для предоставления ликвидности
let amountAMin = '10000000000000000000' // минимальное кол-во токенов для ликвидности для учета проскальзывания
let amountBMin= '100000000000000000000' // аналогично amountAmin
let to = '0x223fc52f91258715186c33e8bd91d00dfB92795B' // адрес получателя lp токенов
let deadline = Math.round((new Date()).getTime() / 1000)+200;// посчитать в калькуляторе юникс время для выполнения транзакции 
var receipt = await router.methods.addLiquidity(tokenA,tokenB,amountADesired,amountBDesired,amountAMin,amountBMin,to,deadline).send({  // создание lp testtoken/busd
   from:'0x223fc52f91258715186c33e8bd91d00dfB92795B',
   gas:2000000,
   to:'0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'
      })
   .on('confirmation', (confirmationNumber, receipt) => {
    io.emit('confirmation', confirmationNumber);
  });
   
 }

async function removeLiquidity(){
let liquidity = '99999999999999999000';
let tokenA = '0x2A2E4D83A22087C77dd8623aC0Cc4f81016209d4'   //TEST TOKEN ADDRESS
let tokenB = '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7'  // any other token
let amountAMin = '10000000000000000000' // минимальное кол-во токенов для вывода 
let amountBMin= '100000000000000000000' // аналогично amountAmin
let to = '0x223fc52f91258715186c33e8bd91d00dfB92795B' // адрес получателя токенов
let deadline = Math.round((new Date()).getTime() / 1000)+200 // посчитать в калькуляторе юникс время для выполнения транзакции 

var receipt = await router.methods.removeLiquidity(tokenA,tokenB,liquidity,amountAMin,amountBMin,to,deadline).send({ 
   from:'0x223fc52f91258715186c33e8bd91d00dfB92795B',
   gas:2000000,
   to:'0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'
      })
   .on('confirmation', (confirmationNumber, receipt) => {
    io.emit('confirmation', confirmationNumber);
  });
   
 }
 removeLiquidity();

let timestamp = Math.round((new Date()).getTime() / 1000)+200;
console.log(timestamp);



