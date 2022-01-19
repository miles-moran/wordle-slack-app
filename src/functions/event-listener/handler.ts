import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const eventListener = async (event) => {
  const body = event.body as any;
  return formatJSONResponse({
    message: `Hello ${event.body}, welcome to the exciting Serverless world!`,
    challenge: body.challenge,
    event,
  });
}

export const main = middyfy(eventListener);
