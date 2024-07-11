import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useUser } from '../context/UserContext';

export default function VestInOrganizationPage() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const abi = process.env.ABI;

  const { userAddress } = useUser();
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [stakeholderTypes, setStakeholderTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userAddress) {
      fetchOrganizations();
    }
  }, [userAddress]);

  async function fetchOrganizations() {
    console.log("started");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("done");
      const contract = new ethers.Contract(contractAddress, abi, provider);

      // const orgCount = await contract.getOrganizationCount();
      const orgAddresses = await contract.getOrganizationAddresses();
      // console.log("count", orgCount);
      console.log("Addresses", orgAddresses);
      // const orgs = [];

      const orgs = await Promise.all(orgAddresses.map(async (address) => {
        const [orgName, orgAddress, typeCount] = await contract.getOrganizationDetails(address);
        const types = await contract.getOrganizationTypes(address);
    
        return { address, name: orgName, types };
      }));

      setOrganizations(orgs);
    
      // for (let i = 0; i < orgCount; i++) {
      //   const orgAddress = await contract.getOrganizations(i);
      //   console.log("orgAddress", orgAddress);
      //   const org = await contract.Organizations(orgAddress);
      //   console.log("org", org);
      //   orgs.push({ address: orgAddress, name: org.orgName });
      // }

      // setOrganizations(orgs);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while fetching organizations.');
    }
  }

  async function fetchStakeholderTypes(orgAddress) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
  
      const organization = await contract.getOrganizationTypes(orgAddress);
      console.log("Organization", organization);
      const formattedTypes = Object.values(organization).map(type => ({
        _type: type._type,
        period: type.period.toString(),
        reward: type.reward.toString(),
        // Add other properties as needed
      }));
      console.log("Organization", formattedTypes);
      // Update state inside the callback function
      setStakeholderTypes(formattedTypes);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while fetching stakeholder types.');
      setStakeholderTypes([]);
    }
  }
  

  const handleOrganizationChange = (e) => {
    const selectedOrgAddress = e.target.value;
    console.log("orgAddress", selectedOrgAddress);
    setSelectedOrganization(selectedOrgAddress);
    fetchStakeholderTypes(selectedOrgAddress);
  };

  const handleVest = async () => {
    if (!userAddress || !selectedOrganization || !selectedType) {
      setMessage('Please fill in all the fields.');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

    
      await contract.createStakeholder(
        selectedType,
        selectedOrganization,
        userAddress,
        ethers.utils.parseUnits(amount, 18)
      );

      setMessage(`Successfully vested as a ${selectedType._type} in the organization`);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while vesting.');
    }
  };

  return (
    <div className='m-6 space-y-4'>
      <h1 className="text-gray-700 text-3xl font-bold">Vest in Organization</h1>
      <select
        value={selectedOrganization}
        onChange={handleOrganizationChange}
        className='px-4 py-2 border rounded w-full'
      >
        <option value=''>Select Organization</option>
        {organizations.map((org, index) => (
          <option key={index} value={org.address}>{org.name}</option>
        ))}
      </select>
      {stakeholderTypes.length > 0 && (
        <div>
          <h2 className="text-gray-700 text-2xl font-semibold mt-4">Select Stakeholder Type</h2>
          <div className="mt-2">
            {stakeholderTypes.map((type, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`type_${index}`}
                  name="stakeholderType"
                  value={index}
                  onChange={() => setSelectedType(type)}
                />
                <label htmlFor={`type_${index}`}>{type._type} (Vesting period: {type.period} seconds)</label>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        className='px-4 py-2 bg-purple-500 text-white hover:bg-purple-700 transition-all w-full'
        onClick={handleVest}
      >
        Vest
      </button>
      {message && <p className='text-green-500'>{message}</p>}
    </div>
  );
}