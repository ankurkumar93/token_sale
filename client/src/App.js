import React, { Component, useRef, state } from "react";
// import getWeb3 from "./getWeb3";
import MyTokenContract from "./contracts/MyToken.json";
import Web3 from 'web3';
import "./App.css";
import { MYTOKEN_address, MYTOKEN_ABI } from './config'
import Timer from './Timer';

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, accountBalance: 0, listenForEvents: null, toBeMinted: 0, tokenPrice: null,  date: null };
  constructor(props) {
    super(props);
    this.ethValueRef = React.createRef();
  }

  componentDidMount = async () => {
    this.loadBlockchainData()
    
  }

  buyTokens = async () => {
    var amountToSend = 0
    var amountMetaMask = 0
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    var ethValue = this.ethValueRef.current.value

    if (ethValue.toString().includes('.')){
      const toWei = parseFloat(ethValue) * 1000000000000000000
      amountToSend = toWei.toString()
    }
    else {
      amountToSend = web3.utils.toWei(ethValue.toString(), "ether");
    }
    try {
      const response = await this.state.contract.methods.buy(amountToSend).send({ from: this.state.accounts[0], value: amountToSend, minsDrop: null, secsDrop: null });
      const boughtQty = response.events.boughtTokens.returnValues.quantity
      const sharesLeft = response.events.boughtTokens.returnValues.sharesLeft
      this.setState({ toBeMinted : sharesLeft, accountBalance: boughtQty })
    }
    catch {

    }
    
  }

  getBalance = async () => {
    // console.log(this.state.accounts[0])
    const response = await this.state.contract.methods.getBalance(this.state.accounts[0]).call();
    
  }

  checkShares = async () => {
    const res = await this.state.contract.methods.sharesLeft().call()
  }

  getPrice = async () => {
    const res = await this.state.contract.methods.hrsPassed().call()
  }
  

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const networkId = await web3.eth.net.getId();
    const network = await web3.eth.net.getNetworkType()
    let deployedNetwork = MyTokenContract.networks[networkId];
    const accounts = await web3.eth.getAccounts()
    this.setState({account : accounts[0]})
    var contractInstance = new web3.eth.Contract(MYTOKEN_ABI, MYTOKEN_address);
    this.setState({ contractInstance })
    this.setState({ web3, accounts, contract: contractInstance });
    const totalAccountBalance = await contractInstance.methods.getBalance(accounts[0]).call()
    this.setState({accountBalance : totalAccountBalance})

    const mintedTokens = parseInt(await contractInstance.methods.sharesLeft().call())
    this.setState({ toBeMinted: mintedTokens})

    const priceToken = await this.state.contract.methods.tokenPriceWei().call()
    const priceToEth = web3.utils.fromWei(priceToken, "ether")
    this.setState({tokenPrice: priceToEth})
    // await contractInstance.methods.buy().send({ from: accounts[0] });
    const deployedSeconds = await this.state.contract.methods.startTime().call()

    var deployedDate = new Date(null);
    deployedDate.setTime(deployedSeconds*1000);
    
    var currentDate = new Date()
    var subtractedSecs = currentDate - deployedDate
    var minutes = 200 - Math.floor(subtractedSecs / 60000) //time for next price drop
    var seconds = 60 - ((subtractedSecs % 60000) / 1000).toFixed(0);
    this.setState({minsDrop: minutes, secsDrop: seconds})
    console.log(this.state)
  }

  render() {
    return (
      <>
       <p>Buy tokens</p>
       <p>Enter amount in ETH: </p>
       <input ref={this.ethValueRef} type="text" />
       <button onClick={this.buyTokens}> Buy </button>
       <button onClick={this.incrementHr}> inc </button>
       <button onClick={this.getPrice}> get price </button>

       <p>your account is: {this.state.account}</p>
       <p>Your balance is: {this.state.accountBalance}</p>
       <p>Started at: {this.state.date}</p>
       <p>Started at: {this.state.minsDrop}</p>
       <p>Started at: {this.state.secsDrop}</p>

       <Timer instance={this.state.contract} minutes={this.state.minsDrop} seconds={this.state.secsDrop} />
      <p>To be minted: {this.state.toBeMinted}</p>
      <p>Price drops by 0.00001 ETH until sold out or price reaches 0.00075 ETH</p>
     </>
    );
  }
}

export default App;

