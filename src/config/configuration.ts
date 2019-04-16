import { config } from 'dotenv';
import IConfig from './IConfig';

config();

const envVars: NodeJS.ProcessEnv = process.env;

const configuration: IConfig = Object.freeze({
  apiToken: envVars.API_TOKEN || 'any',
  mongo_url: envVars.MONGO_URL || 'any',
  node_env: envVars.NODE_ENV || 'any',
  port: envVars.PORT || 'any',
  secret: envVars.SECRET || 'any',
  url: envVars.URL || 'any',
});

export default configuration;
