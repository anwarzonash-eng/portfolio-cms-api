select
  id,
  title,
  short_description,
  long_description,
  app_worked_description,
  tech_descriptions,
  company_name,
  company_website,
  "company_linkedIn",
  "starting_date",
  "ending_Date",
  (
    select
      json_agg(
        json_build_object('id', _skills.id, 'title', _skills.title)
      ) as skills_ids
    from
      "Experiences" _experiences_child,
      json_array_elements_text(skills_ids -> 'skills_ids') as fk
      join "Skills" _skills on _skills.id = fk :: uuid
    where
      _experiences_parent.id = _experiences_child.id
  ) AS skill
from
  "Experiences" _experiences_parent