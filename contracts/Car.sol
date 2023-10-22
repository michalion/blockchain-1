// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Car is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private carIDs;

    constructor() ERC721("Car Brand", "Car") {}

    function mint(string memory _tokenURI) public returns (uint256) {
        carIDs.increment();

        uint256 newCarID = carIDs.current();
        _mint(msg.sender, newCarID);
        _setTokenURI(newCarID, _tokenURI);

        return newCarID;
    }

    // is this needed?
    function totalSupply() public view returns (uint256) {
        return carIDs.current();
    }
}

// thank you openzeppelin for removal in v5
library Counters {
    struct Counter {
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}
