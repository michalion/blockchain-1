//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// This is the main building block for smart contracts.
contract Car {
    address public manufacturer;
    uint256[] public cars;
    mapping(uint256 => address) public owners;

    mapping(uint256 => address) public buyers;

    constructor() {
        manufacturer = msg.sender;
    }
}
