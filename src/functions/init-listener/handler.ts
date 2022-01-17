import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';

const initListener = async (event:APIGatewayEvent) => {
  const body = JSON.parse(event.body)
  console.log(body)
  return 'A Wordle leaderboard has been created for this channel!'
}

export const main = middyfy(initListener);
