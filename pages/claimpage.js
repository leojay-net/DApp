import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useUser } from '../context/UserContext';

const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = process.env.ABI;

export default function ClaimPage() {
  const [contract, setContract] = useState(null);
  const { userAddress } = useUser();
  const [balance, setBalance] = useState(0);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeContract = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        setContract(contractInstance);
      }
    };

    initializeContract();
  }, []);

  useEffect(() => {
    if (contract && userAddress) {
      fetchUserData();
    }
  }, [contract, userAddress]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const stakeholder = await contract.Stakeholders(userAddress);
      if (stakeholder.userAddress !== ethers.constants.AddressZero) {
        const whitelisted = await contract.isWhiteListed(userAddress);
        setIsWhitelisted(whitelisted);
        if (whitelisted) {
          const userBalance = await contract.Stakeholders(userAddress);
          setBalance(ethers.utils.formatUnits(userBalance.balance, 18)); 
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setIsLoading(false);
  };

  const handleClaim = async () => {
    if (!contract || !userAddress) return;
    try {
      const tx = await contract.claimToken(userAddress);
      await tx.wait();
      await fetchUserData(); // Refresh data after claiming
    } catch (error) {
      console.error('Error claiming tokens:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Claim Page</h1>
      
      {isWhitelisted ? (
        <div>
          <p className="mb-4">Your Balance: {balance} tokens</p>
          <button 
            onClick={handleClaim}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Claim Tokens
          </button>
        </div>
      ) : (
        <p>You are not whitelisted. Please contact the administrator.</p>
      )}
    </div>
  );
}