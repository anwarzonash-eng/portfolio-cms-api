import { response } from 'express';
import baseService from './base.service';
import { sequelize } from '../utils/database';

const uploadPhoto = require('../utils/aws/s3');

export class reportService extends baseService {
    async list(req) {
        let query = await this.getQuery(req);
        // console.log(query);
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        return results;
    }

    async getQuery(req) {
        let type = req.body.actionType;
        // console.log(type);
        let domain = req.body.domain;
        let unique_id = req.body.uniqueId;
        let itemID = req.body.itemID;

        let query = '';
        if (type == 'home')
            query = `select
        (select
            json_agg(
                json_build_object(
                    'id',
                    _categories.id,
                    'label',
                    _categories.label,
                    'title',
                    _categories.title,
                    'designation',
                    _categories.designation,
					'tagline',
                    _categories.tagline,
					'intro',
                    _categories.intro,
					'"mainIntro"',
                    _categories."mainIntro",
					'experience_intro',
                    _categories.experience_intro,
					'short_description',
                    _categories.short_description,
					'thumbnail',
                    _categories.thumbnail,
					'intro_heading',
                    _categories.intro_heading,
					'"mainIntro_heading"',
                    _categories."mainIntro_heading",
					'skills_ids',
                    _categories.skills_ids
					
                    )) 
        from
            "Categories" _categories) as Skills_Categories,
            (select
            json_agg(
                json_build_object(
                    'id',
                    _dynamicGeneration.id,
                    'description',
                    _dynamicGeneration.description,
                    'skills_ids',
                    _dynamicGeneration.skills_ids,
                    'experience_variation1',
                    _dynamicGeneration.experience_variation1,
					'experience_variation2',
                    _dynamicGeneration.experience_variation2,
					'experience_variation3',
                    _dynamicGeneration.experience_variation3,
					'experience_variation4',
                    _dynamicGeneration.experience_variation4,
					'experience_variation5',
                    _dynamicGeneration.experience_variation5,
					'experience_variation9',
                    _dynamicGeneration.experience_variation9,
					'experience_variation10',
                    _dynamicGeneration.experience_variation10,
					'experience_variation6',
                    _dynamicGeneration.experience_variation6,
					'experience_variation7',
                    _dynamicGeneration.experience_variation7,
					'experience_variation8',
                    _dynamicGeneration.experience_variation8,
					'portfolio_variations',
                    _dynamicGeneration.portfolio_variations
					
                    )) 
        from
            "Dynamic_Generations" _dynamicGeneration) as skills_groups,
        

    _main_profile.profile_photo_1,
    _main_profile.profile_photo_2,
       _main_profile.profile_photo_3,
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
_main_profile."calendly_link",

    _main_profile.companytype,
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
  
    _main_profile."googleAnalyticsScript",



    _detail_profile.designation,

    _detail_profile.tag_line,
    _detail_profile.short_description,
	_detail_profile.description,
_detail_profile.category1_title,
_detail_profile.category1_description,
_detail_profile.category2_title,
_detail_profile.category2_description,
_detail_profile.category2_status,
_detail_profile.category3_title,
_detail_profile.services,
_detail_profile."is_pdf_generated",
_detail_profile."pdf_download_links",


json_build_object(
        'id', _video.id,
        'title', _video.title,
        'private_title', _video.private_title,
        'videoURL', _video.video
    ) AS video_attached,

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
                    'child_hero_banner',
                    _portfolios.child_hero_banner,
                    'has_testimonial',
                    _portfolios.has_testimonial,
                    'company_icon',
                    _portfolios.company_icon,
                    'pictures',
                    _portfolios."pictures",
                    'starting_date',
                    _portfolios.starting_date,
                    'ending_Date',
                    _portfolios."ending_Date"))
                    from
            "Portfolios" _portfolios
			JOIN "Detail_Profiles" AS dp ON true,
  json_array_elements(dp.services) AS s_obj,
  json_array_elements_text(_portfolios.categorys -> 'category_ids') AS p_cat_id
WHERE
  s_obj ->> 'type' = 'main'
  AND s_obj ->> 'category_id' = p_cat_id
  AND _portfolios.main_profile_id = _main_profile.id and  _portfolios.content_nature ='prototype'
  AND dp.unique_id =  '${unique_id}'

    ) AS portfolios_ids,

(
                        select
                            json_agg(
                                json_build_object(
                                    'id',
                                    _skills.id,
                                    'title',
                                    _skills.title,
                                    'icon',
                                    _skills.icon,
                                    'url',
                                    _skills.url,
                                    'order', _skills.order
                                )
                            ) as skills_ids
                        from
                            "Detail_Profiles" _detail_profile_child,
                            json_array_elements_text(skills_ids -> 'skills_ids') as fk
                            join "Skills" _skills on _skills.id = fk :: uuid
                        where
                            _detail_profile.id = _detail_profile_child.id
                    )
                
             as skills_ids,
             
(
        select
            json_agg(
                json_build_object(
                    'id',
                    _experiences.id,
                    'title',
                    _experiences.title,
                    'short_description',
                    _experiences.short_description,
                    'long_description',
                    _experiences.long_description,
                    'app_worked_description',
                    _experiences.app_worked_description,
                    'tech_descriptions',
                    _experiences.tech_descriptions,
                    'company_name',
                    _experiences.company_name,
                    'company_website',
                    _experiences.company_website,
                    'thumbnail',
                    _experiences.thumbnail,
                    'company_linkedIn',
                    _experiences."company_linkedIn",
                    'starting_date',
                    _experiences.starting_date,
                    'ending_Date',
                    _experiences."ending_Date"
                    
                )
            ) 
        from
           "Experiences" _experiences
        where
            _experiences.main_profile_id = _main_profile.id and  content_nature ='prototype'
    ) AS experiences_ids,



_detail_profile.category3_description,
_detail_profile.category3_status
    
    from "Detail_Profiles" _detail_profile join "Main_Profiles" _main_profile
    on _main_profile.id = _detail_profile.main_profile_id
        LEFT JOIN "Videos" _video ON _detail_profile.video_attached = _video.id::uuid

    where unique_id = '${unique_id}' and "domain" = '${domain}'
    
    limit 1`;
        else if (type == 'cv')
            query = `select
(select
            json_agg(
                json_build_object(
                    'id',
                    _categories.id,
                    'label',
                    _categories.label,
                    'title',
                    _categories.title,
                    'designation',
                    _categories.designation,
					'tagline',
                    _categories.tagline,
					'intro',
                    _categories.intro,
					'"mainIntro"',
                    _categories."mainIntro",
					'experience_intro',
                    _categories.experience_intro,
					'short_description',
                    _categories.short_description,
					'thumbnail',
                    _categories.thumbnail,
					'intro_heading',
                    _categories.intro_heading,
					'"mainIntro_heading"',
                    _categories."mainIntro_heading",
					'skills_ids',
                    _categories.skills_ids
					
                    )) 
        from
            "Categories" _categories) as Skills_Categories,
        (select
            json_agg(
                json_build_object(
                    'id',
                    _dynamicGeneration.id,
                    'description',
                    _dynamicGeneration.description,
                    'skills_ids',
                    _dynamicGeneration.skills_ids,
                    'experience_variation1',
                    _dynamicGeneration.experience_variation1,
					'experience_variation2',
                    _dynamicGeneration.experience_variation2,
					'experience_variation3',
                    _dynamicGeneration.experience_variation3,
					'experience_variation4',
                    _dynamicGeneration.experience_variation4,
					'experience_variation5',
                    _dynamicGeneration.experience_variation5,
					'experience_variation9',
                    _dynamicGeneration.experience_variation9,
					'experience_variation10',
                    _dynamicGeneration.experience_variation10,
					'experience_variation6',
                    _dynamicGeneration.experience_variation6,
					'experience_variation7',
                    _dynamicGeneration.experience_variation7,
					'experience_variation8',
                    _dynamicGeneration.experience_variation8,
					'portfolio_variations',
                    _dynamicGeneration.portfolio_variations
					
                    )) 
        from
            "Dynamic_Generations" _dynamicGeneration) as skills_groups,
     _main_profile.profile_photo_1,
    _main_profile.profile_photo_2,
       _main_profile.profile_photo_3,
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
_main_profile."calendly_link",
    _main_profile.companytype,
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
      _detail_profile.services,
    _main_profile."googleAnalyticsScript",

    _detail_profile.designation,

    
    _detail_profile.tag_line,
  
    _detail_profile.skills,



(
                        select
                            json_agg(
                                json_build_object(
                                    'id',
                                    _skills.id,
                                    'title',
                                    _skills.title,
                                    'icon',
                                    _skills.icon,
                                    'url',
                                    _skills.url,
                                    'order', _skills.order
                                )
                            ) as skills_ids
                        from
                            "Detail_Profiles" _detail_profile_child,
                            json_array_elements_text(skills_ids -> 'skills_ids') as fk
                            join "Skills" _skills on _skills.id = fk :: uuid
                        where
                            _detail_profile.id = _detail_profile_child.id
                    )
                
             as skills_ids,
  

    (
        select
            json_agg(
                json_build_object(
                    'id',
                    _experiences.id,
                    'title',
                    _experiences.title,
                    'short_description',
                    _experiences.short_description,
                    'long_description',
                    _experiences.long_description,
                    'app_worked_description',
                    _experiences.app_worked_description,
                    'tech_descriptions',
                    _experiences.tech_descriptions,
                    'company_name',
                    _experiences.company_name,
                    'company_website',
                    _experiences.company_website,
                    'thumbnail',
                    _experiences.thumbnail,
                    'company_linkedIn',
                    _experiences."company_linkedIn",
                    'starting_date',
                    _experiences.starting_date,
                    'ending_Date',
                    _experiences."ending_Date"
                    
                )
            ) 
        from
           "Experiences" _experiences
        where
            _experiences.main_profile_id = _main_profile.id and  content_nature ='prototype'
    ) AS experiences_ids,
    

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
                    'child_hero_banner',
                    _portfolios.child_hero_banner,
                    'has_testimonial',
                    _portfolios.has_testimonial,
                    'company_icon',
                    _portfolios.company_icon,
                    'pictures',
                    _portfolios."pictures",
                    'starting_date',
                    _portfolios.starting_date,
                    'ending_Date',
                    _portfolios."ending_Date"))
        from
            "Portfolios" _portfolios
			JOIN "Detail_Profiles" AS dp ON true,
  json_array_elements(dp.services) AS s_obj,
  json_array_elements_text(_portfolios.categorys -> 'category_ids') AS p_cat_id
WHERE
  s_obj ->> 'type' = 'main'
  AND s_obj ->> 'category_id' = p_cat_id
  AND _portfolios.main_profile_id = _main_profile.id and  _portfolios.content_nature ='prototype'
  AND dp.unique_id =  '${unique_id}'
    ) AS portfolios_ids,




    (
      select
          json_agg(
              json_build_object(
                  'id',
                  _educations.id,
                  'university_name',
                  _educations.university_name,
                  'university_website_link',
                  _educations.university_website_link,
                  'degree_description',
                  _educations.degree_description,
                  'degree_name',
                  _educations.degree_name,
                  'degree_start_date',
                  _educations.degree_start_date,
                  'degree_end_date',
                  _educations.degree_end_date,
                  'thumbnail',
                  _educations.thumbnail
              )
          ) as education_details
      from
          "Detail_Profiles" _detailProfile_child,
          json_array_elements_text(education_ids -> 'education_ids') as fk
          join "Education" _educations on _educations.id = fk :: uuid
      where
          _detail_profile.id = _detailProfile_child.id
  ) AS education_ids
    
from
    "Detail_Profiles" _detail_profile
    join "Main_Profiles" _main_profile on _main_profile.id = _detail_profile.main_profile_id
where
    unique_id = '${unique_id}'
    and "domain" = '${domain}'
limit
    1`;
        else if (type == 'portfolio')
            query = `select

        (select
            json_agg(
                json_build_object(
                    'id',
                    _dynamicGeneration.id,
                    'description',
                    _dynamicGeneration.description,
                    'skills_ids',
                    _dynamicGeneration.skills_ids,
                    'experience_variation1',
                    _dynamicGeneration.experience_variation1,
					'experience_variation2',
                    _dynamicGeneration.experience_variation2,
					'experience_variation3',
                    _dynamicGeneration.experience_variation3,
					'experience_variation4',
                    _dynamicGeneration.experience_variation4,
					'experience_variation5',
                    _dynamicGeneration.experience_variation5,
					'experience_variation9',
                    _dynamicGeneration.experience_variation9,
					'experience_variation10',
                    _dynamicGeneration.experience_variation10,
					'experience_variation6',
                    _dynamicGeneration.experience_variation6,
					'experience_variation7',
                    _dynamicGeneration.experience_variation7,
					'experience_variation8',
                    _dynamicGeneration.experience_variation8,
					'portfolio_variations',
                    _dynamicGeneration.portfolio_variations
					
                    )) 
        from
            "Dynamic_Generations" _dynamicGeneration) as skills_groups,
            (
                        select
                            json_agg(
                                json_build_object(
                                    'id',
                                    _skills.id,
                                    'title',
                                    _skills.title,
                                    'icon',
                                    _skills.icon,
                                    'url',
                                    _skills.url,
                                    'order', _skills.order
                                )
                            ) as skills_ids
                        from
                            "Detail_Profiles" _detail_profile_child,
                            json_array_elements_text(skills_ids -> 'skills_ids') as fk
                            join "Skills" _skills on _skills.id = fk :: uuid
                        where
                            _detail_profile.id = _detail_profile_child.id
                    )
                
             as skills_ids,
    _main_profile.profile_photo_1,
    _main_profile.profile_photo_2,
       _main_profile.profile_photo_3,
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
_main_profile."calendly_link",
    _main_profile.companytype,
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
      
    _main_profile."googleAnalyticsScript",

    _detail_profile.designation,
_detail_profile.services,
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
                    'child_hero_banner',
                    _portfolios.child_hero_banner,
                    'has_testimonial',
                    _portfolios.has_testimonial,
                    'company_icon',
                    _portfolios.company_icon,
                    'pictures',
                    _portfolios."pictures",
                    'starting_date',
                    _portfolios.starting_date,
                    'ending_Date',
                    _portfolios."ending_Date"))
        from
            "Portfolios" _portfolios
			JOIN "Detail_Profiles" AS dp ON true,
  json_array_elements(dp.services) AS s_obj,
  json_array_elements_text(_portfolios.categorys -> 'category_ids') AS p_cat_id
WHERE
  s_obj ->> 'type' = 'main'
  AND s_obj ->> 'category_id' = p_cat_id
  AND _portfolios.main_profile_id = _main_profile.id and  _portfolios.content_nature ='prototype'
  AND dp.unique_id =  '${unique_id}'
    ) AS portfolios_ids
from
    "Detail_Profiles" _detail_profile
    join "Main_Profiles" _main_profile on _main_profile.id = _detail_profile.main_profile_id
where
    unique_id = '${unique_id}'
    and "domain" = '${domain}'
limit
    1`;
        else if (type == 'portfolioById')
            query = `select
        (select
            json_agg(
                json_build_object(
                    'id',
                    _dynamicGeneration.id,
                    'description',
                    _dynamicGeneration.description,
                    'skills_ids',
                    _dynamicGeneration.skills_ids,
                    'experience_variation1',
                    _dynamicGeneration.experience_variation1,
					'experience_variation2',
                    _dynamicGeneration.experience_variation2,
					'experience_variation3',
                    _dynamicGeneration.experience_variation3,
					'experience_variation4',
                    _dynamicGeneration.experience_variation4,
					'experience_variation5',
                    _dynamicGeneration.experience_variation5,
					'experience_variation9',
                    _dynamicGeneration.experience_variation9,
					'experience_variation10',
                    _dynamicGeneration.experience_variation10,
					'experience_variation6',
                    _dynamicGeneration.experience_variation6,
					'experience_variation7',
                    _dynamicGeneration.experience_variation7,
					'experience_variation8',
                    _dynamicGeneration.experience_variation8,
					'portfolio_variations',
                    _dynamicGeneration.portfolio_variations
					
                    )) 
        from
            "Dynamic_Generations" _dynamicGeneration) as skills_groups,
            (
                        select
                            json_agg(
                                json_build_object(
                                    'id',
                                    _skills.id,
                                    'title',
                                    _skills.title,
                                    'icon',
                                    _skills.icon,
                                    'url',
                                    _skills.url,
                                    'order', _skills.order
                                )
                            ) as skills_ids
                        from
                            "Detail_Profiles" _detail_profile_child,
                            json_array_elements_text(skills_ids -> 'skills_ids') as fk
                            join "Skills" _skills on _skills.id = fk :: uuid
                        where
                            _detail_profile.id = _detail_profile_child.id
                    )
                
             as skills_ids,
            _main_profile.profile_photo_1,
    _main_profile.profile_photo_2,
    _main_profile.profile_photo_3,
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
_main_profile."calendly_link",
    _main_profile.companytype,
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
      
    _main_profile."googleAnalyticsScript",
_detail_profile.services,
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
                            'company_icon',
                    _portfolios.company_icon,
                            'child_hero_banner',
                    _portfolios.child_hero_banner,
                    'has_testimonial',
                    _portfolios.has_testimonial,
                    'created_date',
                    _portfolios."createdAt",
                    'updated_date',
                    _portfolios."updatedAt",
                    'client_name',
                    _portfolios."client_name",
                    'services_i_provide',
                    _portfolios."services_i_provide",
                    'my_role',
                    _portfolios."my_role",
                            'pictures',
                            _portfolios."pictures",
                            'starting_date',
                    _portfolios.starting_date,
                    'duplicate',
                    _portfolios."duplicate",
                    'ending_Date',
                    _portfolios."ending_Date"
                            
                        )
                    ) 
                from
            "Portfolios" _portfolios
        where
            _portfolios.main_profile_id = _main_profile.id and  content_nature ='prototype'
	and _portfolios.id = '${itemID}'
    ) AS portfolios_ids
        from
            "Detail_Profiles" _detail_profile
            join "Main_Profiles" _main_profile on _main_profile.id = _detail_profile.main_profile_id
        where
        
            unique_id = '${unique_id}'
            and "domain" = '${domain}'
        
        limit
            1`;

        return query;
    }



