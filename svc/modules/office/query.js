module.exports = {
    OfficeList: (Condition) =>
        `SELECT OFFICE.OFFICE_ID,
                OFFICE.OFFICE_NAME,
                OFFICE.OFFICE_ADDRESS,
                OFFICE.OFFICE_CITY,
                OFFICE.OFFICE_STATE,
                OFFICE.OFFICE_ZIP,
                OFFICE.OFFICE_TYPE,
                OFFICE.REGION_ID
        FROM OFFICE
        ${Condition}
        `,
    getQueryCount: (query) => `SELECT COUNT(*) AS count FROM (${query}) AS Q`,
    officeDetailsById: (id) => `SELECT * FROM OFFICE WHERE OFFICE.OFFICE_ID = ${id}`,
    insertOfficeDetail: (office) =>
        `INSERT INTO OFFICE (
            OFFICE_NAME,
            OFFICE_ADDRESS,
            OFFICE_CITY,
            OFFICE_STATE,
            OFFICE_ZIP,
            OFFICE_TYPE,
            REGION_ID
        ) VALUES (
            '${office.OFFICE_NAME}',
            '${office.OFFICE_ADDRESS}',
            '${office.OFFICE_CITY}',
            '${office.OFFICE_STATE}',
            '${office.OFFICE_ZIP}',
            '${office.OFFICE_TYPE}',
            '${office.REGION_ID}'
        )`,
    updateOfficeDetail: (office, id) =>
        `UPDATE OFFICE SET 
            OFFICE_NAME = '${office.OFFICE_NAME}',
            OFFICE_ADDRESS = '${office.OFFICE_ADDRESS}',
            OFFICE_CITY = '${office.OFFICE_CITY}',
            OFFICE_STATE = '${office.OFFICE_STATE}',
            OFFICE_ZIP = '${office.OFFICE_ZIP}',
            OFFICE_TYPE = '${office.OFFICE_TYPE}',
            REGION_ID = '${office.REGION_ID}'
        WHERE OFFICE.OFFICE_ID = ${id}`,
    removeOffice: (id) => `DELETE FROM OFFICE WHERE OFFICE_ID = ${id}`
};
