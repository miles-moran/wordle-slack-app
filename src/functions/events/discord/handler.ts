import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const discord = async (event: { body: any; }) => {
  const body = event.body as any;
  console.log(body)
  return formatJSONResponse({
    challenge: body.challenge
  });
}

export const main = middyfy(discord);
