# Crypto Bank => Smart Contract

Crypto Bank is DeFi Bank built with Solidity (Backend) and React (Frontend).

The current repository contains the smart contracts of the Crypto Bank app.

# Customers.sol:

## Contract to register the different agents of the application. Administrators, users, etc...
## The developer is the superuser. He can assign his rights at any time to another agent.

- Owner: The deployer -> can be transferer.

- DEFAULT_ADMIN_ROLE: The default Admin role by OZ.

- ADMIN_ROLE: App administrator. Has all permissions.

- USER_ROLE: Aproved Customers.

- REQUESTER_ROLE: Potential customer first make a request. The administrator will move it to USER_ROLE if approved.


# Transactions.sol:

##Inherits the Customers.sol contract
##Only bank customers can make transfers.