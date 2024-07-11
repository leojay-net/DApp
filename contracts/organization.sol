// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./token.sol";

contract organizationContract {
    
    mapping(address => bool) public whitelistedAddresses;
    tokenContract public tokenContractInstance;

    struct Organization {
        string orgName;
        address orgAddress;
        typeStakeholder[] types;
    }

    struct typeStakeholder {
        string _type;
        uint period;
        uint reward;
    }

    struct Stakeholder {
        typeStakeholder _type;
        address orgAddress;
        address userAddress;
        uint balance;
    }

    mapping(address => Stakeholder) public Stakeholders;
    mapping(address => Organization) public Organizations;
    address[] public organizationAddresses;
    uint public numOrganizations = 0;

    event OrganizationCreated(address indexed orgAddress, string orgName);
    event StakeholderTypeAdded(address indexed orgAddress, string _type, uint period, uint reward);
    event StakeholderCreated(address indexed userAddress, address indexed orgAddress, string _type);

    constructor(address _orgAddress) {
        tokenContractInstance = tokenContract(_orgAddress);
    }

    function createOrganisation(string memory _orgName, address _orgAddress, string memory _tokenName, string memory _tokenSymbol, uint _totalSupply) public {
        require(Organizations[_orgAddress].orgAddress == address(0), "Organization already exists");
        
        Organizations[_orgAddress].orgName = _orgName;
        Organizations[_orgAddress].orgAddress = _orgAddress;
        // The types array is automatically initialized as an empty dynamic array

        tokenContractInstance.createToken(_orgAddress, _tokenName, _tokenSymbol, _totalSupply);
        organizationAddresses.push(_orgAddress);
        numOrganizations++;

        emit OrganizationCreated(_orgAddress, _orgName);
    }

    function addTypeToOrganization(address _orgAddress, string memory __type, uint _period, uint _reward) public {
        require(Organizations[_orgAddress].orgAddress != address(0), "Organization does not exist");
        Organizations[_orgAddress].types.push(typeStakeholder(__type, _period, _reward));
        emit StakeholderTypeAdded(_orgAddress, __type, _period, _reward);
    }

    function createStakeholder(typeStakeholder memory __type, address _orgAddress, address _userAddress, uint _balance) public {
        require(Organizations[_orgAddress].orgAddress != address(0), "Organization does not exist");
        Stakeholders[_userAddress] = Stakeholder(__type, _orgAddress, _userAddress, _balance);
        emit StakeholderCreated(_userAddress, _orgAddress, __type._type);
    }

    function getStakeholder(address __address) public view returns (Stakeholder memory) {
        return Stakeholders[__address];
    }

    function whiteList(address _address) public {
        whitelistedAddresses[_address] = true;
    }

    function isWhiteListed(address _address) public view returns (bool) {
        return whitelistedAddresses[_address];
    }

    function claimToken(address _address) public returns(bool) {
        if (isWhiteListed(_address)) {
            Stakeholders[_address].balance = Stakeholders[_address]._type.reward;  
            return true;   
        } else {
            return false;
        }
    }

    function getOrganizationCount() public view returns (uint) {
        return numOrganizations;
    }

    function getOrganizationAddresses() public view returns (address[] memory) {
        return organizationAddresses;
    }

    function getOrganizationDetails(address _orgAddress) public view returns (string memory orgName, address orgAddress, uint typeCount) {
        require(Organizations[_orgAddress].orgAddress != address(0), "Organization does not exist");
        Organization storage org = Organizations[_orgAddress];
        return (org.orgName, org.orgAddress, org.types.length);
    }

    function getOrganizationTypes(address _orgAddress) public view returns (typeStakeholder[] memory) {
        require(Organizations[_orgAddress].orgAddress != address(0), "Organization does not exist");
        return Organizations[_orgAddress].types;
    }

    function getStakeholdersByOrgAddress(address _orgAddress) public view returns (address[] memory) {
    require(Organizations[_orgAddress].orgAddress != address(0), "Organization does not exist");
    
    uint stakeholderCount = 0;
    for (uint i = 0; i < organizationAddresses.length; i++) {
        if (Stakeholders[organizationAddresses[i]].orgAddress == _orgAddress) {
            stakeholderCount++;
        }
    }
    address[] memory stakeholderAddresses = new address[](stakeholderCount);
    uint currentIndex = 0;
    for (uint i = 0; i < organizationAddresses.length; i++) {
        if (Stakeholders[organizationAddresses[i]].orgAddress == _orgAddress) {
            stakeholderAddresses[currentIndex] = organizationAddresses[i];
            currentIndex++;
        }
    }
    
    return stakeholderAddresses;
}
}