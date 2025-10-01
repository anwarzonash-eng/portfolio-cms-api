import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';

const uploadPhoto = require("../utils/aws/s3");





export class photoService extends baseService {

  async addPhoto(req) {
    
    const photoData = await uploadPhoto.uploadRequest(req.files);

    const newPhoto = await this._photoModel.create({
      photo_url: photoData.Location,
      user_id: req.userData._id

    })

    return newPhoto;
  }



  async listPhoto(req) {



    const query = ` select 
                            _photos.id ,
                            _photos.user_id,
                            _photos.photo_url,
                            _photos."updatedAt" as photo_posted_data,
                            _users.name,
                            _users.photo_url as user_photo_url,
                            _users.state,
                            _users.country,
                            (
                            SELECT count(*)
                            FROM "Votes" as _votes
                            WHERE _votes.photo_id = _photos.id
                            ) AS total_votes,
                            (
                            SELECT count(*)
                            FROM "Comments" as _comments
                            WHERE _comments.photo_id = _photos.id
                            ) AS total_comments,
                            
                            (
                                SELECT array_agg(photo_url)
                                FROM (
                                  SELECT _users_nested.photo_url
                                  FROM "Comments" as _comments
                                    join 
                                      "Users" as _users_nested
                                       on _comments.user_id = _users_nested.id
                                  WHERE _comments.photo_id = _photos.id
                                  ORDER BY _comments."updatedAt"
                                  LIMIT 5
                                ) AS subquery
                              ) AS last_5_comments
                            
                            from 
                                "Photos" as _photos
                                    join 
                                    "Users" as _users
                                    on _photos.user_id = _users.id
                                    ${req.body.userType == 'by_user' ? 'where _photos.user_id = \'' + req.userData._id + '\'' : ''}
                                    order by ${req.body.sortingType == 'by_recent_users' ? '_users' : '_photos'}."updatedAt"
                                    limit 10
                                    offSet ${req.body.offSet}
                                    `

    //   console.log(query);
    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT
    });

    return results;
  }

}