import 'mocha';
import mysql = require('promise-mysql');
import axios from 'axios';
import SQL = require('../modules/assignment/query');
import chaiHttp = require('chai-http');
import chai = require('chai');
import assignment = require('../modules/assignment/assignment');
const expect = require('chai').expect;
chai.use(chaiHttp);
const BASE_URL = 'http://localhost:4300/api';
const config = {
    "host": "rds.coqokg7f9b0o.us-west-1.rds.amazonaws.com",
    "user": "staff_root",
    "password": "6HTpVVZeC",
    "port": 3306,
    "database": "dev_internal",
    "name": "acme-demo",
}

describe('Assignment Module', () => {
    describe('Insert Project Role', () => {
        it('should create a new open role', async (done) => {
            try {
                const connection = await mysql.createConnection(config);
                const q1 = await connection.query('SELECT * FROM PLANNED_PROJECT_STAFF')
                const loginBody = {
                    "hostname": "localhost",
                    "password": "admin",
                    "username": "admin@dev.io"
                }
                const loginRes = await axios.post(`${BASE_URL}/auth/authenticate`, loginBody)
                const token = loginRes.data.token
                const projectId = 5;
                const body = {
                    allocation: 100,
                    roleId: 5,
                    startDate: '2020/11/11',
                    endDate: '2021/11/11',
                    resumeSubmitted: 1
                };
                const res = await axios.put(
                    `${BASE_URL}/project/${projectId}/role`,
                    body,
                    { headers: { sessionid: token } }
                )

                const q2 = await connection.query('SELECT * FROM PLANNED_PROJECT_STAFF')

                if (q2.length > q1.length) {
                    const inserted = q2[q2.length - 1];
                    const q3 = await connection.query(`SELECT * FROM PROJECT_STAFF WHERE PLANNED_STAFF_ID = ${inserted.ID}`)

                    if (q3.length) {
                        const q4 = await connection.query(
                            `select * from STAFF_ALLOCATION where PROJECT_STAFF_ID = ${inserted.ID}`
                        )
                        console.log(inserted)
                    }
                }
            } catch (err) {
                console.log('error', err)
            } finally {
                done()
            }
        });
    });
});