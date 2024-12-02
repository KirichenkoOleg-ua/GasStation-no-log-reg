function myMenuFunction() {
  var i = document.getElementById("navMenu");
   if(i.className === "nav-menu") {
      i.className += " responsive";
    } else {
      i.className = "nav-menu";
     }
}
  
var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("buygas");
var y = document.getElementById("gasprice");
 
//--------------------------------------------------------------------
const web3 = new Web3(window.ethereum)
const address = '0xFE29778bB9d6CD81fa1B538081ce1DCd21C6b4f8' //contract adress
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"string","name":"gasolineType","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"Purchase","type":"event"},{"inputs":[{"internalType":"string","name":"gasolineType","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyGasoline","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceA100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceA92","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceA95","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceA98","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"purchases","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPriceA100","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPriceA92","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPriceA95","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPriceA98","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]


  account,
  discount,
  contract


async function connectWallet() {

  if (typeof window.ethereum !=="undefined"){
    account = await ethereum.request({  method: "eth_requestAccounts"})
    document.getElementById("Walletconnect").innerHTML = "Гаманець підключено"
    
    await getInfo()
  
  }else{
    alert("Metamask не встановлений")
  }
}

async function getInfo() {
  contract = new web3.eth.Contract(abi, address)
  
}

async function checkdisc() {
  if (typeof account !=="undefined"){
  const account1 = Array.isArray(account) ? account[0] : account;
  discount = await contract.methods.purchases(account1).call()
  document.getElementById("amountdisc").innerHTML = discount
  }else{
    alert("Підлючіть гаманець")
  } 
}

function buygas() {
  x.style.left = "4px";
  y.style.right = "-520px";
  
  x.style.opacity = 1;
  y.style.opacity = 0;
}
 
function gasprice() {
  if (typeof account !=="undefined"){
  x.style.left = "-510px";
  y.style.right = "5px";
  
  x.style.opacity = 0;
  y.style.opacity = 1;
  }else{
    alert("Підлючіть гаманець")
  } 
}

async function gasprices(){
  if (typeof contract !=="undefined"){
  const GP1 = await contract.methods.priceA100().call()
  document.getElementById("GP1").innerHTML = web3.utils.fromWei(GP1,'ether')
  const GP2 = await contract.methods.priceA98().call()
  document.getElementById("GP2").innerHTML = web3.utils.fromWei(GP2,'ether')
  const GP3 = await contract.methods.priceA95().call()
  document.getElementById("GP3").innerHTML = web3.utils.fromWei(GP3,'ether')
  const GP4 = await contract.methods.priceA92().call()
  document.getElementById("GP4").innerHTML = web3.utils.fromWei(GP4,'ether')
  }else{
    alert("Підлючіть гаманець")
  } 
}

async function Buygas(){
  if (typeof account !=="undefined"){
  const gasPrice = await web3.eth.getGasPrice()
  const account1 = Array.isArray(account) ? account[0] : account;
  gastype = document.getElementById("gastype").value
  gasamount = document.getElementById("gasamount").value
  gas = 60000;
  if (!gastype) {
    alert("Введіть коректний тип бензину!");
    return;
  }
  if (!gasamount || gasamount <= 0) {
    alert("Введіть коректну кількість бензину!");
    return;
  }
  if(contract){
    await contract.methods.buyGasoline(gastype,gasamount).send({
    from: account1,
    gasPrice,
    gas,
    value: 10000000000000,
    }).then(result => {
      if(gasamount == 1){
        alert(`Плата за ${gasamount} літру палива успішно завершена.`);
      } else if(gasamount == 2 || gasamount == 3 || gasamount == 4){
        alert(`Плата за ${gasamount} літри палива успішно завершена.`);
      } else if(gasamount >= 5){
        alert(`Плата за ${gasamount} літрів палива успішно завершена.`);
      }
      console.log(result)
      })
    } else {
      alert("Підключіть гаманець!")
    }   
  }else{
    alert("Підлючіть гаманець")
  } 
}










