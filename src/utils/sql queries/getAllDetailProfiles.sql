select
    id,
    private_title,
    main_profile_id,
    unique_id,
    designation,
    tag_line,
    skills,
    short_description,
    description,
    category1_title,
    category1_description,
    category2_title,
    category2_description,
    category2_status,
    category3_title,
    category3_description,
    category3_status,
    (
        select
            json_agg(
                json_build_object('id', _portfolios.id, 'title', _portfolios.title)
            ) as skills_ids
        from
            "Detail_Profiles" _detailProfile_child,
            json_array_elements_text(portfolios_ids -> 'portfolio_ids') as fk
            join "Portfolios" _portfolios on _portfolios.id = fk :: uuid
        where
            _detailProfile_parent.id = _detailProfile_child.id
    ) AS portfolios_ids,

(
        select
            json_agg(
                json_build_object('id', _education.id, 'degree_name', _education.degree_name)
            ) as skills_ids
        from
            "Detail_Profiles" _detailProfile_child,
            json_array_elements_text(education_ids -> 'education_ids') as fk
            join "Education" _education on _education.id = fk :: uuid
        where
            _detailProfile_parent.id = _detailProfile_child.id
    ) AS education_ids,

    (
        select
            json_agg(
                json_build_object(
                    'id',
                    _experiences.id,
                    'title',
                    _experiences.title
                )
            ) as skills_ids
        from
            "Detail_Profiles" _detailProfile_child,
            json_array_elements_text(experiences_ids -> 'experiences_ids') as fk
            join "Experiences" _experiences on _experiences.id = fk :: uuid
        where
            _detailProfile_parent.id = _detailProfile_child.id
    ) AS experiences_ids
from
    "Detail_Profiles" _detailProfile_parent