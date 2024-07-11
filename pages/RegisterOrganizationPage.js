import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useUser } from '../context/UserContext';

export default function RegisterOrganizationPage() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const abi = process.env.ABI;

  const { userAddress } = useUser();
  const [organizationName, setOrganizationName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [stakeholders, setStakeholders] = useState([{ _type: '', period: '', reward: 0 }]);
  const [message, setMessage] = useState('');

  async function handleRegister() {
    if (!userAddress) {
      setMessage('Please connect your wallet first.');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(0);
      await contract.createOrganisation(organizationName, userAddress, tokenName, tokenSymbol, ethers.utils.parseUnits(totalSupply, 18));
      console.log(1);
      for (let stakeholder of stakeholders) {
      console.log(2);
        await contract.addTypeToOrganization(userAddress, stakeholder._type, stakeholder.period, stakeholder.reward);
        console.log(3);
      }

      setMessage(`Organization ${organizationName} registered successfully with stakeholder types!`);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while registering the organization.');
    }
  }

  function addStakeholderField() {
    setStakeholders([...stakeholders, { _type: '', period: '', reward: 0}]);
  }

  function handleStakeholderChange(index, field, value) {
    const newStakeholders = stakeholders.slice();
    newStakeholders[index][field] = value;
    setStakeholders(newStakeholders);
  }

  return (
    <div className='m-6 space-y-4'>
      <h1 className="text-gray-700 text-3xl font-bold">Register Organization</h1>
      <input
        type='text'
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        placeholder='Organization Name'
        className='px-4 py-2 border rounded w-full'
      />
      <input
        type='text'
        value={tokenName}
        onChange={(e) => setTokenName(e.target.value)}
        placeholder='Token Name'
        className='px-4 py-2 border rounded w-full'
      />
      <input
        type='text'
        value={tokenSymbol}
        onChange={(e) => setTokenSymbol(e.target.value)}
        placeholder='Token Symbol'
        className='px-4 py-2 border rounded w-full'
      />
      <input
        type='text'
        value={totalSupply}
        onChange={(e) => setTotalSupply(e.target.value)}
        placeholder='Total Supply'
        className='px-4 py-2 border rounded w-full'
      />
      <div className='space-y-2'>
        <h3 className='text-lg font-bold'>Stakeholder Types</h3>
        {stakeholders.map((stakeholder, index) => (
          <div key={index} className='space-y-2 border-t pt-4'>
            <input
              type='text'
              value={stakeholder._type}
              onChange={(e) => handleStakeholderChange(index, '_type', e.target.value)}
              placeholder='Stakeholder Type'
              className='px-4 py-2 border rounded w-full'
            />
            <input
              type='number'
              value={stakeholder.period}
              onChange={(e) => handleStakeholderChange(index, 'period', e.target.value)}
              placeholder='Vesting Period (in seconds)'
              className='px-4 py-2 border rounded w-full'
            />
            <input
              type='number'
              value={stakeholder.reward}
              onChange={(e) => handleStakeholderChange(index, 'reward', e.target.value)}
              placeholder='Reward for Stakeholder'
              className='px-4 py-2 border rounded w-full'
            />
          </div>
        ))}
        <button
          className='px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 transition-all w-full flex items-center justify-center'
          onClick={addStakeholderField}
        >
          <span className='mr-2'>Add Stakeholder Type</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 01.993.883L11 6v3h3a1 1 0 01.117 1.993L14 11h-3v3a1 1 0 01-1.993.117L9 14v-3H6a1 1 0 01-.117-1.993L6 9h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <button
        className='px-4 py-2 bg-green-500 text-white hover:bg-green-700 transition-all w-full'
        onClick={handleRegister}
      >
        Register
      </button>
      {message && <p className='text-green-500'>{message}</p>}
    </div>
  );
}