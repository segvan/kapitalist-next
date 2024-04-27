import React from 'react';
import {db} from "@/src/db";
import AssetsList from "@/src/components/assets/AssetsList";

export const dynamic = "force-dynamic";

async function Assets() {

  const assets = await db.asset.findMany();

  return (
    <section className="section is-fullheight-100vh">
      <div className="container is-max-desktop">
        <p className="subtitle">Assets administration</p>
        <AssetsList data={assets}/>
      </div>
    </section>
  );
}

export default Assets;