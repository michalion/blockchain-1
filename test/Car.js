const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Car contract", () => {
  it("sets the manufacturer as the owner of the contract", async () => {
    const { testedContract, manufacturer } = await loadFixture(
      deployTokenFixture
    );

    expect(await testedContract.manufacturer()).to.equal(manufacturer.address);
  });

  async function deployTokenFixture() {
    const [manufacturer, owner, buyer] = await ethers.getSigners();

    const testedContract = await ethers.deployContract("Car", manufacturer);

    await testedContract.waitForDeployment();

    // Fixtures can return anything you consider useful for your tests
    return { testedContract, manufacturer, owner, buyer };
  }
});
