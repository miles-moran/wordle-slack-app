import { DynamoDB } from "aws-sdk"
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 as uuid } from "uuid";

export class ScoreboardService {
    private WORDLE_TABLE = process.env.WORDLE_TABLE;
    private dynamoDbClient: DocumentClient;
    constructor() {
      this.dynamoDbClient = new DynamoDB.DocumentClient();
    }

    getScoreboards = async () => {
      const params = {
        TableName: this.WORDLE_TABLE,
        Key: {
          
        },
      }
  
      const res = await this.dynamoDbClient.query(params).promise();
      const vibes = res.Items;
      return vibes;
    };
  
    getScoreboard = async (id:string) => {
      const params = {
        TableName: this.WORDLE_TABLE,
        Key: {
          id,
        },
      }
  
      const res = await this.dynamoDbClient.get(params).promise();
      const vibe = res.Item;
      return vibe;
    };

    editScoreboard = async (id:string, newTotal, newToday) => {
      const params = {
        TableName: this.WORDLE_TABLE,
        Key: {
          id,
        },
        UpdateExpression:
          "set #total = :newTotal, #today = :newToday",
        ExpressionAttributeNames: {
          "#total": "total",
          "#today": "today",

        },
        ExpressionAttributeValues: {
          ":newTotal": newTotal,
          ":newToday": newToday
        },
      };
  
      const res = await this.dynamoDbClient.update(params).promise();
      return res;
    };

    refreshToday = async (id, ts, today) => {
      const params = {
        TableName: this.WORDLE_TABLE,
        Key: {
          id,
        },
        UpdateExpression:
          "set #ts = :ts, #today = :today",
        ExpressionAttributeNames: {
          "#ts": "ts",
          "#today": "today",
        },
        ExpressionAttributeValues: {
          ":ts": ts,
          ":today": today
        },
      };
  
      const res = await this.dynamoDbClient.update(params).promise();
      return res;
    };

    createScoreboard = async (scoreboard) => {
        const params = {
            TableName: this.WORDLE_TABLE,
            Item: {
              userId: uuid(),
              ...scoreboard
            },
          };
          
        const res = await this.dynamoDbClient.put(params).promise();
        return res
    }
  
  }