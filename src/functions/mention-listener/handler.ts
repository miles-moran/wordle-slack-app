import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';


const mentionListener = async (event:APIGatewayEvent) => {
  return formatJSONResponse({
    message: `Hello ${event.body}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(mentionListener);
