import baseService from './base.service';
import * as manageUniqeId from '../utils/manageUniqeIds/manageUniqueId';
import { DynamicGenerationModel, SkillModel, CategoryModel, protfolioModel } from '../models';

// import { skillsOptions } from './skillsOptions';
import { Op } from 'sequelize';
import { sequelize } from '../utils/database';
import { compute_alpha } from 'googleapis';


function capitalizeWords(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

export class dynamicdetailProfileService extends baseService {




  async dynamicGenertiondetailprofile(req) {


    let { skills, services, tag_line, designation, main_id, domain, is_create_tiny_url, private_title } = req.body;
    const mainProfileID = main_id;
    domain = 'https://' + domain;

    let response;
    const t = await sequelize.transaction()
    try {

      const uniqueid = await manageUniqeId.generateDynamicUniqueKey(
        mainProfileID
      );

      const detailProfileValuess = {
        unique_id: uniqueid,
        private_title: private_title,
        main_profile_id: mainProfileID,
        designation: designation,
        tag_line: tag_line,
        skills: '',
        short_description: 'some short_description',
        experiences_ids: {
          experiences_ids: []

        },
        portfolios_ids: {
          portfolio_ids: [],
        },
        education_ids: {
          education_ids: [],
        },
        skills_ids: { skills_ids: skills },
        description: 'some description to work on',
        category1_title: 'some category1_title',
        category1_description: '',
        category2_title: 'some category2_title',
        category2_description: '',
        category2_status: true,
        category3_title: 'some category3_title',
        category3_description: '',
        category3_status: false,
        content_nature: 'dynamic',
        companytype: 'cypexsoft',
        services: services
      }
      response = await this._detailProfileModel.create(detailProfileValuess, { transaction: t });
      const mainCategoryID = services.find(service => service.type == 'main').category_id || null;

      const allportfolios = await protfolioModel.findAll();
      const selectedPortfolios = mainCategoryID ? allportfolios.filter(portfolio => {
        if (portfolio.main_profile_id === mainProfileID && portfolio.categorys.category_ids.some(id => id == mainCategoryID)) {
          return true;
        } else { return false; }

      }) : [];
      let tinyResponse = null;
      if (is_create_tiny_url) {

        var tinyURL = []
        this.addTinyURL(
          'profile',
          domain,
          uniqueid,
          mainProfileID,
          response.id, tinyURL)

        selectedPortfolios.forEach(portfolioID => {
          this.addTinyURL(
            'portfolio',
            domain,
            uniqueid,
            mainProfileID,
            response.id, tinyURL, portfolioID.id)

        });

        tinyResponse = await this._tiny_url.bulkCreate(tinyURL)

        await t.commit();
        return this.getFormattedResponse(response.unique_id, response.private_title, response.designation, tinyResponse, domain, selectedPortfolios);
        // return { ...response.dataValues, portfolios_ids: selectedPortfolios?.map(portfolio => { return { portfolio_id: portfolio.id, portfolio_title: portfolio.title } }), tinyResponse };
      }
      return this.getFormattedResponse(
        response.unique_id,
        response.private_title,
        response.designation,
        tinyResponse, domain, selectedPortfolios);
      // return { ...response.dataValues, portfolios_ids: selectedPortfolios?.map(portfolio => { return { portfolio_id: portfolio.id, portfolio_title: portfolio.title } }) };

    } catch (error) {
      await t.rollback();
      throw error;
    }

  }

  async getFormattedResponse(unique_id, private_title, designation, tinyUrlResponse, domain, portfolios = []) {

    const uniqe_id = unique_id;
    const urls = [];
    urls.push({
      is_portfolio_detail: false,
      page: 'Home',
      link_without_u: `${domain}/${uniqe_id}`,
      link_with_u: `${domain}/${uniqe_id}?u=_`,
      tiny_link_without_u: tinyUrlResponse ? this.gettinyURLUniqeID('profile', false, tinyUrlResponse) : null,
      tiny_link_with_u: tinyUrlResponse ? this.gettinyURLUniqeID('profile', true, tinyUrlResponse) : null
    })
    urls.push({
      is_portfolio_detail: false,
      page: 'Cv',
      link_without_u: `${domain}/${uniqe_id}/cv`,
      link_with_u: `${domain}/${uniqe_id}/cv?u=_`,
      tiny_link_without_u: tinyUrlResponse ? this.gettinyURLUniqeID('cv', false, tinyUrlResponse) : null,
      tiny_link_with_u: tinyUrlResponse ? this.gettinyURLUniqeID('cv', true, tinyUrlResponse) : null
    })
    urls.push({
      is_portfolio_detail: false,
      page: 'Contact',
      link_without_u: `${domain}/${uniqe_id}/contact`,
      link_with_u: `${domain}/${uniqe_id}/contact?u=_`,
      tiny_link_without_u: tinyUrlResponse ? this.gettinyURLUniqeID('contact', false, tinyUrlResponse) : null,
      tiny_link_with_u: tinyUrlResponse ? this.gettinyURLUniqeID('contact', true, tinyUrlResponse) : null
    })
    urls.push({
      is_portfolio_detail: false,
      page: 'Portfolio Main',
      link_without_u: `${domain}/${uniqe_id}/portfolio`,
      link_with_u: `${domain}/${uniqe_id}/portfolio?u=_`,
      tiny_link_without_u: tinyUrlResponse ? this.gettinyURLUniqeID('portfolio_main', false, tinyUrlResponse) : null,
      tiny_link_with_u: tinyUrlResponse ? this.gettinyURLUniqeID('portfolio_main', true, tinyUrlResponse) : null
    })
    portfolios.length > 0 && portfolios.forEach(portfolio => {
      urls.push({
        is_portfolio_detail: true,
        page: portfolio.title,
        link_without_u: `${domain}/${uniqe_id}/portfolio/${portfolio.id}`,
        link_with_u: `${domain}/${uniqe_id}/portfolio/${portfolio.id}?u=_`,
        tiny_link_without_u: tinyUrlResponse ? this.gettinyURLUniqeID('portfolio_detail', false, tinyUrlResponse, portfolio.id) : null,
        tiny_link_with_u: tinyUrlResponse ? this.gettinyURLUniqeID('portfolio_detail', true, tinyUrlResponse, portfolio.id) : null
      })

    })

    return { uniqe_id, private_title, designation, urls }


  }

  gettinyURLUniqeID(key, is_u, tinyUrlResponse, portfolio_detail_id = null) {
    const response = portfolio_detail_id ?
      tinyUrlResponse.find(tinyURL => tinyURL.type === key && tinyURL.is_u == is_u && tinyURL.portfolio_id == portfolio_detail_id)?.uniqe_id || null
      : tinyUrlResponse.find(tinyURL => tinyURL.type === key && tinyURL.is_u == is_u)?.uniqe_id || null;

    return response ? 'https://gourls.link/' + response : null;
  }

  // async dynamicGenertiondetailprofile(req) {

  //   var tinyURL = []
  //   var services = []
  //   var service = {}


  //   let skillsForCV = ''

  //   let { skills, intro_category_id, child_categories, tag_line, designation, domain } = req.body;
  //   const mainProfileID = domain.main_id;
  //   const targetDomain = domain.domain;

  //   const skillsGroupsAll = await this._dynamicGenerationModel.findAll({ where: { main_profile_id: mainProfileID } })
  //   const skillsGroupsDedicatedAll = new Set()
  //   // console.log(skillsGroupsAll);

  //   let seenCategoriesSet = new Set();
  //   let seenSkillsTitleSet = new Set();
  //   let skillsIDSet = new Set()

  //   skills.forEach(element => {
  //     if (!seenCategoriesSet.has(element.category))
  //       seenCategoriesSet.add(element.category)
  //     if (!seenSkillsTitleSet.has(element.title))
  //       seenSkillsTitleSet.add(element.title)
  //     if (!skillsIDSet.has(element.id))
  //       skillsIDSet.add(element.id)
  //   });
  //   let inputCategories = Array.from(seenCategoriesSet)
  //   let inputUniqueSkillsAll = Array.from(seenSkillsTitleSet)
  //   let inputUiqueSkillsIDs = Array.from(skillsIDSet)
  //   let allFormatedSkills = await this.getFormattedSkills(inputUniqueSkillsAll)

  //   let inputCategoriesWithData = await this._categoryModel.findAll({
  //     where: {
  //       label: {
  //         [Op.in]: inputCategories,
  //       },
  //     },
  //   })

  //   let allcategories = await this._categoryModel.findAll()

  //   // tag_line = `<h3>${tag_line}</h3></br>`
  //   let mainCategory = allcategories.find(
  //     (category) => category.label === intro_category_id
  //   );

  //   // let mainIntro = mainCategory.mainIntro_heading.replace('${Skills}', allFormatedSkills)
  //   service.type = 'main'
  //   // service.intro_main = mainIntro
  //   // service.title = mainCategory.title
  //   // service.tagline = mainCategory.tagline
  //   service.category_id = mainCategory.id
  //   // service.picture = mainCategory.thumbnail
  //   service.skills = skills


  //   // let coverLetterContent = '';
  //   // coverLetterContent += `<h3>${tag_line}</h3></br>` + mainIntro;


  //   for (const element of inputCategoriesWithData) {

  //     let service_tmp = {}

  //     // let categoryTitle = `<h2>${element.title}</h2>`;
  //     // let categoryIntroHeading = element.intro_heading
  //     // let categoryIntroDetails = element.intro

  //     let categorySKills = skills.filter((skill) => skill.category == element.label)
  //     // let categorySKillsNames = skills.filter((skill) => skill.category == element.label).map(skill => skill.title)
  //     // let formatCategorySkills = await this.getFormattedSkills(categorySKillsNames)
  //     // categoryIntroHeading = categoryIntroHeading.replace('${Skills}', formatCategorySkills)
  //     let uniqueGroupSet = new Set()
  //     let skillGroupDescription = ''

  //     categorySKills.forEach(skill => {
  //       // console.log();

  //       const skillsGroups = skillsGroupsAll.find(group => group.skills_ids.skills_ids.some(id => id == skill.id))

  //       if (skillsGroups) {
  //         if (!uniqueGroupSet.has(skillsGroups.id)) {

  //           skillGroupDescription += `<li>${skillsGroups.description?.trim()}</li>`
  //           uniqueGroupSet.add(skillsGroups.id)

  //         }
  //         if (!skillsGroupsDedicatedAll.has(skillsGroups)) {

  //           skillsGroupsDedicatedAll.add(skillsGroups)

  //         }
  //       }
  //     });

  //     // const skillsGroups = skillsGroupsAll.filter(group => group.skils_ids.some(id => id == element.id))
  //     // categoryIntroDetails = categoryIntroDetails.replace('<ul>', `<ul>${skillGroupDescription}`)
  //     // coverLetterContent += `<br/>` + categoryTitle + `<hr>` + categoryContent

  //     service_tmp.type = 'detail'
  //     // service_tmp.intro_main = categoryIntroHeading
  //     // service_tmp.title = element.title
  //     // service_tmp.tagline = element.tagline
  //     // service_tmp.intro_detail = categoryIntroDetails
  //     service_tmp.category_id = element.id
  //     // service_tmp.picture = element.thumbnail
  //     service_tmp.skills = categorySKills


  //     services.push(service_tmp)


  //     // console.log(skills.filter(skill => skill.category == element.label));


  //   };

  //   const skillsGroups = Array.from(skillsGroupsDedicatedAll)


  //   skillsForCV = await this.getSkillGroupsInString(skillsGroups, 'cv', 0)
  //   // service.intro_detail = `<ul>${skillsForCV}</ul>`
  //   services.push(service)
  //   let response;
  //   const t = await sequelize.transaction()
  //   try {

  //     // await sequelize.transaction(async (t) => {

  //     req.body.actionType = 'add';

  //     // const uniqueid = 1;
  //     const uniqueid = await manageUniqeId.generateDynamicUniqueKey(
  //       mainProfileID
  //     );
  //     const newExperiencesIDs = [] // await this.insertExperiencesMany(t, skills, mainProfileID, mainCategory, skillsGroups, designation)
  //     const newPortfoliosIDs = [] //  await this.insertPortfoliosMany(t, skills, mainProfileID, mainCategory, skillsGroups, designation, tinyURL)

  //     const detailProfileValuess = {
  //       unique_id: uniqueid,
  //       private_title: designation,
  //       main_profile_id: mainProfileID,
  //       designation: designation,
  //       tag_line: tag_line,
  //       skills: '', //`<ul>${skillsForCV}</ul>`,
  //       short_description: 'some short_description',
  //       experiences_ids: {
  //         experiences_ids: newExperiencesIDs
  //         // experiences_ids: ['ffcfbf06-f1b2-4fcf-a9ba-6edc104ea989'],
  //       },
  //       portfolios_ids: {
  //         portfolio_ids: newPortfoliosIDs,
  //       },
  //       education_ids: {
  //         education_ids: [
  //           'f784f3e0-a339-486a-af39-dc09f6ab7913',
  //           'deecc41d-a06f-461a-b3e0-a7e332c68c06',
  //         ],
  //       },
  //       skills_ids: { skills_ids: inputUiqueSkillsIDs },
  //       description: 'some description to work on', // || coverLetterContent  
  //       category1_title: 'some category1_title',
  //       category1_description: '',
  //       category2_title: 'some category2_title',
  //       category2_description: '',
  //       category2_status: true,
  //       category3_title: 'some category3_title',
  //       category3_description: '',
  //       category3_status: false,
  //       content_nature: 'dynamic',
  //       companytype: 'cypexsoft',
  //       services: services
  //     }
  //     response = await this._detailProfileModel.create(detailProfileValuess, { transaction: t });
  //     this.addTinyURL(
  //       'profile',
  //       targetDomain,
  //       uniqueid,
  //       mainProfileID,
  //       response.id, tinyURL)

  //     newPortfoliosIDs.forEach(portfolioID => {
  //       this.addTinyURL(
  //         'portfolio',
  //         targetDomain,
  //         uniqueid,
  //         mainProfileID,
  //         response.id, tinyURL, portfolioID)

  //     });

  //     const tinyResponse = await this._tiny_url.bulkCreate(tinyURL)

  //     await t.commit();

  //     // await manageUniqeId.saveExistingIds('add', mainProfileID, uniqueid);
  //     // })
  //   } catch (error) {
  //     await t.rollback();
  //     throw error;
  //   }
  //   return response;
  // }


  async insertExperiencesMany(t, skills, mainProfileID, mainCategory, skillsGroups, designation) {




    let seenSkillsTitleSet = new Set();
    const newExperiencesIDs = []

    skills.forEach(element => {
      if (!seenSkillsTitleSet.has(element.id))
        seenSkillsTitleSet.add(element.id)

    });

    let skillsArray = Array.from(seenSkillsTitleSet);


    const experiencesIDs = await this._experienceModel.findAll(
      {
        where: {
          [Op.and]:
            [{
              main_profile_id: mainProfileID
            }
              ,
            {

              content_nature: 'prototype'
            }
            ]
        }
      }

    )
    // console.log({ profile: mainProfileID, data: dynamid_profile_prototype });

    // if (!dynamid_profile_prototype)
    //   return []
    // const experiencesIDs = dynamid_profile_prototype.experiences_ids.experiences_ids;

    // if (!experiencesIDs)
    //   return []
    // const experiencesIDs = dynamid_profile_prototype.experiences_ids.experiences_ids;

    let index = 0;
    for (const experienceResponse of experiencesIDs) {

      this.shuffleArray(skillsArray)



      // const experienceResponse = await this._experienceModel.findByPk(experienceID)
      index++;
      var experienceIntro = index < 11 ? mainCategory.experience_intro['intro' + index] : experienceResponse.short_description;
      let longDescription = index < 11 ? await this.getSkillGroupsInString(skillsGroups, 'experience', index) : ''

      let categorySKillsNames = skills.map(skill => skill.title)
      this.shuffleArray(categorySKillsNames)
      let formatCategorySkills = await this.getFormattedSkills(categorySKillsNames)

      experienceIntro = experienceIntro.replace('${Skills}', formatCategorySkills)
      experienceIntro = experienceIntro.replace('${Company_name}', experienceResponse.company_name)


      longDescription = experienceResponse.long_description.replace('<ul>', `<ul>${longDescription}`)


      const newExperienceValue = {
        title: experienceResponse.title,
        private_title: designation,
        main_profile_id: mainProfileID,
        short_description: experienceIntro,
        long_description: longDescription,
        app_worked_description: experienceResponse.app_worked_description,
        tech_descriptions: experienceResponse.tech_descriptions,
        company_name: experienceResponse.company_name,
        company_website: experienceResponse.company_website,
        company_linkedIn: experienceResponse.company_linkedIn,
        skills_ids: { skills_ids: skillsArray },
        starting_date: experienceResponse.starting_date,
        ending_Date: experienceResponse.ending_Date,
        thumbnail: experienceResponse.thumbnail,
        catagory: experienceResponse.catagory,
        working: experienceResponse.working,
        duplicate: 'Yes',
        content_nature: 'dynamic',
        companytype: 'cypexsoft'

      };

      try {

        const response = await this._experienceModel.create(newExperienceValue, { transaction: t })
        newExperiencesIDs.push(response.id)
      } catch (error) {
        // console.log(error);
      }
    }

    return newExperiencesIDs

  }

  async insertPortfoliosMany(t, skills, mainProfileID, mainCategory, skillsGroups, designation) {




    let skillsIDSet = new Set();
    let skillsTitleSet = new Set();

    const newPortfolioIDs = []

    skills.forEach(element => {
      if (!skillsIDSet.has(element.id)) {
        skillsIDSet.add(element.id)
        skillsTitleSet.add(element.title)
      }

    });

    let skillsArrayID = Array.from(skillsIDSet);
    let skillsArrayTitle = Array.from(skillsTitleSet);
    // const portoflios = await this._portfolioModel.findAll({ where: { [Op.and]: [{ catagory: mainCategory.label }, { content_nature: 'prototype' }] } })
    const portoflios = await this._portfolioModel.findAll({
      where: {
        [Op.and]:
          [{
            main_profile_id: mainProfileID
          }
            ,
          {

            content_nature: 'prototype'
          }
          ]
      }
    })


    // console.log(portoflios.length);


    let index = 0;
    for (const portfolio of portoflios) {

      // if (index == 10)
      //   break;
      index++;
      this.shuffleArray(skillsArrayID)
      this.shuffleArray(skillsArrayTitle)

      let modifiedFeaturesShort = portfolio.features_short;
      let modifiedFeaturesLong = portfolio.features_long;



      // const experienceResponse = await this._experienceModel.findByPk(experienceID)

      //modifiedFeaturesShort = index < 11 ? mainCategory.experience_intro['intro' + index] : experienceResponse.short_description;
      let skillsGroupsForPortfolios = index < 11 ? await this.getSkillGroupsInString(skillsGroups, 'portfolio', index) : ''

      modifiedFeaturesLong = modifiedFeaturesLong.replace('${Skill_groups}', skillsGroupsForPortfolios)
      modifiedFeaturesShort = modifiedFeaturesShort.replace('${Skills}', await this.getFormattedSkills(skillsArrayTitle))
      modifiedFeaturesLong = modifiedFeaturesLong.replace('${Skills}', await this.getFormattedSkills(skillsArrayTitle))


      const newPortfolioValue = {
        title: portfolio.title,
        private_title: designation,
        main_profile_id: portfolio.main_profile_id,
        tagline_1: portfolio.tagline_1,
        tagline_2: portfolio.tagline_2,
        features_short: modifiedFeaturesShort,
        tech_short: portfolio.tech_short,
        skills_ids_shorts: { skills_ids: skillsArrayID },
        features_long: modifiedFeaturesLong,
        tech_long: portfolio.tech_long,
        link: portfolio.link,
        thumbnail: portfolio.thumbnail,
        pictures: portfolio.pictures,
        starting_date: portfolio.starting_date,
        ending_Date: portfolio.ending_Date,
        catagory: portfolio.catagory,
        duplicate: 'No',
        content_nature: 'dynamic',

      };

      try {

        const response = await this._portfolioModel.create(newPortfolioValue, { transaction: t })

        newPortfolioIDs.push(response.id)
      } catch (error) {
        // console.log(error);
      }
    }

    return newPortfolioIDs

  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

  }

  async getFormattedSkills(skills) {
    return await skills
      .map((skill) => {
        return `<u>${skill}</u>`;
      })
      .join(', ');


  }


  async addTinyURL(type, target_link, unique_id, main_profile_id, detail_profile_id, tinyURL, portfolio_detail_id = '') {

    // 'portfolio_main', 'portfolio_detail', 'profile', 'cv', 'cover_letter', 'contact_me'
    if (type == 'profile') {
      tinyURL.push({
        type: 'profile',
        target_link: `${target_link}\\${unique_id}`,
        is_u: false,
        main_profile_id,
        detail_profile_id

      })
      tinyURL.push({
        type: 'profile',
        target_link: `${target_link}\\${unique_id}?u=_`,
        is_u: true,
        main_profile_id,
        detail_profile_id
      })

      tinyURL.push({
        type: 'cv',
        target_link: `${target_link}\\${unique_id}\\cv`,
        is_u: false,
        main_profile_id,
        detail_profile_id
      })
      tinyURL.push({
        type: 'cv',
        target_link: `${target_link}\\${unique_id}\\cv?u=_`,
        is_u: true,
        main_profile_id,
        detail_profile_id
      })

      tinyURL.push({
        type: 'portfolio_main',
        target_link: `${target_link}\\${unique_id}\\portfolio`,
        is_u: false,
        main_profile_id,
        detail_profile_id
      })
      tinyURL.push({
        type: 'portfolio_main',
        target_link: `${target_link}\\${unique_id}\\portfolio?u=_`,
        is_u: true,
        main_profile_id,
        detail_profile_id
      })
      tinyURL.push({
        type: 'cover_letter',
        target_link: `${target_link}\\${unique_id}\\offer`,
        is_u: false,
        main_profile_id,
        detail_profile_id
      })
      tinyURL.push({
        type: 'cover_letter',
        target_link: `${target_link}\\${unique_id}\\offer?u=_`,
        is_u: true,
        main_profile_id,
        detail_profile_id
      })
      tinyURL.push({
        type: 'blog',
        target_link: `${target_link}\\${unique_id}\\blog-listing`,
        is_u: false,
        main_profile_id,
        detail_profile_id
      })
      tinyURL.push({
        type: 'blog',
        target_link: `${target_link}\\${unique_id}\\blog-listing?u=_`,
        is_u: true,
        main_profile_id,
        detail_profile_id
      })
      tinyURL.push({
        type: 'contact',
        target_link: `${target_link}\\${unique_id}\\contact-me`,
        is_u: false,
        main_profile_id,
        detail_profile_id
      })
      tinyURL.push({
        type: 'contact',
        target_link: `${target_link}\\${unique_id}\\contact-me?u=_`,
        is_u: true,
        main_profile_id,
        detail_profile_id
      })
    }
    if (type == 'portfolio') {

      tinyURL.push({
        type: 'portfolio_detail',
        target_link: `${target_link}\\${unique_id}\\portfolio\\${portfolio_detail_id}`,
        is_u: false,
        main_profile_id,
        detail_profile_id,
        portfolio_id: portfolio_detail_id
      })
      tinyURL.push({
        type: 'portfolio_detail',
        target_link: `${target_link}\\${unique_id}\\portfolio\\${portfolio_detail_id}?u=_`,
        is_u: true,
        main_profile_id,
        detail_profile_id,
        portfolio_id: portfolio_detail_id
      })

    }
    return;
  }

  async getSkillGroupsInString(skillsGroups, type, index) {

    await this.shuffleArray(skillsGroups)

    return await skillsGroups.map(skillGroup => {
      if (type == 'cv')

        return `<li>${skillGroup.description}</li>`
      else if (type == 'portfolio')
        return skillGroup.portfolio_variations ? `<ul><li>${skillGroup.portfolio_variations['portfolio_variation' + index]?.trim()}</li></ul>` : ''
      else return `<li>${skillGroup['experience_variation' + index]}</li>`


    }).join(' ')


  }


}
