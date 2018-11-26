import { IConfigLayout, Layout as LayoutType } from 'Types/layout';

export enum Layout {
  default = 'default',
  amp = 'amp'
}

export default (config: IConfigLayout, template: Layout = Layout.default) => {
  const layout: LayoutType = require(`./index.${template}.ts`).layout; // eslint-disable-line
  return layout(config);
};
