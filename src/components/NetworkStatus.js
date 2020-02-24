import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = React.createContext();

export const NetworkStatus = ({children}) => {
  const [status, setStatus] = useState(true);
  useEffect(() => {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleConnectivityChange(),
    );
    return () => {
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        handleConnectivityChange(),
      );
    };
  }, []);

  const handleConnectivityChange = status => setStatus(status);

  return (
    <NetworkContext.Provider value={{status}}>
      {children}
    </NetworkContext.Provider>
  );
};
