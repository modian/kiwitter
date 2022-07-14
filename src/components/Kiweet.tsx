import React, { useState } from 'react';
import { db, storage } from 'firebaseSetup';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

interface KiweetProps {
  kiweetObj: any;
  isOwner: boolean;
}

const Kiweet = ({ kiweetObj, isOwner }: KiweetProps) => {
  const [editing, setEditing] = useState(false);
  const [newkiweet, setNewkiweet] = useState(kiweetObj.text);

  let kiweetRef;

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this kiweet?');
    if (ok) {
      kiweetRef = doc(db, 'kiweets', `${kiweetObj.id}`);
      await deleteDoc(kiweetRef);
      await deleteObject(ref(storage, kiweetObj.attachmentURL));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    kiweetRef = doc(db, 'kiweets', `${kiweetObj.id}`);
    await updateDoc(kiweetRef, { text: newkiweet });
    setEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const {
    //   target: { value },
    // } = event;
    const { value } = event.target;
    setNewkiweet(value);
  };

  return (
    <div className="kiweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container kiweetEdit">
            <input
              type="text"
              placeholder="Edit your kiweet"
              value={newkiweet}
              required
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update kiweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{kiweetObj.text}</h4>
          {kiweetObj.attachmentURL && (
            <img src={kiweetObj.attachmentURL} width="50px" height="50px" />
          )}
          {isOwner && (
            <div className="kiweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Kiweet;
