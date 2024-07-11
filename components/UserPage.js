import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useUser } from '../context/UserContext';

export default function UserPage() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const abi = process.env.ABI;

  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const { setUserAddress } = useUser();
  const [isOrgAdmin, setIsOrgAdmin] = useState(false);
  const router = useRouter();


  async function checkIfOrgAdmin(address, provider) {
    try {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      console.log(0);
      const [orgName, orgAddress, typeCount] = await contract.getOrganizationDetails(address);
      
      console.log(1);
      // Assuming that if the orgAddress is not the zero address, it's a valid organization
      setIsOrgAdmin(orgAddress !== ethers.constants.AddressZero);
      console.log(2);
    } catch (error) {
      console.error("Error checking if org admin:", error);
      setIsOrgAdmin(false);
    }
  }


  async function initWallet() {
    try {
      const web3ModalVar = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
          },
        },
      });

      const instanceVar = await web3ModalVar.connect();
      const providerVar = new ethers.providers.Web3Provider(instanceVar);
      setProvider(providerVar);

      const signer = providerVar.getSigner();
      const userAddress = await signer.getAddress();
      setUserAddress(userAddress);
      
      await checkIfOrgAdmin(userAddress, providerVar);
      setConnected(true);
      
    } catch (error) {
      console.error(error);
      setError("Failed to connect wallet");
    }
  }

  const handleRegisterClick = () => {
    router.push('RegisterOrganizationPage');
  };

  const handleVestClick = () => {
    router.push('/VestinOrgnanizationPage');
  };

  const handleAdminClick = () => {
    router.push('adminpage');
  };

  const handleClaimClick = () => {
    router.push('claimpage');
  };

  return (
    <div className='m-6 space-y-4'>
      <h1 className="text-gray-700 text-3xl font-bold">User Page</h1>
      {!connected ? (
        <button className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-700 transition-all w-48' onClick={initWallet}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <h3>Wallet connected!</h3>
          <div className='space-y-2'>
            <button className='px-4 py-1 bg-green-500 text-white hover:bg-green-700 transition-all w-48' onClick={handleRegisterClick}>
              Register Organization
            </button>
            <button className='px-4 py-1 bg-purple-500 text-white hover:bg-purple-700 transition-all w-48' onClick={handleVestClick}>
              Vest in Organization
            </button>
            {isOrgAdmin && (
              <button className='px-4 py-1 bg-red-500 text-white hover:bg-red-700 transition-all w-48' onClick={handleAdminClick}>
                Admin Page
              </button>
            )}
            <button className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-700 transition-all w-48' onClick={handleClaimClick}>
            Claim Token
          </button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
