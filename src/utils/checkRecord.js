import { sequelize } from "./database";

export async function checkRecord(model, dataIdToDelete, columnName) {
  const recordsWithSkill = await model.findAll({
    where: sequelize.where(
      sequelize.cast(sequelize.col(columnName), 'text'),
      'LIKE',
      `%${dataIdToDelete}%`
    ),
  });

  return recordsWithSkill.length > 0;
}
