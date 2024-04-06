import {db} from "../db";
import {Symbol} from "./models";

const getSymbols = async (onlyDefault = true): Promise<Symbol[]> => {
  const stables = onlyDefault
    ? await db.stable.findMany({where: {isDefault: true}})
    : await db.stable.findMany();

  const assets = await db.asset.findMany();

  return assets.map(asset => stables.map(stable => {
    return {Id: asset.id, Stable: stable.id, Code: `${asset.id}${stable.id}`};
  })).flat();
};

export default getSymbols;