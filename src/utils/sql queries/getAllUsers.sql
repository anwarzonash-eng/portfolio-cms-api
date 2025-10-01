select
  _photos.id,
  _photos.user_id,
  _photos.photo_url,
  _photos."updatedAt" as photo_posted_data,
  _users.name,
  _users.photo_url as user_photo_url,
  _users.state,
  _users.country,
  (
    SELECT
      count(*)
    FROM
      "Votes" as _votes
    WHERE
      _votes.photo_id = _photos.id
  ) AS total_votes,
  (
    SELECT
      count(*)
    FROM
      "Comments" as _comments
    WHERE
      _comments.photo_id = _photos.id
  ) AS total_comments,
  (
    SELECT
      array_agg(photo_url)
    FROM
      (
        SELECT
          _users_nested.photo_url
        FROM
          "Comments" as _comments
          join "Users" as _users_nested on _comments.user_id = _users_nested.id
        WHERE
          _comments.photo_id = _photos.id
        ORDER BY
          _comments."updatedAt"
        LIMIT
          5
      ) AS subquery
  ) AS last_5_comments
from
  "Photos" as _photos
  join "Users" as _users on _photos.user_id = _users.id
where
  _photos.user_id = '07bc028b-5a74-408b-b3d2-9cb376c1e02c'
order by
  _users."updatedAt"
limit
  10 offSet 0