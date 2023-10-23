// scripts/deploy.js
const hre = require("hardhat")

async function main() {
    const Ecommerce = await hre.ethers.getContractFactory("Ecommerce")
    const ecommerce = await Ecommerce.deploy()
    await ecommerce.deployed()
  
    console.log(`Deployed  Contract at: ${ecommerce.address}\n`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  




