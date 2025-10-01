select
            _main_profile.profile_photo_1,
    _main_profile.profile_photo_2,
    _main_profile.name,
    _main_profile.home_page_tagline,
    _main_profile.domain,
    _main_profile.email,
    _main_profile."linkedIn",
    _main_profile.facebook,
    _main_profile.twitter,
    _main_profile.instagram,
    _main_profile.upwork,
    _main_profile.github,
    _main_profile."behance_link",
    _main_profile.phone_no,
    _main_profile.location,
    _main_profile.color1,
    _main_profile.color2, 
    _main_profile.color3,
    _main_profile.color4,
    
     _main_profile.primary_color,
      _main_profile.page_bg_color,
       _main_profile.banner_bg_color,
        _main_profile.section_bg_color,
         _main_profile.heading_color,
          _main_profile.paragrapgh1_color,
           _main_profile.paragrapgh2_color,
            _main_profile.border_color,
            
 
      
     _main_profile.hourly_rate,
     _main_profile.no_of_experiences,
     _main_profile.projects_completed,
      _main_profile.video,
    _main_profile."googleAnalyticsScript",

            _detail_profile.designation,
          
            _detail_profile.tag_line,
            _detail_profile.skills,
            (
                select
                    json_agg(
                        json_build_object(
                            'id',
                            _portfolios.id,
                            'title',
                            _portfolios.title,
                            'tagline_1',
                            _portfolios.tagline_1,
                            'tagline_2',
                            _portfolios.tagline_2,
                            'features_short',
                            _portfolios.features_short,
                            'tech_short',
                            _portfolios.tech_short,
                            'features_long',
                            _portfolios.features_long,
                            'tech_long',
                            _portfolios.tech_long,
                            'link',
                            _portfolios.link,
                            'thumbnail',
                            _portfolios.thumbnail,
                            'pictures',
                            _portfolios."pictures",
                            'starting_date',
                    _portfolios.starting_date,
                    'duplicate',
                    _portfolios."duplicate",
                    'ending_Date',
                    _portfolios."ending_Date",
                            'skills',
                            (
                                select
                                    json_agg(
                                        json_build_object(
                                            'id',
                                            _skills.id,
                                            'title',
                                            _skills.title,
                                            'url',
                                            _skills.url,
                                            'order', _skills.order
                                        )
                                    ) as skills_ids
                                from
                                    "Portfolios" _portfolios_child,
                                    json_array_elements_text(skills_ids_shorts -> 'skills_ids') as fk
                                    join "Skills" _skills on _skills.id = fk :: uuid
                                where
                                    _portfolios.id = _portfolios_child.id
                            )
                        )
                    ) as skills_ids
                from
                    "Detail_Profiles" _detailProfile_child,
                    json_array_elements_text(portfolios_ids -> 'portfolio_ids') as fk
                    join "Portfolios" _portfolios on _portfolios.id = fk :: uuid
                         and fk :: uuid = '${itemID}'
                where
                    _detail_profile.id = _detailProfile_child.id
            ) AS portfolios_ids
        from
            "Detail_Profiles" _detail_profile
            join "Main_Profiles" _main_profile on _main_profile.id = _detail_profile.main_profile_id
where
    unique_id = '${unique_id}'
    and "domain" = '${domain}'
limit
    1