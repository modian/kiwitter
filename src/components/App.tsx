import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { auth } from 'firebaseSetup';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateProfile(user, { displayName: user.displayName });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    if (user)
      setDisplayName(user.displayName);
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}
      <footer>&copy; {new Date().getFullYear()} Kiwitter</footer>
    </>
  );
}

export default App;
