import { Env } from '../../../config';
import aws from "aws-sdk";

aws.config.update({
  region: Env.AWSRegion,
  accessKeyId: Env.AWSAccessKey,
  secretAccessKey: Env.AWSSecret,
});

const ses = new aws.SES({ apiVersion: '2010-12-01' });

async function sendEmail(params) {
  return new Promise((resolve, reject) => {
    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.error(err, err.stack);
        reject(err);
      } else {
        // console.log('Email sent:', data);
        resolve(data);
      }
    });
  });
}
export default sendEmail;
