import { SkillModel } from '../models';
import { DynamicGenerationModel } from '../models'
import baseService from './base.service';
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
    const allDynamicProfiles = await this._detailProfileModel.findAll({ attributes: ['id', 'main_profile_id', 'skills_ids', 'unique_id', 'designation', 'tag_line'], where: { main_profile_id: main_profile_id } })

    var updateDynamicProfile = []

    allDynamicProfiles.forEach(dynamicProfile => {
      const profileSkills = dynamicProfile.skills_ids.skills_ids;
      const new_skills = req.body.skill.filter((newSkills) => profileSkills?.includes(newSkills));

      updateDynamicProfile.push({
        id: dynamicProfile.id,
        main_profile_id: dynamicProfile.main_profile_id,
        unique_id: dynamicProfile.unique_id,
        designation: dynamicProfile.designation,
        tag_line: dynamicProfile.tag_line,
        new_skills: new_skills.map(id => ({ id, is_exist: true })), matched_percentage: ((new_skills.length / req.body.skill.length * 100).toFixed(2)),
        isOpen: false
      })
    });

    updateDynamicProfile.sort((a, b) => b.matched_percentage - a.matched_percentagecd);
    updateDynamicProfile = updateDynamicProfile.filter((profile) => profile.matched_percentage > 0)

    // const filteredAllSkills = allDynamicProfiles.filter((allSkill) => {
    //   // Extract the skills_ids array from the nested object
    //   const allSkillIds = allSkill.skills_ids.skills_ids;

    //   // Check if any skill ID in allSkillIds exists in someSkills
    //   return req.body.skill.filter((newSkills) => allSkillIds.includes(newSkills));
    // });


    return updateDynamicProfile


  }
}
