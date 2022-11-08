const hre = require("hardhat");

async function main() {

  const Customers = await hre.ethers.getContractFactory("Customers");
  const customers = await Customers.deploy();

  await customers.deployed();

  console.log("Customers deployed to:", customers.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });