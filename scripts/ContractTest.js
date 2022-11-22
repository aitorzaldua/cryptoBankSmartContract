const hre = require("hardhat");

//console.log("hre value:", hre);

async function main() {

  //SETTING THE UNLOCKED TIME:
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  console.log("currentTimestampInSeconds: ", currentTimestampInSeconds);
  //When the user(owner) will be able to withdraw the funds
  //One year after currentTimestampInSeconds:
  const ONE_YEARS_IN_SECONDS = 356 * 24 * 60 * 60;
  const unlockedTime = currentTimestampInSeconds + ONE_YEARS_IN_SECONDS
  console.log("unlockedTime: ", unlockedTime);

  //SETTING THE INITIAL AMOUNT:
  const lockedAmount = hre.ethers.utils.parseEther("1");
  console.log("lockedAmount: ", lockedAmount);


  const ContractTest = await hre.ethers.getContractFactory("ContractTest");
  const contractTest = await ContractTest.deploy(unlockedTime, {value: lockedAmount});

  await contractTest.deployed();

  console.log("ContractTest deployed to:", contractTest.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });