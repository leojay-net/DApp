/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/register-organization',
        destination: '/components/RegisterOrganizationPage.js',
        permanent: true,
      },
      {
        source: '/vest-in-organization',
        destination: '/components/VestinOrgnanizationPage.js',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/components/pages/adminpage.js',
        permanent: true,
      },
    ];
  },

  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONTRACT_ADDRESS:"0xC82098E4e3e97A7f7E0acEA51F2F1d7F8f908FCd",
    ABI:[
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_orgAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "__type",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_period",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_reward",
            "type": "uint256"
          }
        ],
        "name": "addTypeToOrganization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          }
        ],
        "name": "claimToken",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_orgName",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_orgAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_tokenName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_tokenSymbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_totalSupply",
            "type": "uint256"
          }
        ],
        "name": "createOrganisation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "_type",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "period",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
              }
            ],
            "internalType": "struct organizationContract.typeStakeholder",
            "name": "__type",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "_orgAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_balance",
            "type": "uint256"
          }
        ],
        "name": "createStakeholder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_orgAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "orgAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "orgName",
            "type": "string"
          }
        ],
        "name": "OrganizationCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "orgAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "_type",
            "type": "string"
          }
        ],
        "name": "StakeholderCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "orgAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "_type",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "period",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "reward",
            "type": "uint256"
          }
        ],
        "name": "StakeholderTypeAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          }
        ],
        "name": "whiteList",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getOrganizationAddresses",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getOrganizationCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_orgAddress",
            "type": "address"
          }
        ],
        "name": "getOrganizationDetails",
        "outputs": [
          {
            "internalType": "string",
            "name": "orgName",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "orgAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "typeCount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_orgAddress",
            "type": "address"
          }
        ],
        "name": "getOrganizationTypes",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "_type",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "period",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
              }
            ],
            "internalType": "struct organizationContract.typeStakeholder[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "__address",
            "type": "address"
          }
        ],
        "name": "getStakeholder",
        "outputs": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "_type",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "period",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "reward",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct organizationContract.typeStakeholder",
                "name": "_type",
                "type": "tuple"
              },
              {
                "internalType": "address",
                "name": "orgAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
              }
            ],
            "internalType": "struct organizationContract.Stakeholder",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_orgAddress",
            "type": "address"
          }
        ],
        "name": "getStakeholdersByOrgAddress",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          }
        ],
        "name": "isWhiteListed",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "numOrganizations",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "organizationAddresses",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "Organizations",
        "outputs": [
          {
            "internalType": "string",
            "name": "orgName",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "orgAddress",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "Stakeholders",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "_type",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "period",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
              }
            ],
            "internalType": "struct organizationContract.typeStakeholder",
            "name": "_type",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "orgAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "tokenContractInstance",
        "outputs": [
          {
            "internalType": "contract tokenContract",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "whitelistedAddresses",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  }
}

module.exports = nextConfig
