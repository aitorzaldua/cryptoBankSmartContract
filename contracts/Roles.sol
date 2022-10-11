// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Roles is AccessControl, Ownable {

    bytes32 public constant ROLE_ADMIN = keccak256("ROL_ADMIN");
    bytes32 public constant ROLE_USER = keccak256("ROL_USER");
    bytes32 public constant ROLE_REQUESTER = keccak256("ROL_REQUESTER");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ROLE_ADMIN, msg.sender);
        _setupRole(ROLE_USER, msg.sender);
        _setupRole(ROLE_REQUESTER, msg.sender);
    }

    //ROLE Functions
    function checkOwner() public view onlyOwner {
        console.log ("Hi, I am the owner");
    }
    function checkAdmin() public view onlyRole(ROLE_ADMIN) {
        console.log ("Hi, I am admin");
    }

    function checkUser() public view onlyRole(ROLE_USER){
        console.log ("Hi, I am user");
    }

    function checkRequester() public view onlyRole(ROLE_REQUESTER){
        console.log ("Hi, I am requester");
    }

    //The Manager can changes user roles:
    function addRole(bytes32 role, address account) public onlyRole(ROLE_ADMIN){
        _grantRole(role, account);
    }

    function removeRole(bytes32 role, address account) public onlyRole(ROLE_ADMIN){
        _revokeRole(role, account);
    }

}