const db = require('../../common/connection');
const SQL = require('./query');

// Method to validate the domain and get company details
const getCompanyDB = async (hostname, req) => {
  const host = getEnvAndDomain(hostname);
  const connection = await db.connection(req);
  const company = await db.execute(connection, SQL.fetchCompany(host.environment, host.domain));
  if (company && !company.length) {
    throw `Authentication failed. Subscription not found`;
  }
  const dbName = company[0].COMPANY_DB;
  return ({ connection, dbName });
}

// Method used to get Environment and Domain name from hostname
const getEnvAndDomain = (hostname) => {
  let environment = '';
  let domain = '';
  const host = hostname.split('.');
  if (host.length == 2) {
    domain = host[0];
  } else if (host.length > 2) {
    environment = host[0];
    domain = host[1];
  }
  return {
    environment,
    domain
  };
}

module.exports = {
  getCompanyDB
}