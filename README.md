# Buy Tokens

A blockchain project to buy Tokens.

## Requirements

1. Ganache
2. Metamask
3. Truffle
4. Nodejs
5. npm

## Installation
Inside client folder and main project folder, execute the command. It will install all dependencies.

```bash
npm install
```

## Using
Start ganache, goto parent folder and execute following command.
```
truffle migrate --reset
```
Inside main project folder, go to build > contracts. Open "MyToken.json" and copy the contents of "abi" and paste it in value of "MYTOKEN_ABI" in client > src > config.js

In the same file "MyToken.json", find contract address using ctrl+f > address, copy the address and paste it in the value of "MYTOKEN_address" in client > src > config.js

Go to client folder and run the following command 
```
npm start
```

When home page is opened in chrome, start metamask and using private keys import first wallet from ganache blockchain into your metamask. Connect website to metamask wallet and refresh the page. 
