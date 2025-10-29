import baseService from './base.service';
import { sequelize } from '../utils/database';

export class dynamicGenerationService extends baseService {
  async adddynamicGeneration(req) {
    let response;

    // console.log(req);

    if (req.body.actionType === 'add') {
      response = await this._dynamicGenerationModel.create({
        skills_ids: JSON.parse(req.body.skillsIds),
        description: req.body.description,
        label: req.body.label,
        experience_variation1: req.body.experience_variation1,
        experience_variation2: req.body.experience_variation2,
        experience_variation3: req.body.experience_variation3,
        experience_variation4: req.body.experience_variation4,
        experience_variation5: req.body.experience_variation5,
        experience_variation6: req.body.experience_variation6,
        experience_variation7: req.body.experience_variation7,
        experience_variation8: req.body.experience_variation8,
        experience_variation9: req.body.experience_variation9,
        experience_variation10: req.body.experience_variation10,
        portfolio_variations: JSON.parse(req.body.portfolioVariations),
        companytype: req.body.companytype,
        main_profile_id: req.body.main_profile_id
      });
      return await this.listdynamicGeneration();
    } else if (req.body.actionType === 'update') {
      let bodyPayload = {
        skills_ids: JSON.parse(req.body.skillsIds),
        label: req.body.label,
        description: req.body.description,
        experience_variation1: req.body.experience_variation1,
        experience_variation2: req.body.experience_variation2,
        experience_variation3: req.body.experience_variation3,
        experience_variation4: req.body.experience_variation4,
        experience_variation5: req.body.experience_variation5,
        experience_variation6: req.body.experience_variation6,
        experience_variation7: req.body.experience_variation7,
        experience_variation8: req.body.experience_variation8,
        experience_variation9: req.body.experience_variation9,
        experience_variation10: req.body.experience_variation10,
        portfolio_variations: JSON.parse(req.body.portfolioVariations),
        companytype: req.body.companytype,
      };

      await this._dynamicGenerationModel.update(bodyPayload, {
        where: { id: req.body.id },
        returning: true,
      });
      return await this.listdynamicGeneration();
    } else if (req.body.actionType === 'delete') {
      const dynamicContentIdToDelete = req.body.id;

      await this._dynamicGenerationModel.update(
        { is_deleted: true },
        {
          where: { id: dynamicContentIdToDelete },
          returning: true,
        }
      );
    }

    return response;
  }

  async add(req) {

    // const bodyPayload = {
    //   ...req.body,
    //   skills_ids: JSON.parse(req.body.skillsIds),
    // };
    const response = await this._dynamicGenerationModel.create(req.body);

    return response;
  }

  async listdynamicGeneration() {
    const query = `select
    id,
    description,
    main_profile_id,
    experience_variation1,
    experience_variation2,
    experience_variation3,
    experience_variation4,
    experience_variation5,
    experience_variation6,
    experience_variation7,
    experience_variation8,
    experience_variation9,
    experience_variation10,
    companytype,
    portfolio_variations,
    label,
    
    (
        select
          json_agg(
            json_build_object('id', _skills.id, 'title', _skills.title, 'url', _skills.url, 'order', _skills.order)
          ) as skills_ids
        from
          "Dynamic_Generations" _dynamicGeneration_child,
          json_array_elements_text(skills_ids -> 'skills_ids') as fk
          join "Skills" _skills on _skills.id = fk :: uuid
        where
          _dynamicGeneration_parent.id = _dynamicGeneration_child.id
      ) AS skills
    from
      "Dynamic_Generations" _dynamicGeneration_parent
      where
      _dynamicGeneration_parent.is_deleted = false
            `;

    //   console.log(query);
    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return results;
  }
}
