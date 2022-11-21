const hre = require("hardhat");

async function main() {

  const ContractTest = await hre.ethers.getContractFactory("ContractTest");
  const contractTest = await ContractTest.deploy("1669118400");

  await contractTest.deployed();

  console.log("ContractTest deployed to:", contractTest.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });