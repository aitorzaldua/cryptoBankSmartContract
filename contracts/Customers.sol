// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "./Roles.sol";

contract Customers is Roles {

struct Client {
    uint clientId;
    string name;
    string surname;
    string physicalAddress;
    string passport;
    address clientAccount;
}

function requestToBeClient() public {

    _setupRole(ROLE_REQUESTER, msg.sender);

}
}