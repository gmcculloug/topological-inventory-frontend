const SECTION = 'insights';
const APP_ID = 'starter';
const FRONTEND_PORT = 8002;
const routes = {};

routes[`/beta/${SECTION}/${APP_ID}`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/${SECTION}/${APP_ID}`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/beta/apps/${APP_ID}`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/apps/${APP_ID}`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/beta/${SECTION}/${APP_ID}/entity`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/${SECTION}/${APP_ID}/entity`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/beta/${SECTION}/${APP_ID}/tree-view`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/${SECTION}/${APP_ID}/tree-view`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/beta/${SECTION}/${APP_ID}/topology-viewer`] = { host: `http://localhost:${FRONTEND_PORT}` };
routes[`/${SECTION}/${APP_ID}/topology-viewer`] = { host: `http://localhost:${FRONTEND_PORT}` };

module.exports = { routes };
