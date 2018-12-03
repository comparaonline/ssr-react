import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Title: React.SFC = (props) => <Typography variant="h5" color="secondary">{props.children}</Typography>;
