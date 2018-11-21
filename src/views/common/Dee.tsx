import * as React from 'react';

export interface IProps {
  title: string;
  times: number;
};

const Dee: React.SFC<IProps> = ({ title, times }) => (
  <div>
    <h3>{title.repeat(times)}</h3>
  </div>
);

export default Dee;
