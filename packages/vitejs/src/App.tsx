import React from 'react';
import { css } from '@emotion/react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useSWR, { Fetcher } from 'swr';

import ProTip from './ProTip';
import Copyright from './Copyright';

import { isValidSchema, assertBySchema } from '@common/schemas';
import { FooSchema, Foo } from '@common/schemas/schema-sample';
import {
  DummyGetResponse,
  DummyPostResponse,
  DummyPostResponseSchema,
} from '@common/schemas/api/models';

export default function App() {
  const fetcher: Fetcher<DummyGetResponse, string> = React.useCallback(
    (url) => fetch(url).then((r) => r.json()),
    [],
  );
  const { data, error } = useSWR<DummyGetResponse>('http://localhost:3000', (url) =>
    fetch(url).then((r) => r.json()),
  );

  const [resValue, setResValue] = React.useState<string>('');

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
            alignContent: 'center',
            padding: '1.5rem',
            textAlign: 'center',
          })}
        >
          {"lambda's ipv4: "}
          <span css={{ color: 'red', fontWeight: 'bold' }}>{data?.ipv4}</span>
        </div>
      </Box>
      <Box css={{ div: { margin: '1em' }, border: '2px solid' }}>
        <div css={{ button: { margin: '0.5rem' } }}>
          <button
            onClick={() => {
              setResValue('(loading...)');
              fetch('http://localhost:3000', {
                method: 'POST',
                body: JSON.stringify({
                  user: 'from client',
                }),
              })
                .then((r) => r.json())
                .then((data) => {
                  assertBySchema(data, DummyPostResponseSchema);
                  return data;
                })
                .then((data) => {
                  console.log(data);
                  setResValue(data.message);
                })
                .catch((e) => {
                  console.log(e);
                  setResValue('Failed to get value.');
                });
            }}
          >
            post test
          </button>
          <button
            onClick={() => {
              setResValue('');
            }}
          >
            clear
          </button>
        </div>
        <div css={{ border: '3px solid', borderColor: 'gray', padding: '0.5rem' }}>
          <output>
            value: <span css={{ color: 'orangered', fontWeight: 'bold' }}>{resValue}</span>
          </output>
        </div>
      </Box>
    </Container>
  );
}
