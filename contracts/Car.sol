// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// This is the main building block for smart contracts.
contract Car {
    address public manufacturer;
    mapping(uint256 => address) public owners;

    mapping(uint256 => address) public buyers;

    constructor() {
        manufacturer = msg.sender;
    }

    function transfer(uint256 car, address newOwner) public {
        address currentOwner = owners[car];

        if (currentOwner == address(0)) {
            currentOwner = manufacturer;
        }

        require(currentOwner == msg.sender, "Car owner only");

        owners[car] = newOwner;
    }

    function getOwner(uint256 car) public view returns (address) {
        return owners[car];
    }
}
