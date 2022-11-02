import 'source-map-support/register';

import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  // APIGatewayProxyEventHeaders,
} from 'aws-lambda';

import { DummyPostRequestSchema, DummyPostResponseSchema } from '@common/schemas/api/models';
import { isValidSchema, assertBySchema } from '@common/schemas';

const url = 'http://checkip.amazonaws.com';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;

  const reqBody = JSON.parse(event.body || '');
  if (!isValidSchema(reqBody, DummyPostRequestSchema)) {
    console.debug(reqBody);
    return {
      statusCode: 421,
      body: JSON.stringify({
        message: 'invalid request',
      }),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
    };
  }

  try {
    const resBody = {
      message: `POST test, hello: ${reqBody.user}`,
      date: new Date(),
    };
    assertBySchema(resBody, DummyPostResponseSchema);

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
