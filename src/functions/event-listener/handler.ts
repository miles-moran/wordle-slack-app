import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';

const eventListener = async (event:APIGatewayEvent) => {
  console.log(event)
  return formatJSONResponse({
    message: `Hello ${event.body}, welcome to the exciting Serverless world!`,
    challenge: 'a',
    event,
  });
}

export const main = middyfy(eventListener);
