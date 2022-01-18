const STAGE = process.env.STAGE;

const ALL_ENV_VARS = {
    wordleTable: {
        local: '',
        dev: `${STAGE}-wordle-scoreboard-table`
    },
    slackToken: {
        local: '',
        dev: '${ssm:DEVELOPMENT.WORDLE_BOT_SLACK_TOKEN}'
    },
}

export const ENV_VARS = {
    worldTable: ALL_ENV_VARS.wordleTable[STAGE],
    slackToken: ALL_ENV_VARS.slackToken[STAGE],
}

    