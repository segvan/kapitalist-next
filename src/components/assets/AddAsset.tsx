"use client";

import React, {useState} from 'react';

function AddAsset() {
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [assetValue, setAssetValue] = useState("");

  const isValid = !assetValue || assetValue.length >= 3;

  const openModal = () => {
    setIsDialogOpened(true);
  };

  const closeModal = () => {
    setAssetValue("");
    setIsDialogOpened(false);
  };

  function addAsset() {
    // TODO: Add new asset to the list
    alert(JSON.stringify({id: assetValue}));
    closeModal();
  }

  return (
    <>
      <button onClick={openModal} className="button is-primary is-outlined">Add asset</button>

      <div className={`modal ${isDialogOpened ? "is-active" : ""}`}>
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add new asset</p>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Asset Id</label>
              <div className="control">
                <input className="input" type="text" placeholder="Enter asset id"
                       value={assetValue} onChange={(e) => setAssetValue(e.target.value)}/>
                {!isValid && <p className="help is-danger">Invalid asset Id</p>}
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button className="button is-success" disabled={!isValid || !assetValue} onClick={addAsset}>Save
              </button>
              <button className="button" onClick={closeModal}>Cancel</button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default AddAsset;