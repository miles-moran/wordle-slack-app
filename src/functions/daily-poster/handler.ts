import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ScheduledEvent } from 'aws-lambda';

const { WebClient } = require('@slack/web-api');

const dailyPoster = async (event:ScheduledEvent) => {
  const token = process.env.SLACK_TOKEN;
  const slack = new WebClient(token);
  console.log(slack)
  return formatJSONResponse({
    message: `Hello ${event}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(dailyPoster);
