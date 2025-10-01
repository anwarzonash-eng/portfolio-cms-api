select
  id,
  title,
  private_title,
  main_profile_id,
  tagline_1,
  tagline_2,
  features_short,
  tech_short,
  features_long,
  tech_long,
  link,
  thumbnail,
  pictures,
  (
    select
      json_agg(
        json_build_object('id', _skills.id, 'title', _skills.title)
      ) as skills_ids
    from
      "Portfolios" _portfolios_child,
      json_array_elements_text(skills_ids_shorts -> 'skills_ids') as fk
      join "Skills" _skills on _skills.id = fk :: uuid
    where
      _portfolios_parent.id = _portfolios_child.id
  ) AS skills_ids_shorts
from
  "Portfolios" _portfolios_parent