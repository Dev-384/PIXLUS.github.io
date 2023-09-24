import assets from "./assets.json";
export const assetFile = assets;

export const blocks = await import(`${assets.texture_pack.path}/blocks/blocks.json`);