    async listPortfolios(req) {

        let query = `Select p.id,
                    p.title,
                    p.tagline_1,
                     p.tagline_2,
                      p.features_short,
                      p.tech_short,
                      p.features_long,
                      p.tech_long,
                      p.link,
                      p.thumbnail,
                      p.child_hero_banner,
                      p.has_testimonial,
                      p.company_icon,
                      p."pictures",
                     p.starting_date,
                      p."ending_Date", 
                      p."duplicate",  (
                        SELECT 
                            json_agg(
                                json_build_object(
                                    'id', s.id,
                                    'title', s.title,
                                    'url', s.url,
                                    'order', s.order
                                )
                            ) AS skills_ids
                        FROM 
                            json_array_elements_text(p.skills_ids_shorts -> 'skills_ids') AS fk
                        JOIN 
                            "Skills" s ON s.id = fk::uuid
                    ) AS skills
					  from "Portfolios" P
					  inner join "Main_Profiles" m on m."id" = p."main_profile_id"
		   where "is_for_cypexsoft"=true
		   limit 10 offset ${req.body.offSet}`;

        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
        });

        return results;
    }

    async getPortfolioById(req) {
        try {
            let query = `Select p.id,
                    p.title,
                    p.tagline_1,
                     p.tagline_2,
                      p.features_short,
                      p.tech_short,
                      p.features_long,
                      p.tech_long,
                      p.link,
                      p.thumbnail,
                      p.child_hero_banner,
                      p.has_testimonial,
                      p.company_icon,
                      p."pictures",
                     p.starting_date,
                      p."ending_Date", 
                      p."duplicate",  (
                        SELECT 
                            json_agg(
                                json_build_object(
                                    'id', s.id,
                                    'title', s.title,
                                    'url', s.url,
                                    'order', s.order
                                )
                            ) AS skills_ids
                        FROM 
                            json_array_elements_text(p.skills_ids_shorts -> 'skills_ids') AS fk
                        JOIN 
                            "Skills" s ON s.id = fk::uuid
                    ) AS skills
					  from "Portfolios" P
					  inner join "Main_Profiles" m on m."id" = p."main_profile_id"
		   where p."id"='${req.body.id}'`;

            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
            });

            return results;
        }
        catch (err) {
            throw new Error(err);
        }
    }

}
