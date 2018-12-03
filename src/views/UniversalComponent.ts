import universal from 'react-universal-component';

export interface AsyncProps {
  page: string | Function;
}

const determineHowToLoad = ({ page }: AsyncProps) =>
  typeof page !== 'string' ? () => page() : import(`./${page}`);

const UniversalComponent = universal(determineHowToLoad, { minDelay: 800 });

export default UniversalComponent;
