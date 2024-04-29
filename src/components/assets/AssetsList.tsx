"use client";

import AssetModel from "@/src/components/assets/AssetModel";
import AddAsset from "@/src/components/assets/AddAsset";
import DeleteAsset from "@/src/components/assets/DeleteAsset";

function AssetsList({data}: AssetsListProperties) {
  return (
    <>
      <div className="columns is-mobile">
        <div className="column is-1 is-offset-7-mobile is-offset-9-desktop">
          <AddAsset/>
        </div>
      </div>
      <div className="tags are-large">
        {data.map((asset) => (
          <span className="tag is-primary is-light" key={asset.id}>
          <h1 className="is-size-4 is-size-3-desktop has-text-weight-medium">{asset.id}</h1>
          <DeleteAsset assetId={asset.id}/>
        </span>
        ))}
      </div>
    </>
  );
}

export type AssetsListProperties = {
  data: AssetModel[];
};

export default AssetsList;