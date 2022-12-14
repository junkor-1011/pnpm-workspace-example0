import 'source-map-support/register';

import axios, { AxiosResponse } from 'axios';
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  // APIGatewayProxyEventHeaders,
} from 'aws-lambda';

import { DummyGetResponseSchema } from '@common/schemas/api/models';
import { assertBySchema } from '@common/schemas';

const url = 'http://checkip.amazonaws.com';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;

  try {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const myUrlData: AxiosResponse<string> = await axios(url);
    const myUrl = myUrlData.data.trim();
    const resBody = {
      message: 'hello world',
      ipv4: myUrl,
      date: new Date(),
    };
    assertBySchema(resBody, DummyGetResponseSchema);

    response = {
      statusCode: 200,
      body: JSON.stringify(resBody),
      headers: {
        // "Access-Control-Allow-Headers": "*",
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        // "Access-Control-Allow-Methods": "*"
      },
    };
  } catch (err) {
    console.log(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
      headers: {
        // "Access-Control-Allow-Headers": "*",
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        // "Access-Control-Allow-Methods": "*"
      },
    };
  }

  return response;
};
