import { WebClient } from "@slack/web-api";
import { ScoreboardService } from "src/services/scoreboard-service";
import { WORDLE_HEADER } from "src/types/constants";

export const refreshThread = async (channel: string) => {
    const token = process.env.SLACK_TOKEN;
    const slack = new WebClient(token);
    const scoreboardService = new ScoreboardService();
    const res = await slack.chat.postMessage({
        channel,
        text: WORDLE_HEADER
      })
  
    const ts = res.message.ts
    console.log('Refreshed thread')
    return await scoreboardService.refreshToday(channel, ts, {})
}