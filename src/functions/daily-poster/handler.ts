import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ScheduledEvent } from 'aws-lambda';
import { ScoreboardService } from 'src/services/scoreboard-service';
import { refreshThread } from "./../_shared"

const dailyPoster = async (event:ScheduledEvent) => {
  const scoreboardService = new ScoreboardService();
  const scoreboards = await scoreboardService.getScoreboards()
  scoreboards.forEach(async scoreboard => {
    const channel = scoreboard.id;
    await refreshThread(channel)
  })

  return formatJSONResponse({
    event
  });
}

export const main = middyfy(dailyPoster);
