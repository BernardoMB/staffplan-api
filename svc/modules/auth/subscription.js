const db = require('../../common/connection');
const SQL = require('./query');
const config = require('../../common/config');
const log = require("../../common/logger");

// Method to validate the domain and get company details
const getCompanyDB = async (userName, hostname, req) => {
  let connection= null;
  let company = [];
  if (config.DOMAINCHECK === "true") {
    log.info("DOMAIN CHECK: true")
    const host = getEnvAndDomain(hostname);
    connection = await db.connection(req);
    company = await db.execute(connection, SQL.fetchCompany(host.environment, host.domain));
  } else {
    log.info("DOMAIN CHECK: false")
    const domain = getDomain(userName);
    connection = await db.connection(req);
    company = await db.execute(connection, SQL.fetchCompanyByDomain(domain));
  }
  if (company && !company.length) {
    throw `Authentication failed. Could not find company environment combination`;
  }
  const dbName = company[0].COMPANY_DB;
  return ({ connection, dbName });
};


const getDomain = userName => (userName.split('@')[1].split('.')[0]);

// Method used to get Environment and Domain name from hostname
// https://trial-acme.staffplan.io
const getEnvAndDomain = (hostname) => {
  let environment = '';
  let domain = '';
  let envDomain = '';
  const host = hostname.split('.');
  if (host.length === 3) { // [ 'trial-acme', 'staffplan', 'io' ]
    envDomain = host[0];
    const envDomainArr = envDomain.split('-');
    if (envDomainArr.length === 2) {
      environment = envDomainArr[0];
      domain = envDomainArr[1];
    } else {
      domain = envDomain;
      environment = ''; // Empty environment for PROD
    }
  }
  log.info("environment: " + environment.toLowerCase() + " | " + "domain: " + domain.toLowerCase());
  return {
    environment: environment.toLowerCase(),
    domain: domain.toLowerCase()
  };
}

module.exports = {
  getCompanyDB
}
