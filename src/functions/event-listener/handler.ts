import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const eventListener = async (event) => {
  const body = event.body as any;
  return formatJSONResponse({
    challenge: body.challenge
  });
}

export const main = middyfy(eventListener);
