import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { auth } from 'firebaseSetup';

const Navigation = () => {
  const user = auth.currentUser;

  return (
    <nav className="navigation">
      <ul className="navigation-ulist">
        <li>
          <Link to="/" className="navigation-ulist__link">
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="2x" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="navigation-ulist__link">
            <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="2x" />
            <span>
              {(user && user.displayName)
                ? `${user.displayName}'s Profile`
                : 'Profile'}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
