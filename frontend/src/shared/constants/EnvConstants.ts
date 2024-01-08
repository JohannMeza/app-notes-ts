const APP_DEVELOPMENT = true;

const APP_DEV_URL = 'http://localhost:4000/api';
const APP_DEV_TOKEN = 'APPLICATION_NOTES';

const APP_PRD_URL = 'http://localhost:4000/api';
const APP_PRD_TOKEN = 'APPLICATION_NOTES';

export const APP_TOKEN = APP_DEVELOPMENT  ? APP_DEV_TOKEN : APP_PRD_TOKEN;
export const APP_URL = APP_DEVELOPMENT    ? APP_DEV_URL   : APP_PRD_URL;