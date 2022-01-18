import type { AWS } from '@serverless/typescript';

import dailyPoster from '@functions/daily-poster';
import eventListener from '@functions/event-listener';
import initListener from '@functions/init-listener';

const serverlessConfiguration: AWS = {
  service: 'wordle-bot',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    wordleTableName: {
      local: '',
      dev: 'dev-wordle-scoreboard-table'
    },
    slackToken: {
      local: '',
      dev: '${ssm:DEVELOPMENT.WORDLE_BOT_SLACK_TOKEN}'
    },
  },
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${opt:stage,"local"}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      wordleScoreboardTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:custom.wordleTableName.${self:provider.stage}}",
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  },
  functions: { 
    initListener,
    eventListener, 
    dailyPoster
  },
  package: { individually: true }
};

module.exports = serverlessConfiguration;

    

