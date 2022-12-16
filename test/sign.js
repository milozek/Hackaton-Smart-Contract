// test/sigtest.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');
const SigTest = require('../build/SigTest.json');

describe('SigTest', function() {
  let contract;
  let signer;

  beforeEach(async function() {
    // Deploy the contract
    const SigTestDeploy = await ethers.getContractFactory('SigTest');
    contract = await SigTestDeploy.deploy();
    // Get the signer
    signer = await ethers.provider.getSigner();
  });

  it('should verify a valid signature', async function() {
    // Get the current timestamp
    const timestamp = await ethers.provider.getBlockNumber();
    // Sign the timestamp
    const signature = await signer.signMessage(timestamp);
    // Check if the signature is valid
    const isValid = await contract.isDataValid(timestamp, signature);
    expect(isValid).to.be.true;
  });

  it('should reject an invalid signature', async function() {
    // Get the current timestamp
    const timestamp = await ethers.provider.getBlockNumber();
    // Sign the timestamp with a different signer
    const otherSigner = await ethers.provider.getSigner();
    const signature = await otherSigner.signMessage(timestamp);
    // Check if the signature is valid
    try {
      await contract.isDataValid(timestamp, signature);
      // The transaction should throw an error, so this line should not be reached
      expect.fail();
    } catch (err) {
      expect(err.message).to.include('Invalid signature');
    }
  });
});
