import React, { useState } from 'react';
import { auth } from 'firebaseSetup';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  refreshUser: () => void;
}

const Profile = ({ refreshUser }: ProfileProps) => {
  const [newDisplayName, setNewDisplayName] = useState<string | null>(null);
  const navigate = useNavigate();

  const onLogOutClick = () => {
    auth.signOut();
    navigate('/');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewDisplayName(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
      if (user.displayName !== newDisplayName) {
        await updateProfile(user, { displayName: newDisplayName });
        refreshUser();
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName ? newDisplayName : ""}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          style={{
            marginTop: 10,
          }}
          className="formBtn"
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
