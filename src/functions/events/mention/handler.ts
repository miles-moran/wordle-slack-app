import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { WebClient } from '@slack/web-api';
import { ScoreboardService } from 'src/services/scoreboard-service';
import { WORDLE_HEADER } from 'src/types/constants';

const eventsMention = async (event: { body: any; }) => {
  const body = event.body as any;
  const { text, user, channel } = body.event;
  const token = process.env.SLACK_TOKEN;
  const slack = new WebClient(token);
  const scoreboardService = new ScoreboardService();

  const indexOfSlash = text.indexOf('/')
  if (indexOfSlash === -1){
    return
  }
  
  const record = await scoreboardService .getScoreboard(channel)

  const {ts, today, total} = record;

  if (user in today){
    return
  }
  const numerator = parseInt(text[indexOfSlash - 1])

  if (numerator < 0 || numerator > 6){
    return
  }

  const score = 7 - numerator;

  console.log('score: ', score)
  today[user] = score

  console.log('user: ', user)
  let name;
  if (user in total){
    total[user].total += score
    total[user].attempts += 1
    name = total[user].name
  } else {
    const res3 = await slack.users.info({
      user
    })
    console.log(res3)
    name = res3.user.name
    total[user] = {
      total: score,
      attempts: 1,
      name
    }
  }

  console.log('----')
  console.log(today, total)
  let scoreboard = `*Scoreboard*\n`
  Object.keys(today).forEach(u => {
    scoreboard += `${total[u].name}: ${total[u].total} (+${today[u]})\n`
  })

  console.log(record)

  await scoreboardService.editScoreboard(channel, total, today)

  await slack.chat.update({
    channel,
    ts,
    text: `${WORDLE_HEADER} ${scoreboard}`
  })
  return formatJSONResponse({
    challenge: body.challenge
  });
}

export const main = middyfy(eventsMention);
