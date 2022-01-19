import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';

const eventListener = async (event:APIGatewayEvent) => {
  console.log(event)
  console.log(event.body)
  console.log(typeof event.body)
  const body = JSON.parse(event.body);
  console.log(body)
  return formatJSONResponse({
    message: `Hello ${event.body}, welcome to the exciting Serverless world!`,
    challenge: body.challenge,
    event,
  });
}

export const main = middyfy(eventListener);
