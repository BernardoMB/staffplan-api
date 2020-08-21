import 'mocha';
import mysql = require('promise-mysql');
import axios from 'axios';
import chaiHttp = require('chai-http');
import chai = require('chai');
import assignment = require('../modules/assignment/assignment');
import { config } from './config';
const expect = chai.expect;
chai.use(chaiHttp);
const BASE_URL = 'http://localhost:4300/api';

describe('Assignment Module', () => {
    describe('Insert Project Role', function () {
        it('should insert into PLANNED_PROJECT_STAFF', async function () {
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
                expect(q2.length).to.be.greaterThan(q1.length)
            } catch (err) {
                console.log('error', err)
            }
        });

        it('should insert into PROJECT_STAFF', async function () {
            try {
                const connection = await mysql.createConnection(config);
                const q2 = await connection.query('SELECT * FROM PLANNED_PROJECT_STAFF')
                const inserted = q2[q2.length - 1];
                const q3 = await connection.query(`SELECT * FROM PROJECT_STAFF WHERE PLANNED_STAFF_ID = ${inserted.ID}`)
                expect(q3).to.have.length.above(0)
            } catch (err) {
                console.log(err)
            }
        })

        it('should insert into STAFF_ALLOCATION', async function () {
            try {
                const connection = await mysql.createConnection(config);
                const q2 = await connection.query('SELECT * FROM PROJECT_STAFF')
                const inserted = q2[q2.length - 1];
                const q4 = await connection.query(`select * from STAFF_ALLOCATION where PROJECT_STAFF_ID = ${inserted.ID}`)
                expect(q4).to.have.length.above(0)
            } catch (err) {
                console.log(err)
            }
        })

        after(async function () {
            try {
                const connection = await mysql.createConnection(config);
                const q1 = await connection.query('SELECT * FROM PLANNED_PROJECT_STAFF')
                const plannedId = q1[q1.length - 1];
                const q2 = await connection.query(`SELECT * FROM PROJECT_STAFF WHERE PLANNED_STAFF_ID = ${plannedId.ID}`)
                const projectStaffId = q2[q2.length - 1];
                await connection.query(`SET FOREIGN_KEY_CHECKS=0;`);
                await connection.query(`delete from PLANNED_PROJECT_STAFF where ID = ${plannedId.ID};`);
                await connection.query(`delete from PROJECT_STAFF where PLANNED_STAFF_ID = ${plannedId.ID};`);
                await connection.query(`delete from STAFF_ALLOCATION where PROJECT_STAFF_ID = ${projectStaffId.ID};`);
                await connection.query(`SET FOREIGN_KEY_CHECKS=1;`);
            } catch (err) {
                console.log(err)
            }
        });
    });
});