const uploadPhoto = require('./aws/s3');
export const deletePhotoWhileUpdate = async ({
  fileData,
  fileInFileData,
  existingFile,
}) => {
  let newFileName;

  if (fileData && fileInFileData) {
    if (existingFile) {
      const oldKey = existingFile.split('/').pop();
      await uploadPhoto.deletephoto(oldKey);
    }
    newFileName = await uploadPhoto.uploadRequest(fileInFileData);
  } else {
    newFileName = existingFile;
  }

  return newFileName; // Return the updated file name
};
