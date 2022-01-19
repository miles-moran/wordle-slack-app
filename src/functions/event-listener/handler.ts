import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const eventListener = async (event:any) => {
  const body = event.body as any;
  const t
  return formatJSONResponse({
    message: `Hello ${event.body}, welcome to the exciting Serverless world!`,
    challenge: body.challenge,
    event,
  });
}

export const main = middyfy(eventListener);
