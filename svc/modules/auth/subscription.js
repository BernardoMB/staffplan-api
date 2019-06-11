const db = require('../../common/connection');
const SQL = require('./query');
const config = require('../../common/config');

// Method to validate the domain and get company details
const getCompanyDB = async (userName, hostname, req) => {
  let connection= null;
  let company = [];
  if (config.DOMAINCHECK) {
    const host = getEnvAndDomain(hostname);
    connection = await db.connection(req);
    company = await db.execute(connection, SQL.fetchCompany(host.environment, host.domain));
  } else {
    const domain = getDomain(userName);
    connection = await db.connection(req);
    company = await db.execute(connection, SQL.fetchCompanyByDomain(domain));
  }
  if (company && !company.length) {
    throw `Authentication failed. Subscription not found`;
  }
  const dbName = company[0].COMPANY_DB;
  return ({ connection, dbName });
};


const getDomain = userName => (userName.split('@')[1].split('.')[0]);

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
    environment: environment.toLowerCase(),
    domain: domain.toLowerCase()
  };
}

module.exports = {
  getCompanyDB
}