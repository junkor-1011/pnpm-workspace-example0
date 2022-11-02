import React from 'react';
import { css } from '@emotion/react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';

import { isValidSchema } from '@common/schemas';
import { FooSchema, Foo } from '@common/schemas/schema-sample';

export default function App() {
  const a: Foo = { username: 'Johny' };
  const b = { username: 'Joseph', email: 'hogefuga@example.com' };
  if (!isValidSchema(b, FooSchema)) return null;
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Vite.js example
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
      <Box>
        <div
          css={css({
            color: 'red',
            fontWeight: 'bold',
          })}
        >
          username: {a.username}
        </div>
      </Box>
    </Container>
  );
}
