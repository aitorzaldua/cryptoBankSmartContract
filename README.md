# Crypto Bank => Smart Contract

Crypto Bank is all about DeFi. The idea is to create a Bank where the customers can take control

of their data.

#Smart Contract

The current repository contains the smart contracts of the Crypto Bank app.

# Customers.sol::

## Contract to register the different agents of the application. Administrators, users, etc...
## The developer is the superuser. He can assign his rights at any time to another agent.

- Owner: The deployer -> can be transferer.

- DEFAULT_ADMIN_ROLE: The default Admin role by OZ.

- ADMIN_ROLE: App administrator. Has all permissions.

- USER_ROLE: Aproved Customers.

- REQUESTER_ROLE: Potential customer first make a request. The administrator will move it to USER_ROLE if approved.