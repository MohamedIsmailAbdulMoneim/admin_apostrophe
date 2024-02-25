import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import classes from './alert.module.css' 

/*
    success info warning error
*/

export default function BasicAlerts({severity, text}) {
  return (
    <div className={classes.container}>
      <Stack  spacing={2}>
        <Alert severity={severity}>{text}.</Alert>
      </Stack>
    </div>
  );
}
