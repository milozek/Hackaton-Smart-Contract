import { expect } from "chai"
import { ethers } from "hardhat"

describe("Miles", function () {
    it("Test contract", async function () {
        const ContractFactory = await ethers.getContractFactory("Miles")

        const instance = await ContractFactory.deploy()
        await instance.deployed()

        expect(await instance.name()).to.equal("Miles")
    })
})
