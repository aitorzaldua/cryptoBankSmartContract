// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Customers.sol";

contract Transactions is Customers {
    using Counters for Counters.Counter;

    Counters.Counter transferId;

    struct transfer {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint timestamp;
    }

    mapping(uint => transfer) transactions;


    function newTransaction(address payable _receiver, string memory _message) public payable onlyRole(USER_ROLE) {

        transfer storage newTransfer = transactions[transferId.current()];
        newTransfer.sender = msg.sender;
        newTransfer.receiver = _receiver;
        newTransfer.amount = msg.value;
        newTransfer.message = _message;
        newTransfer.timestamp = block.timestamp;

        (bool success, ) = _receiver.call{value: msg.value}("");
        require(success, "Error: the transfer has not been made.");

        transferId.increment();

    }

    //Get functions:
    function getTransaction (uint _transferId) public view returns (address, address, uint, string memory, uint){
        transfer storage dataTransfer = transactions[_transferId];
        return (dataTransfer.sender, dataTransfer.receiver, dataTransfer.amount, dataTransfer.message, dataTransfer.timestamp);
    }

}