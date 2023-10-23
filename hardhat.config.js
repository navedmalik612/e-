require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
   networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/a2e1a29db46d41858894d5863bfae282",
      accounts: ['']
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/a2e1a29db46d41858894d5863bfae282",
      chainId: 11155111,
      accounts: ['']
    },
    ganache:{
      url: "http://127.0.0.1:7545",
    }

  },
  
};
