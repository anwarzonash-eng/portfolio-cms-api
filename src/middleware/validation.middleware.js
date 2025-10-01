import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { responseTemplate } from '../enums/responseTemplate.enum';

export function validationMiddleware(
  dtoClass,
  skipMissingProperties = false,
  whitelist = false
) {
  return (req, res, next) => {
    const merged = Object.assign({}, req.body, req.files);

    //  console.log( {body: req.body});
    const dto = plainToClass(dtoClass, merged);

    // console.log(dto)

    validate(dto, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
    })
      .then((errors) => {
        if (errors.length > 0) {
          const validationErrors = errors.map((error) =>
            Object.values(error.constraints)
          );
          return res
            .status(400)
            .json(responseTemplate('Error', undefined, validationErrors));
        } else {
          // req.body = dto;
          next();
        }
      })
      .catch((error) => {
        next();
      });
  };
}

// export function validationMiddleware(dtoClass, skipMissingProperties = false, whitelist = false) {

//   return (req, res, next) => {

//     const dto = plainToClass(dtoClass, req.body)

//     validate(dto, {
//       skipMissingProperties,
//       whitelist,
//       forbidNonWhitelisted: true,
//       forbidUnknownValues: false

//     }).then(errors => {

//       if (errors.length > 0) {

//         const validationErrors = errors.map(error => Object.values(error.constraints));
//         return res.status(400).json(responseTemplate('Error', undefined, validationErrors));

//       } else {
//         // req.body = dto;
//         next();
//       }

//     }).catch(error => {
//       next();
//     });
//   }
// }
