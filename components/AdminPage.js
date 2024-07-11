import React, { useState } from 'react';

export default function AdminPage() {
  const [organizationName, setOrganizationName] = useState('');
  const [stakeholders, setStakeholders] = useState([{ name: '', vestingDetails: '' }]);

  const handleAddStakeholder = () => {
    setStakeholders([...stakeholders, { name: '', vestingDetails: '' }]);
  };

  const handleChangeStakeholder = (index, event) => {
    const values = [...stakeholders];
    values[index][event.target.name] = event.target.value;
    setStakeholders(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    alert(`Organization: ${organizationName}\nStakeholders: ${JSON.stringify(stakeholders)}`);
  };

  return (
    <div className='m-6 space-y-4'>
      <h1 className="text-gray-700 text-3xl font-bold">Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Organization Name:</label>
          <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} required />
        </div>
        {stakeholders.map((stakeholder, index) => (
          <div key={index}>
            <label>Stakeholder Name:</label>
            <input
              type="text"
              name="name"
              value={stakeholder.name}
              onChange={(e) => handleChangeStakeholder(index, e)}
              required
            />
            <label>Vesting Details:</label>
            <input
              type="text"
              name="vestingDetails"
              value={stakeholder.vestingDetails}
              onChange={(e) => handleChangeStakeholder(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddStakeholder}>Add Stakeholder</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
