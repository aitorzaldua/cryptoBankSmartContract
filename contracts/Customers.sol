// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Customers is AccessControl, Ownable {

    uint public customerId;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant REQUESTER_ROLE = keccak256("REQUESTER_ROLE");

    constructor() {
        customerId = 0;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(USER_ROLE, msg.sender);
        _setupRole(REQUESTER_ROLE, msg.sender);

    }

    struct singleCustomer {
        string name;
        string surname;
        string physicalAddress;
        string passport;
        address clientAccount;
        bytes32 role;
    }

    mapping(uint => singleCustomer) CustomersDataBase;


    //Potential customer first make a request. The administrator will move it to USER_ROLE if approved.
    function requestToBeCustomer (string memory _name, string memory _surname, string memory _physicalAddress, string memory _passport) public {

        _setupRole(REQUESTER_ROLE, msg.sender);

        singleCustomer storage newSingleCustomer = CustomersDataBase[customerId];
        newSingleCustomer.name = _name;
        newSingleCustomer.surname = _surname;
        newSingleCustomer.physicalAddress = _physicalAddress;
        newSingleCustomer.passport = _passport;
        newSingleCustomer.clientAccount = msg.sender;
        newSingleCustomer.role = keccak256("REQUESTER_ROLE");

        customerId++;

    }

    function getCustomers (uint _customerId) public view returns (string memory, string memory, string memory, string memory, address, bytes32) {

        singleCustomer storage data = CustomersDataBase[_customerId];
        return (data.name, data.surname, data.physicalAddress, data.passport, data.clientAccount, data.role);

    }

     //Change Roles:
    function addRole(bytes32 _role, uint _customerId) public onlyRole(ADMIN_ROLE){
        singleCustomer storage userData = CustomersDataBase[_customerId];
        _grantRole(_role, userData.clientAccount);
        userData.role = _role;

    }

    function removeRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE){
        _revokeRole(role, account);
    }

    //Test if I am a validated user:
    function onlyUser() public view onlyRole(USER_ROLE){
        console.log ("Hi, I am user");
    }

}