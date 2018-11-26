export type ClientStats = {
  errors: any[];
  warinings: string[];
  hash: string;
  time: number;
  builtAt: number;
  publicPath: string;
  outputPath: string;
  assetsByChunkName: object;
  assets: object[];
  name: string;
};
