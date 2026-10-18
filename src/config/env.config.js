require("dotenv").config("../../env");

export default {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  aws_region: process.env.aws_region,
  Bucket: process.env.Bucket,
  aws_access_key: process.env.aws_access_key,
  aws_secert_access_key: process.env.aws_secert_access_key,
  adminUser: process.env.adminUser,
  adminEmail: process.env.adminEmail,
  adminPassword: process.env.adminPassword,
  dbString: process.env.DB_String,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  mailSender: process.env.MAIL_SENDER,
};