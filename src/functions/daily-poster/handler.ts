import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ScheduledEvent } from 'aws-lambda';
import { ScoreboardService } from 'src/services/scoreboard-service';
import { refreshThread } from "./../_shared"

const dailyPoster = async (event:ScheduledEvent) => {
  const scoreboardService = new ScoreboardService();
  const scoreboards = await scoreboardService.getScoreboards()
  for (const scoreboard of scoreboards) {
    const channel = scoreboard.id;
    console.log('refreshing channel: ', channel)
    const res = await refreshThread(channel)
    console.log(res)
    console.log('done')
  }


  return formatJSONResponse({
    event
  });
}

export const main = middyfy(dailyPoster);
