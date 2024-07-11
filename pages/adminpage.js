import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useUser } from '../context/UserContext';

const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = process.env.ABI;

export default function AdminPage() {
  const [nonWhitelistedStakeholders, setNonWhitelistedStakeholders] = useState([]);
  const [whitelistedStakeholders, setWhitelistedStakeholders] = useState([]);
  const [contract, setContract] = useState(null);
  const { userAddress } = useUser();

  useEffect(() => {
    const initializeContract = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        setContract(contractInstance);
        await fetchStakeholders(contractInstance);
      }
    };

    initializeContract();
  }, []);

  async function handleRegister() {
    if (!userAddress) {
      setMessage('Please connect your wallet first.');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);
      await fetchStakeholders(contractInstance);
    } catch (error) {
      console.error(error);
      setMessage('could not determine admin');
    }
  }

  const fetchStakeholders = async (contractInstance) => {
    try {
        let allStakeholders = [];


        const orgAddresses = await contractInstance.getOrganizationAddresses();

        for (let orgAddress of orgAddresses) {
        const stakeholderAddresses = await contractInstance.getStakeholdersByOrgAddress(orgAddress);
        
        for (let stakeholderAddress of stakeholderAddresses) {
            const stakeholder = await contractInstance.Stakeholders(stakeholderAddress);
            const isWhitelisted = await contractInstance.isWhiteListed(stakeholderAddress);
            allStakeholders.push({
            address: stakeholderAddress,
            orgAddress: orgAddress,
            type: stakeholder._type._type,
            isWhitelisted: isWhitelisted
            });
        }
        }
      

      setNonWhitelistedStakeholders(allStakeholders.filter(s => !s.isWhitelisted));
      setWhitelistedStakeholders(allStakeholders.filter(s => s.isWhitelisted));
    } catch (error) {
      console.error('Error fetching stakeholders:', error);
    }
  };

  const whitelistStakeholder = async (address) => {
    try {
      if (contract) {
        await contract.whiteList(address);
        await fetchStakeholders(contract);
      }
    } catch (error) {
      console.error('Error whitelisting stakeholder:', error);
    }
  };

  const StakeholderTable = ({ stakeholders, showWhitelistButton }) => (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Address</th>
          <th className="py-2 px-4 border-b">Organization</th>
          <th className="py-2 px-4 border-b">Type</th>
          {showWhitelistButton && <th className="py-2 px-4 border-b">Action</th>}
        </tr>
      </thead>
      <tbody>
        {stakeholders.map((stakeholder, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">{stakeholder.address}</td>
            <td className="py-2 px-4 border-b">{stakeholder.orgAddress}</td>
            {showWhitelistButton && (
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => whitelistStakeholder(stakeholder.address)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Whitelist
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Non-Whitelisted Stakeholders</h2>
      {nonWhitelistedStakeholders.length > 0 ? (
        <StakeholderTable stakeholders={nonWhitelistedStakeholders} showWhitelistButton={true} />
      ) : (
        <p>No non-whitelisted stakeholders.</p>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Whitelisted Stakeholders</h2>
      {whitelistedStakeholders.length > 0 ? (
        <StakeholderTable stakeholders={whitelistedStakeholders} showWhitelistButton={false} />
      ) : (
        <p>No whitelisted stakeholders.</p>
      )}
    </div>
  );
}