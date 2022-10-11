# Crypto Bank => Smart Contract

Crypto Bank is all about DeFi. The idea is to create a Bank where the customers can take control

of their data.

#Smart Contract

The current repository contains the smart contracts of the Crypto Bank app.

# Contracts

## Roles.sol: Identify the different roles that a user can be
- Owner: The deployer -> can be transferer.
- DEFAULT_ADMIN_ROLE: The default Admin role.
- ROLE_ADMIN: App administrator.
- ROLE_USER: Customers.
- ROLE_REQUESTER: Potential user, first make a request. The admin will move them to ROLE_USER if aproves.