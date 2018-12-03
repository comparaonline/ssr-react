import { State } from 'Redux/reducers';
import { i18n } from 'Types/i18n';
import { Ii18n } from '../server/middlewares/i18next';
import { LazyLoadedString } from 'webpack-flush-chunks';

export interface IConfigLayout {
  js: LazyLoadedString;
  helmet: any;
  styles: any;
  cssHash: any;
  content: string;
  materialCSS: string;
  reduxInitialState: State;
  apolloInitialState: any;
  i18nInitialState: Partial<i18n>;
  i18nInitialLanguage: Ii18n['language'];
}

export type Layout = (config: IConfigLayout) => string;
