import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const dailyPoster = async (event) => {
  console.log(event)
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(dailyPoster);
