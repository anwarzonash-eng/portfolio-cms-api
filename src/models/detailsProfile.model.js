import { sequelize } from '../utils/database';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const detailProfileModel = sequelize.define('Detail_Profiles', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },

  private_title: {
    type: DataTypes.TEXT,
  },

  main_profile_id: {
    type: DataTypes.UUID,
  },

  unique_id: {
    type: Sequelize.STRING(6),

    defaultValue:

      function () {
        const alphabet =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~';
        let id = '';
        for (let i = 0; i < 4; i++) {
          id += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return id;
      },
  },

  skills_ids: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  designation: {
    type: DataTypes.TEXT,
  },

  tag_line: {
    type: DataTypes.TEXT,
  },

  skills: {
    type: DataTypes.TEXT,
  },

  short_description: {
    type: DataTypes.TEXT,
  },

  experiences_ids: {
    type: DataTypes.JSON,
  },

  education_ids: {
    type: DataTypes.JSON,
  },

  portfolios_ids: {
    type: DataTypes.JSON,
  },

  description: {
    type: DataTypes.TEXT,
  },

  category1_title: {
    type: DataTypes.TEXT,
  },

  category1_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  category2_title: {
    type: DataTypes.TEXT,
  },

  category2_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  category2_status: {
    type: DataTypes.BOOLEAN,
  },

  category3_title: {
    type: DataTypes.TEXT,
  },

  category3_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  category3_status: {
    type: DataTypes.BOOLEAN,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  duplicate: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_dynamic: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  content_nature: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'static',
  },
  companytype: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'cypexsoft',
  },
  is_pdf_generated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pdf_download_links: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  video_attached: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  services: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  pdf_urls: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      status: 'pending',
      error_message: '',
      urls:
        [{
          type: 'home',
          url: null
        },

        {
          type: 'home_with_u',
          url: null
        }, {
          type: 'cv',
          url: null
        },

        {
          type: 'cv_with_u',
          url: null
        }, {
          type: 'portfolio_main',
          url: null
        },

        {
          type: 'portfolio_main_with_u',
          url: null
        }
        ],

    }
  },
});
detailProfileModel.sync({ alter: true });
export default detailProfileModel;
