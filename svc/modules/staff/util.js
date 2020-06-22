const util = require("../../common/util");
const SQL = require('./query');

module.exports = {
    filters: (req) => {
        const filter = req.body.filter;
        let filterCondition = " where 1 = 1 ";
        if (req.params.id) {
            filterCondition = `${filterCondition} AND STAFF.STAFF_ID = ${req.params.id}`;
        }
        if (filter) {

            if (filter.office) {
                filterCondition = `${filterCondition} AND STAFF.OFFICE_ID IN (${filter.office.join(',')})`;
            }

            if (filter.role) {
                filterCondition = `${filterCondition} AND STAFF.STAFF_ROLE_ID IN (${filter.role.join(',')})`;
            }

            if (filter.status) {
                filterCondition = `${filterCondition} AND STAFF.STAFF_STATUS_ID IN (${filter.status.join(',')})`;
            }

            if (filter.staffStatus) {
                filterCondition = `${filterCondition} AND STAFF.STAFF_STATUS_ID IN (${filter.staffStatus.join(',')})`;
            }

            if (filter.group) {
                filterCondition = `${filterCondition} AND STAFF_GROUP_ID IN (${filter.group.join(',')})`;
            }

            if (filter.staffId) {
                filterCondition = `${filterCondition} AND STAFF.STAFF_ID = ${filter.staffId}`;
            }

            if (filter.alert) {
                if (filter.alert === 'Gap') {
                    filterCondition = `${filterCondition} AND STAFF.STAFF_ID in (${SQL.staffListGap()})`;
                } else if (filter.alert === 'Alert') {
                    filterCondition = `${filterCondition} AND STAFF.STAFF_ID in (${SQL.staffAlert()})`;
                } else if (filter.alert === 'Bench') {
                    filterCondition = `${filterCondition} AND STAFF.STAFF_ID in (${SQL.staffOnBench()})`;
                }
            }

            if (filter.endDate && filter.startDate) {
                filterCondition = `${filterCondition} AND STAFF.STAFF_ID IN ( ${SQL.staffAvailable(filter.startDate, filter.endDate)} )`;
            }
        }
        // List staff based on user office access
        if (util.officeAccessRestricted(req.payload.ROLE)) {
            filterCondition = `${filterCondition} AND STAFF.OFFICE_ID IN (SELECT OFFICE_ID FROM USER_ACCESS WHERE USER_ID = ${req.payload.ID})`;
        }
        return (filterCondition);
    },
    availabilityFilters: (req) => {
        const filter = req.body.filter;
        let filterCondition = "";
        if (filter) {
            if (filter.office) {
                filterCondition = `${filterCondition} AND STAFF.OFFICE_ID IN (${filter.office.join(',')})`;
            }

            if (filter.role) {
                filterCondition = `${filterCondition} AND STAFF.STAFF_ROLE_ID IN (${filter.role.join(',')})`;
            }

            if (filter.status) {
                filterCondition = `${filterCondition} AND STAFF.STAFF_STATUS_ID IN (${filter.status.join(',')})`;
            }

            if (filter.staffStatus) {
                filterCondition = `${filterCondition} AND STAFF.STAFF_STATUS_ID IN (${filter.staffStatus.join(',')})`;
            }

            if (filter.group) {
                filterCondition = `${filterCondition} AND STAFF_GROUP_ID IN (${filter.group.join(',')})`;
            }
            return (filterCondition);
        }
    },
    searchFilter: (req) => {
        const filter = req.body.filter;
        let condition = ' where 1 = 1 ';
        if (filter) {
            if (filter.staffId) {
                condition = `${condition} AND STAFF.STAFF_ID = ${filter.staffId}`
            } else {
                // check office
                if (filter.office) {
                    condition = `${condition} AND STAFF.OFFICE_ID = ${filter.office}`
                }
                // check Role
                if (filter.roleId) {
                    condition = `${condition} AND STAFF.STAFF_ROLE_ID = ${filter.roleId}`
                }
                // check same role
                if (filter.showAllRole !== null && filter.showAllRole !== undefined && !filter.showAllRole) {
                    condition = `${condition} AND STAFF_ROLE_ID IN (SELECT PROJECT_ROLE_ID FROM 
          PLANNED_PROJECT_STAFF WHERE ID = ${filter.plannedProjectId})`;
                }
                // Check Same client
                if (filter.showAllClient !== null && filter.showAllClient !== undefined && !filter.showAllClient) {
                    condition = `${condition} AND STAFF.STAFF_ID IN ( ${SQL.staffWithClient(filter.projectId)} )`;
                }
                // Check Availability
                if (filter.availability && filter.availability !== 'All') {
                    if (filter.availability === 'Available') {
                        condition = `${condition} AND STAFF.STAFF_ID IN ( ${SQL.staffAvailable(filter.startDate, filter.endDate)} )`;
                    } else if (filter.availability === 'Gap') {
                        condition = `${condition} AND STAFF.STAFF_ID IN ( ${SQL.staffGap(filter.startDate, filter.endDate)} )`;
                    }
                }
            }
        }
        // List staff based on user office access
        if (util.officeAccessRestricted(req.payload.ROLE)) {
            condition = `${condition} AND STAFF.OFFICE_ID IN (SELECT OFFICE_ID FROM USER_ACCESS WHERE USER_ID = ${req.payload.ID})`;
        }
        return condition;
    }
}
