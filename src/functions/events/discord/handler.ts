import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as nacl from "tweetnacl";

const discord = async (event: any) => {
  const body = event.body as any;
  console.log(event)
  console.log('body')
  console.log(body)
  const PUBLIC_KEY = 'b966846f7daf49b55bf378ee288b927507621ae0b4171a6e9ba5e1a95830f9fb';
  console.log(event.headers)
  const signature = event.headers['x-signature-ed25519']
  const timestamp = event.headers['x-signature-timestamp']
  let isVerified
  try {
    isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + JSON.stringify(body)),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );
  } catch (e) {
    console.log(e)
  }

  console.log('verified: ', isVerified)
  if (!isVerified){
    return {
      statusCode: 401,
      message: 'invalid request signature'
    }
  }
  console.log('HITTING HERE THOUGH')
  return formatJSONResponse({
    test: 'a'
  });
}

export const main = middyfy(discord);
