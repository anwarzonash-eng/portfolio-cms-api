const fs = require('fs');
const path = require('path');
const alphabetArray = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export function generateRandomKey() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomKey = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }

  return randomKey;
}

export async function generateDynamicUniqueKey(mainProfileId) {
  let uniqueKey = 'N/A';
  let existingGeneratedKeys = await read();

  while (true) {
    const newKey = generateRandomKey();

    if (
      existingGeneratedKeys.length === 0 ||
      !existingGeneratedKeys.some(
        (item) =>
          item.mainProfileId === mainProfileId && item.uniqueKey === newKey
      )
    ) {
      uniqueKey = newKey;
      break;
    }
  }

  // console.log(uniqueKey);
  return uniqueKey;
}

export async function generateUniqueId(mainProfileID) {
  let uniqueID = 'N/A';
  let existingGeneratedID = await read();

  for (let alphabet of alphabetArray) {
    if (existingGeneratedID.length > 0) {
      const newRecords = existingGeneratedID.filter(
        (item) =>
          item.mainProfileId === mainProfileID && item.uniqueId === alphabet
      );

      if (newRecords.length === 0) {
        uniqueID = alphabet;
        break;
      }
    } else {
      uniqueID = alphabetArray[0];
    }
  }

  // console.log(uniqueID);
  return uniqueID;
}

export async function saveExistingIds(type, mainProfileId, uniqueId) {
  let existingGeneratedID = await read();
  const objTmp = { mainProfileId: mainProfileId, uniqueId: uniqueId };

  if (type === 'add') {
    existingGeneratedID.push(objTmp);
  } else {
    existingGeneratedID = existingGeneratedID.filter(
      (item) =>
        !(item.mainProfileId === mainProfileId && item.uniqueId === uniqueId)
    );
    // console.log(existingGeneratedID);
  }

  // console.log(['added', existingGeneratedID]);
  await write(existingGeneratedID);
}

async function read() {
  try {
    const data = await fs.promises.readFile(
      path.join(__dirname, 'data.json'),
      'utf8'
    );
    // console.log({ data: data });
    return JSON.parse(data);
  } catch (error) {
    // Handle the error, e.g., if the file doesn't exist yet
    console.error('Error reading file:', error.message);
    return [];
  }
}

async function write(data) {
  await fs.promises.writeFile(
    path.join(__dirname, 'data.json'),
    JSON.stringify(data),
    'utf8'
  );
}
