// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ContractTest {
    uint public unlockedTime;
    address payable public owner;

    event Withdrawal (
        uint256 amount, 
        uint when
    );

    constructor(uint _unlockedTime) payable {
        require(block.timestamp < _unlockedTime, "Unlocked time should be in future");

        unlockedTime = _unlockedTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require (block.timestamp >= unlockedTime, "Wait till the time period complete");
        require (msg.sender == owner, "you need to be the owner");
 
        emit Withdrawal(address(this).balance, block.timestamp );

        owner.transfer(address(this).balance);
    }

}