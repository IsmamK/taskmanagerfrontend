import React, { createContext, useState, useEffect} from 'react';

export const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await fetch("/api/users/me", {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUsername(userData.username);
            setEmail(userData.email);
          } else {
            // Handle error response
            console.error('Failed to fetch user data:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [token]);

  return (
    <GlobalContext.Provider value={{ token, username, email, setToken, setUsername, setEmail }}>
      {children}
    </GlobalContext.Provider>
  );
};
