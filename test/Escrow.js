const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", () => {
  it("facilitates sale of the car", async () => {
    const [buyer, seller] = await ethers.getSigners();

    const Car = await ethers.getContractFactory("Car");
    const deployedCar = await Car.deploy();

    const mintedCar = await deployedCar.connect(seller).mint("");
    await mintedCar.wait();

    const Escrow = await ethers.getContractFactory("Escrow");

    const deployedEscrow = await Escrow.deploy(
      deployedCar.address,
      seller.address
    );

    const sellerEscrowAction = await deployedCar
      .connect(seller)
      .approve(deployedEscrow.address, 1);
    await sellerEscrowAction.wait();

    const propertyListedAction = await deployedEscrow
      .connect(seller)
      .list(1, buyer.address, tokens(10), tokens(5));
    await propertyListedAction.wait();

    const buyerDepositsAction = await deployedEscrow
      .connect(buyer)
      .depositEarnest(1, { value: tokens(10) });
    await buyerDepositsAction.wait();

    const buyerApprovesAction = await deployedEscrow
      .connect(buyer)
      .approveSale(1);
    await buyerApprovesAction.wait();

    const sellerApprovesAction = await deployedEscrow
      .connect(seller)
      .approveSale(1);
    await sellerApprovesAction.wait();

    const sellerFinalizesAction = await deployedEscrow
      .connect(seller)
      .finalizeSale(1);
    await sellerFinalizesAction.wait();

    expect(await deployedCar.ownerOf(1)).to.be.equal(buyer.address);
    expect(await deployedEscrow.getBalance()).to.be.equal(0);
  });
});

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
