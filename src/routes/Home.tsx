import React, { useState, useEffect } from 'react';
import { auth, db } from 'firebaseSetup';
import { query, orderBy, collection, onSnapshot, DocumentData } from 'firebase/firestore';
import Kiweet from 'components/Kiweet';
import KiweetFactory from 'components/KiweetFactory';

const Home = () => {
  const [kiweets, setKiweets] = useState<DocumentData>([]);

  useEffect(() => {
    const q = query(collection(db, 'kiweets'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const kiweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKiweets(kiweetArr);
    });
  }, []);

  const user = auth.currentUser;

  return (
    <div className="container">
      <KiweetFactory />
      <div>
        {kiweets.map((kiweet: DocumentData) => (
          <Kiweet
            key={kiweet.id}
            kiweetObj={kiweet}
            isOwner={kiweet.creatorId === (user && user.uid)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
