import React, { useState } from 'react';
import { v4 } from 'uuid';
import { auth, db, storage } from 'firebaseSetup';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const KiweetFactory = () => {
  const [kiweet, setKiweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const user = auth.currentUser;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let attachmentURL = '';

    if (attachment !== '') {
      const attachmentRef = ref(storage, `${(user && user.uid)}/${v4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url'
      );
      attachmentURL = await getDownloadURL(response.ref);
    }

    try {
      const docRef = await addDoc(collection(db, 'kiweets'), {
        text: kiweet,
        createdAt: Timestamp.now(),
        creatorId: (user && user.uid),
        attachmentURL,
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }

    if (kiweet !== '') {
      setKiweet('');
      setAttachment('');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const {
    //   target: { value },
    // } = event;
    const { value } = event.target;
    setKiweet(value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const {
    //   target: { files },
    // } = event;
    const { files } = event.target;
    if (files) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent: any) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment('');

  return (
    <form onSubmit={onSubmit} className="kiweet-factory-form">
      <div className="kiweet-factory-input__container">
        <input
          value={kiweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          className="kiweet-factory-input__input"
        />
        <input
          type="submit"
          value="&rarr;"
          className="kiweet-factory-input__arrow"
        />
      </div>
      <label htmlFor="attach-file" className="kiweet-factory-input__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        id="attach-file"
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="kiweet-factory-form__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div
            className="kiweet-factory-form__attachment__clear"
            onClick={onClearAttachment}
          >
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default KiweetFactory;
