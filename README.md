# Organization and Token Management System

This project implements a smart contract system for managing organizations and their associated tokens on the Ethereum blockchain. It consists of two main contracts: `organizationContract` and `tokenContract`.

## Description

This system allows for the creation and management of organizations, each with its own associated token. It provides functionality for adding stakeholders, managing stakeholder types, and controlling token distribution through a whitelisting mechanism.

## Features

### Organization Management
- Create new organizations with associated tokens
- Add stakeholder types to organizations
- Create stakeholders and associate them with organizations
- Whitelist addresses for token claiming
- Retrieve organization details and stakeholders

### Token Management
- Create custom tokens for each organization
- Associate tokens with organizations

## Getting Started

### Executing program

To run this program, you can use Remix, an online Solidity IDE. To get started, go to the Remix website at https://remix.ethereum.org/.

Once you are on the Remix website, create two new files by clicking on the "+" icon in the left-hand sidebar. Save them with .sol extensions (e.g., organizationContract.sol and tokenContract.sol). Copy and paste the respective contract code into each file.

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to a compatible version, and then click on the "Compile" button for each contract.

Once the code is compiled, you can deploy the contracts by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. First deploy the `tokenContract`, then deploy the `organizationContract`, passing the address of the `tokenContract` to its constructor.

After deployment, you can interact with the contracts using the provided functions in the Remix interface.

## Contract Details

### organizationContract

This is the main contract that handles organization and stakeholder management.

#### Key Functions:
- `createOrganisation`: Create a new organization with its associated token
- `addTypeToOrganization`: Add a new stakeholder type to an existing organization
- `createStakeholder`: Create a new stakeholder and associate it with an organization
- `whiteList`: Whitelist an address for token claiming
- `claimToken`: Allow whitelisted addresses to claim tokens
- `getOrganizationDetails`: Retrieve details of a specific organization
- `getStakeholdersByOrgAddress`: Get all stakeholders associated with an organization

### tokenContract

This contract handles the creation and management of tokens for organizations.

#### Key Functions:
- `createToken`: Create a new token for an organization

## Usage

To use this system:

1. Deploy the `tokenContract`
2. Deploy the `organizationContract`, passing the address of the `tokenContract` to its constructor
3. Use the `createOrganisation` function to create new organizations
4. Add stakeholder types to organizations using `addTypeToOrganization`
5. Create stakeholders using `createStakeholder`
6. Whitelist addresses for token claiming with `whiteList`
7. Allow stakeholders to claim tokens using `claimToken`

## Authors

Aleonomoh Joseph

