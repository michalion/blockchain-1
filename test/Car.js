const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Car contract", () => {
  describe("> manufacturer", () => {
    it("sets the manufacturer as the owner of the contract", async () => {
      const { testedContract, manufacturer } = await loadFixture(
        deployTokenFixture
      );

      expect(await testedContract.manufacturer()).to.equal(
        manufacturer.address
      );
    });

    it("allows the owner of the car to transfer ownership", async () => {
      const { testedContract, owner } = await loadFixture(deployTokenFixture);

      await testedContract.transfer(0, owner.address);

      const expectedOwner = await testedContract.getOwner(0);

      expect(expectedOwner).to.equal(owner.address);
    });
  });

  async function deployTokenFixture() {
    const [manufacturer, owner, buyer] = await ethers.getSigners();

    const testedContract = await ethers.deployContract("Car", manufacturer);

    await testedContract.waitForDeployment();

    // Fixtures can return anything you consider useful for your tests
    return { testedContract, manufacturer, owner, buyer };
  }
});
