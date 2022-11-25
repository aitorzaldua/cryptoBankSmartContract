const { expect } = require("chai");
const hre = require("hardhat");

const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
//const { ethers } = require("hardhat");

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
        describe ("requires" , function () {
            it ("require: Wait till the time period complete", async function () {
                const { contractTest } = await loadFixture(runEveryTime);
    
                await expect (contractTest.withdraw()).to.be.revertedWith("Wait till the time period complete");
            })
    
            it ("require: you need to be the owner", async function () {
                const { contractTest, unlockedTime, addr1 } = await loadFixture(runEveryTime);
    
                await time.increaseTo(unlockedTime);
    
                await expect (contractTest.connect(addr1).withdraw()).to.be.revertedWith("you need to be the owner");
    
            })
    
            it ("require positive: The unlocked time has arrived and I am the owner", async function () {
                const { contractTest, unlockedTime, addr1 } = await loadFixture(runEveryTime);
    
                await time.increaseTo(unlockedTime);
    
                await expect (contractTest.withdraw()).not.to.be.reverted;
    
            })
        })
        describe ("events", function() {
            it ("Emit: Send the contract address and the balance", async function() {
                const { contractTest, unlockedTime, lockedAmount } = await loadFixture(runEveryTime);

                await time.increaseTo(unlockedTime);

                await expect(contractTest.withdraw()).to.emit(contractTest, "Withdrawal").withArgs(lockedAmount, anyValue);

            })

        })
        describe ("actions", function() {
            it ("Transfer the balance to the owner", async function() {
                const { contractTest, unlockedTime, lockedAmount, owner } = await loadFixture(runEveryTime);

                await time.increaseTo(unlockedTime);

                await expect(contractTest.withdraw()).to.changeEtherBalances(
                    [owner, contractTest],
                    [lockedAmount, -lockedAmount]
                );
            });

        });
    });

  runEveryTime();

});
