import { auth } from 'firebaseSetup';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const Auth = () => {
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // const {
    //   target: { name },
    // } = event; //const name = event.target.name
    const { name } = event.target as any;

    let provider;
    try {
      if (name === 'google') {
        provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        if (result) {
          const user = result.user;
          const credential: any = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
        }
      } else if (name === 'github') {
        provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        if (result) {
          const user = result.user;
          const credential: any = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
