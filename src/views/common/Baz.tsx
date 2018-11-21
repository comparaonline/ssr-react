import * as React from 'react';

export interface IProps {
  title: string;
  times: number;
};

const Baz: React.SFC<IProps> = ({ title, times }) => (
  <div>
    <h4>{title.repeat(times)}</h4>
  </div>
);

export default Baz;
