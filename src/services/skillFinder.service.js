import { SkillModel } from '../models';
import baseService from './base.service';
// import { skillsOptions } from './skillsOptions';


export class skillFinderService extends baseService {

  async skillFinder(req) {
    try {
      const { description } = req.body;

      const allSkills = await SkillModel.findAll({
        attributes: ['id', 'title', 'variation', 'catagory'],
        where: { is_deleted: false },
      });

      let matchedTitles = allSkills
        .flatMap((skill) =>
          [skill.title, ...(skill.variation || [])].filter(Boolean)
        )
        .filter((title) => new RegExp(`\\b${title}\\b`, 'i').test(description))
        .map((title) => ({
          title: allSkills.find((skill) =>
            [skill.title, ...(skill.variation || [])].includes(title)
          ),
        }));

      let uniqueTitles = [...new Set(matchedTitles.map((item) => item.title))]
        .filter(Boolean)
        .map((title) => ({ title }));

      const skillsWithIds = [
        { name: { id: 1, name: "JavaScript" } },
        { name: { id: 2, name: "JavaScript" } },
        { name: { id: 3, name: "JavaScript" } },
      ];

      const skillsWithIdsAndCategories = [
        { id: 1, category: "Web Development" },
        { id: 2, category: "Data Science" },
        { id: 4, category: "Databases" }
      ];
      //       const selectedCategories = skillsWithIdsAndCategories
      // .filter(skill => skillsWithIds.some(({ name }) => name.id === skill.id))
      // .map(({ category }) => category);

      const mainProfiles = await this._mainProfileModel.findAll();
      const skillsOptions = await this._categoryModel.findAll();
      const selectedCategories = skillsOptions
        .filter(skill => uniqueTitles.some(({ title }) => title.catagory === skill.label))

      uniqueTitles = uniqueTitles.map(skill => ({ id: skill.title.id, title: skill.title.title, variation: skill.title.variation, catagory: skill.title.catagory }))

      // await this.findMatchedSkillsProfiles()

      return {
        selectedSkills: uniqueTitles,
        selectedCategories: selectedCategories.map(obj => ({ id: obj.label, name: obj.title, tagline: obj.tagline, designation: obj.designation })),
        allSkills,
        allCategories: skillsOptions.map(obj => ({ id: obj.label, name: obj.title, tagline: obj.tagline, designation: obj.designation })),
        mainProfiles: mainProfiles,
      };
    } catch (error) {
      console.error('Error in skillFinder:', error);
      throw error;
    }
  }

  async findMatchedSkillsProfiles(req) {

    const allDynamicProfiles = await this._detailProfileModel.findAll({ attributes: ['id', 'skills_ids', 'unique_id', 'designation', 'tag_line'], where: { content_nature: 'dynamic' } })

    var updateDynamicProfile = []

    allDynamicProfiles.forEach(dynamicProfile => {
      const profileSkills = dynamicProfile.skills_ids.skills_ids;
      const new_skills = req.body.skill.filter((newSkills) => profileSkills.includes(newSkills));

      updateDynamicProfile.push({
        id: dynamicProfile.id,
        unique_id: dynamicProfile.unique_id,
        designation: dynamicProfile.designation,
        tag_line: dynamicProfile.tag_line,
        new_skills: new_skills.map(id => ({ id, is_exist: true })), matched_percentage: ((new_skills.length / req.body.skill.length * 100).toFixed(2)),
        isOpen: false
      })
    });

    updateDynamicProfile.sort((a, b) => a.matched_percentagecd - b.matched_percentage);


    // const filteredAllSkills = allDynamicProfiles.filter((allSkill) => {
    //   // Extract the skills_ids array from the nested object
    //   const allSkillIds = allSkill.skills_ids.skills_ids;

    //   // Check if any skill ID in allSkillIds exists in someSkills
    //   return req.body.skill.filter((newSkills) => allSkillIds.includes(newSkills));
    // });


    return updateDynamicProfile


  }
}
