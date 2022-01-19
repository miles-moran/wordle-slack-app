import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { URLSearchParams } from 'url';
import * as nacl from "tweetnacl";

const discord = async (event: { body: any; }) => {
  const body = event.body as any;
  console.log(body)
  const PUBLIC_KEY = 'b966846f7daf49b55bf378ee288b927507621ae0b4171a6e9ba5e1a95830f9fb';
  const params = new URLSearchParams(event.body)
  console.log('params', params)
  const signature = params.get('X-Signature-Ed25519');
  const timestamp = params.get('X-Signature-Timestamp');

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    return {
      statusCode: 401
    }
  }

  console.log('isVerified', isVerified)
  return formatJSONResponse({
    challenge: body.challenge
  });
}

export const main = middyfy(discord);
