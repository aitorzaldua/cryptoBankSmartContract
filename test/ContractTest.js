const { expect } = require("chai");
const hre = require("hardhat");

const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { ethers } = require("hardhat");

describe("ContractTest", function () {
    async function runEveryTime() {
        //Global variables
        const ONE_YEARS_IN_SECONDS = 356 * 24 * 60 * 60;
        const ONE_GWEI = 1_000_000_000;

        //Expected variables:
        const lockedAmount = ONE_GWEI;
        const unlockedTime = (await time.latest()) + ONE_YEARS_IN_SECONDS;
        //const fakeUnlockedTime = (await time.latest()) + 100;

        //Addresses:
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();

        //Contract:
        const ContractTest = await ethers.getContractFactory("ContractTest");
        const contractTest = await ContractTest.deploy(unlockedTime, {value: lockedAmount});

        return {contractTest, unlockedTime, lockedAmount, owner, addr1};

    }

    describe("Deployment", function() {
        it ("Should check unlocked time", async function(){
             //The contract:
             const {contractTest, unlockedTime} = await loadFixture(runEveryTime);

             expect(await contractTest.unlockedTime()).to.equal(unlockedTime);

        });

        it("The owner should be the deployer", async function() {
            const {contractTest, owner} = await loadFixture(runEveryTime);

            expect(await contractTest.owner()).to.equal(owner.address);
        });

        it("The balance should be in the contract", async function() {
            const {contractTest, lockedAmount} = await loadFixture(runEveryTime);

            const contractBal = await ethers.provider.getBalance(contractTest.address);

            expect(contractBal).to.equal(lockedAmount);
        });

        it ("require: Unlocked time should be in future", async function() {
            const currentTime = await time.latest();
            const ContractTest = await ethers.getContractFactory("ContractTest");

            await expect(ContractTest.deploy(currentTime, {value: 1})).to.be.revertedWith("Unlocked time should be in future");

        })

    });

    describe ("withdraw", function () {
        it ("Wait till the time period complete", async function () {
            const {contractTest, unlockedTime} = await loadFixture(runEveryTime);

            const currentTime = await time.latest();

            expect (await contractTest.unlockedTime()).greaterThan(currentTime);
        })
    })

  runEveryTime();

});
