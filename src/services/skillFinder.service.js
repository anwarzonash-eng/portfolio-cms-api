import { protfolioModel, SkillModel } from '../models';
import { DynamicGenerationModel } from '../models'
import baseService from './base.service';
import { dynamicdetailProfileService } from './dynamicDetailprofile.service';


// import { skillsOptions } from './skillsOptions';


export class skillFinderService extends baseService {

  async skillFinder(req) {
    try {
      const { description, main_profile_id } = req.body;

      const allSkills = await SkillModel.findAll({
        attributes: ['id', 'title', 'variation'],
        where: { is_deleted: false },
      });
      const allSkillGoups = await DynamicGenerationModel.findAll({
        attributes: ['id', 'skills_ids'],
        where: { main_profile_id: main_profile_id },
      });

      let matchedTitles = allSkills
        .flatMap((skill) =>
          [skill.title, ...(skill.variation || [])].filter(Boolean)
        )
        .filter((title) => new RegExp(`\\b${title}\\b`, 'i').test(description))
        .map((title) => (
          allSkills.find((skill) =>
            [skill.title, ...(skill.variation || [])].includes(title)
          )
        ));

      let finalSelectedSkills = [...new Set(matchedTitles.map((item) => item))]
        .filter(Boolean)

      const mainProfiles = await this._mainProfileModel.findAll();
      const allCategories = await this._categoryModel.findAll({ where: { main_profile_id: main_profile_id } });


      return {

        selectedSkills: finalSelectedSkills,
        allSkills,
        allCategories: allCategories.map(obj => ({ id: obj.id, name: obj.title, tagline: obj.tagline, designation: obj.designation, skills_ids: obj.skills_ids })),
        mainProfiles: mainProfiles,
        allSkillGoups
      };
    } catch (error) {
      console.error('Error in skillFinder:', error);
      throw error;
    }
  }

  async findMatchedSkillsProfiles(req) {

    const main_profile_id = req.body.main_profile_id
    const mainProfile = await this._mainProfileModel.findOne(
      {
        attributes:
          ['id', 'domain'],
        where: { id: main_profile_id }
      })

    const allDynamicProfiles = await this._detailProfileModel.findAll(
      {
        attributes:
          ['id', 'services', 'skills_ids', 'main_profile_id', 'unique_id', 'designation', 'private_title', 'tag_line', 'pdf_urls'],
        where: { main_profile_id: main_profile_id }
      })

    var updateDynamicProfile = []

    allDynamicProfiles.forEach(dynamicProfile => {
      const requestSkills = req.body.skill || []; // Assuming req.body.skills is the correct path
      const profileSkills = dynamicProfile.skills_ids?.skills_ids || [];
      const matchedSkills = profileSkills.filter(
        (skillId) => requestSkills.includes(skillId)
      );
      const totalProfileSkills = profileSkills?.length || 0;
      const matched_percentage = totalProfileSkills > 0 ? (matchedSkills.length / totalProfileSkills) * 100 : 0;
      console.log({ matchedSkills, totalProfileSkills, matched_percentage });
      updateDynamicProfile.push({
        id: dynamicProfile.id,
        main_profile_id: dynamicProfile.main_profile_id,
        unique_id: dynamicProfile.unique_id,
        designation: dynamicProfile.designation,
        tag_line: dynamicProfile.tag_line,
        services: dynamicProfile.services,
        private_title: dynamicProfile.private_title,
        skills_ids: dynamicProfile.skills_ids,
        pdf_urls: dynamicProfile.pdf_urls,
        matched_percentage: matched_percentage ? Math.round(matched_percentage) : 0,
        isOpen: false
      })
    });
    updateDynamicProfile = updateDynamicProfile.filter((profile) => profile.matched_percentage > 0)
    updateDynamicProfile.sort((a, b) => a.matched_percentage - b.matched_percentage);
    updateDynamicProfile = updateDynamicProfile.slice(0, 10);

    const updateDynamicProfilePromise =
      updateDynamicProfile
      && updateDynamicProfile.length > 0
      && updateDynamicProfile.map(async profile => {


        const mainCategoryID = profile.services.find(service => service.type == 'main')?.category_id || null;

        const allportfolios = await protfolioModel.findAll();
        const selectedPortfolios = mainCategoryID ? allportfolios.filter(portfolio => {
          if (portfolio.main_profile_id === main_profile_id && portfolio.categorys.category_ids.some(id => id == mainCategoryID)) {
            return true;
          } else { return false; }

        }) : [];
        const tinyUrlsResponse = await this._tiny_url.findAll({ where: { detail_profile_id: profile.id } });
        const getFormatedResponse = await this.getFormattedResponse(profile.unique_id, tinyUrlsResponse, mainProfile.domain, selectedPortfolios);
        return {
          ...getFormatedResponse,
          skills_ids: profile.skills_ids?.skills_ids || [],
          designation: profile.designation,
          tag_line: profile.tag_line,
          matched_percentage: profile.matched_percentage,
          private_title: profile.private_title,
          pdf_urls: profile.pdf_urls,
          domain: mainProfile.domain
        };
      });

    updateDynamicProfile = await Promise.all(updateDynamicProfilePromise);





    // const filteredAllSkills = allDynamicProfiles.filter((allSkill) => {
    //   // Extract the skills_ids array from the nested object
    //   const allSkillIds = allSkill.skills_ids.skills_ids;

    //   // Check if any skill ID in allSkillIds exists in someSkills
    //   return req.body.skill.filter((newSkills) => allSkillIds.includes(newSkills));
    // });


    return updateDynamicProfile


  }

  async getFormattedResponse(unique_id, tinyUrlResponse, domain, portfolios = []) {

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

    return { uniqe_id, urls }


  }

  gettinyURLUniqeID(key, is_u, tinyUrlResponse, portfolio_detail_id = null) {
    const response = portfolio_detail_id ?
      tinyUrlResponse.find(tinyURL => tinyURL.type === key && tinyURL.is_u == is_u && tinyURL.portfolio_id == portfolio_detail_id)?.uniqe_id || null
      : tinyUrlResponse.find(tinyURL => tinyURL.type === key && tinyURL.is_u == is_u)?.uniqe_id || null;

    return response ? 'https://gourls.link/' + response : null;
  }
}
