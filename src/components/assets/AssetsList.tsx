import React from 'react';
import AssetModel from "@/src/components/assets/AssetModel";

function AssetsList({data}: AssetsListProperties) {
  return (
    <>
      <div className="columns is-mobile">
        <div className="column is-1 is-offset-7-mobile is-offset-9-desktop">
          <button className="button is-primary is-outlined">Add asset</button>
        </div>
      </div>
      <div className="tags are-large">
        {data.map((asset) => (
          <span className="tag is-primary is-light" key={asset.id}>
          <h1 className="is-size-4 is-size-3-desktop has-text-weight-medium">{asset.id}</h1>
          <button className="delete is-medium"/>
        </span>
        ))}
      </div>
    </>
  );
}

export default AssetsList;

export type AssetsListProperties = {
  data: AssetModel[];
};