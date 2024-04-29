"use client";

import React, {useState} from 'react';

function DeleteAsset({assetId}: DeleteAssetProperties) {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  function deleteAsset(assetId: string) {
    // TODO: Remove asset from the list
    alert(assetId);
    setIsDialogOpened(false);
  }

  return (
    <>
      <button className="delete is-medium" onClick={() => setIsDialogOpened(true)}/>

      <div className={`modal ${isDialogOpened ? "is-active" : ""}`}>
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Delete {assetId}?</p>
          </header>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button className="button is-danger" onClick={() => deleteAsset(assetId)}>Delete</button>
              <button className="button" onClick={() => setIsDialogOpened(false)}>Cancel</button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export type DeleteAssetProperties = {
  assetId: string;
};

export default DeleteAsset;