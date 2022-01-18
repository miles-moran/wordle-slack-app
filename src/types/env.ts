const ssm = (name:string) => {
    const PREFIXES = {
      dev: 'DEVELOPMENT',
      stage: 'STAGE',
      prod: 'PRODUCTION'
    }
    return "${" + `ssm:${PREFIXES[STAGE_NAME]}.${name}}`
}

export const { STAGE_NAME } = process.env;

export const ENV_VARS = {
  local: '',
  dev: ssm('WORDLE_BOT_SLACK_TOKEN')
}

