import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userAddress, setUserAddress] = useState('');

  return (
    <UserContext.Provider value={{ userAddress, setUserAddress }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
