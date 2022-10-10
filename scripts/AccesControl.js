const hre = require("hardhat");

async function main() {

  const AccessControl = await hre.ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy();

  await accessControl.deployed();

  console.log("AccessControl deployed to:", accessControl.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });