const { ethers } = require("hardhat");

async function main() {

  const contractManager = await ethers.getContractFactory("ManageServeTime");
  const contractSigner = await ethers.getContractFactory("SigTest");
  // here we deploy the contract
  const deployedcontractManager = await contractManager.deploy(50);
  const deployedcontractSigner = await contractSigner.deploy(50);

  // Wait for it to finish deploying
  await deployedcontractManager.deployed();
  await deployedcontractSigner.deployed();
  // print the address of the deployed contract
  console.log("deployedcontractManagerAddress:", deployedcontractManager.address);
  console.log("deployedcontractSignerrAddress:", deployedcontractSigner.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });