import { Env } from '../../config';
const aws = require('aws-sdk');
import util from 'util';
import generateUniqueId from '../datatime';
import { response } from 'express';

aws.config.update({
  region: Env.aws_region,
  accessKeyId: Env.aws_access_key,
  secretAccessKey: Env.aws_secert_access_key,
});

const s3 = new aws.S3();

export const deletephoto = async (pictureKey) => {
  // Decode the key to handle URL encoding issues
  const decodedKey = decodeURIComponent(pictureKey);
  const params = {
    Bucket: Env.Bucket,
    Key: decodedKey,
  };

  try {
    const data = await s3.deleteObject(params).promise();
    return 'Picture deleted successfully';
  } catch (error) {
    console.error('Error deleting picture:', error);
  }
};

export const uploadRequest = async (file) => {
  let response = await upload(file);
  return response.Location;
};

export const uploadRequestMultiple = async (files) => {
  let uploadedFiles = [];

  for (const filePath of files) {
    let response = await upload(filePath);
    uploadedFiles.push(response.Location);
  }

  return uploadedFiles;
};

async function upload(file) {
  // console.log(file)

  const uniqueID = await generateUniqueId();

  const uploadParams = {
    Bucket: Env.Bucket,
    Key: uniqueID + file.name,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };
  // Sconsole.log(uploadParams)

  const uploadPromise = await util.promisify(s3.upload.bind(s3));

  try {
    const data = await uploadPromise(uploadParams);
    //console.log("Upload Success", data.Location);
    // console.log("end upload")
    return data;
  } catch (err) {
    // console.log("Error", err);
    // console.log("error ")
    throw err;
  }
}
