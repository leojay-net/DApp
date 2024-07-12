# Organization and Token Management System

This project implements a smart contract system for managing organizations and their associated tokens on the Ethereum blockchain. It consists of two main contracts: `organizationContract` and `tokenContract`.

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
