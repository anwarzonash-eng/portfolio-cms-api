import {Env} from '../../../config'
const ejs = require('ejs');

async function createEmailParams(receiverEmail, template, options) {
  
  
  const templateContent = template.templateContent;
  const modifiedTemplate = ejs.render(templateContent, {options} )
  
   const params = {
    Destination: {
      ToAddresses: [receiverEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `${modifiedTemplate}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: template.subject,
      },
    },
    Source: Env.sourceEmail,
  };

  return params;
};

// var request = require('request');

// async function getTemplate(req)
// var options = {
//   'method': 'POST',
//   'url': Env.Base_URL + '/emailtemplate/get',
//   'headers': {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzYjIyNWExMi0wY2RlLTQ3YWYtYjhmMy1mMTgzNTBhODUxYzEiLCJ0b2tlbnR5cGUiOjEsImlhdCI6MTY4NTQwODE0NywiZXhwIjoxNzAwOTYwMTQ3fQ.rru1lrr8XN3UyEM5pjdClAfT3xaqLWZWJNGdHTzyx60'
//   },
//   body: JSON.stringify({
//     "templateName": "Welcome"
//   })

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });


export default createEmailParams;