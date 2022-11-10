const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Customers contract', () => {
  let CustomersFactory, ADMIN_ROLE, owner, addr1, addr2;

  beforeEach(async () => {
    CustomersFactory = await ethers.getContractFactory('Customers');
    token = await CustomersFactory.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe('Deployment', () => {
    it('Should set the right owner', async() => {
      expect(await token.owner()).to.equal(owner.address);
    });
    it('Should assign all the roles to the owner', async() => {
      const ownerRole = await token.balanceOf(owner.address);
      expect(await ('ADMIN_ROLE')).to.equal(ownerRole);
    })
  })
})