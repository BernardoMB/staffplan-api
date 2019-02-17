import * as $ from 'jquery';
import * as moment from 'moment';
import { timeInRange } from '@progress/kendo-angular-dateinputs/dist/es2015/util';

export const BASE_URL = 'http://' + window.location.hostname + ':4300/api/';
export const HIDDEN_PROJECT_COLUMNS = [
    'PROJECT_ID',
    'PROJECT_NO',
    'PROJECT_STATUS_ID',
    'PROJECT_TYPE_ID',
    'OFFICE_ID',
    'STATUS_ID',
    'TYPE_ID',
    'PROJECT_ADDRESS',
    'PROJECT_STATE',
    'PROJECT_ZIP',
    'PROJECT_DESCRIPTION',
    'CATEGORY_ID',
    'PROJECT_DURATION',
    'GROUP_ID',
    'CUSTOMERS_DATA',
    'OFFICE_ADDRESS',
    'OFFICE_ID',
    'OFFICE_CITY',
    'OFFICE_STATE',
    'OFFICE_TYPE',
    'OFFICE_ZIP',
    'REGION_ID',
    'START_DATE',
    'END_DATE',
    'CATEGORY_NAME',
    'TYPE_NAME',
    'PROJECT_EXECUTIVE',
    'PROJECT_CITY',
    'GROUP_NAME'
];
export const HIDDEN_PROJECT_DETAILS_COLUMNS = [
    'ID',
    'STAFF_ID',
    'PROJECT_ID',
    'PROJECT_ROLE_ID',
    'ROLE_ID',
    'EMAIL',
    'ASSIGNMENT_DURATION',
    'CONFIRMED',
    'NEXT_AVAILABLE',
    'STATUS_NAME',
    'STATUS',
    'EXPERIENCE_ID',
    'STAFF_PHOTO',
    'ROLE_ID'
];
export const HIDDEN_PROJECT_UNASSIGNED_COLUMNS = [
    'ID',
    'PROJECT_ID',
    'PROJECT_ROLE_ID',
    'ASSIGNMENT_DURATION',
    'CONFIRMED',
    'NEXT_AVAILABLE',
    'ROLE_ID'
];
export const HIDDEN_STAFF_COLUMNS = [
    'STAFF_ID',
    'STAFF_ROLE_ID',
    'STAFF_GROUP_ID',
    'STAFF_STATUS_ID',
    'OFFICE_ID',
    'STAFF_PHOTO',
    'EXPERIENCE_ID',
    'HOME_CITY',
    'HOME_STATE',
    'HOME_ZIP',
    'STAFF_CERTIFICATION',
    'STAFF_TRAINING',
    'PHONE_2',
    'PHONE_2_TYPE',
    'ROLE_ID',
    'GROUP_ID',
    'STATUS_ID',
    'PHONE_1',
    'PHONE_1_TYPE',
    'EMAIL_ID',
    'EMPLOYMENT_START_DATE',
    'FIRST_NAME',
    'LAST_NAME',
    'MIDDLE_INITIAL',
    'STAFF_NAME',
];
export const HIDDEN_NEW_STAFF_COLUMNS = [
    'STAFF_ID',
    'STAFF_ROLE_ID',
    'STAFF_GROUP_ID',
    'STAFF_STATUS_ID',
    'OFFICE_ID',
    'STAFF_PHOTO',
    'EXPERIENCE_ID',
    'HOME_CITY',
    'HOME_STATE',
    'HOME_ZIP',
    'STAFF_CERTIFICATION',
    'STAFF_TRAINING',
    'PHONE_2',
    'PHONE_2_TYPE',
    'ROLE_ID',
    'GROUP_ID',
    'STATUS_ID',
    'PHONE_1',
    'PHONE_1_TYPE',
    'EMAIL_ID',
    'EMPLOYMENT_START_DATE',
    'FIRST_NAME',
    'LAST_NAME',
    'MIDDLE_INITIAL',
    'STAFF_NAME',
    'OFFICE_ADDRESS',
    'OFFICE_ID',
    'OFFICE_CITY',
    'OFFICE_STATE',
    'OFFICE_TYPE',
    'OFFICE_ZIP',
    'REGION_ID',
    'STAFF_ASSIGNMENT',
    'STATUS_NAME'
];

export const HIDDEN_STAFF_DETAILS_COLUMNS = [
    'STAFF_ID',
    'PROJECT_ID',
    'PROJECT_ROLE_ID',
    'ASSIGNMENT_DURATION',
    'NEXT_AVAILABLE',
    'PROJECT_STATUS_ID',
    'EXPERIENCE_ID'
];
export const HIDDEN_OPEN_ROLL_COLUMNS = [
    'ASSIGNMENT_DURATION',
    'ID',
    'CONFIRMED',
    'NEXT_AVAILABLE',
    'PROJECT_ID',
    'PROJECT_ROLE_ID',
    'PROJECT_STATUS_ID',
    'EXPERIENCE_ID',
    'GROUP_ID',
    'OFFICE_CITY',
    'TYPE_NAME'
];

export const HIDDEN_STAFF_DETAILS_POPOVER_COLUMNS = [
    'PROJECT_ID',
    'PROJECT_ROM',
    'PROJECT_ADDRESS',
    'PROJECT_CITY',
    'PROJECT_STATE',
    'PROJECT_ZIP',
    'START_DATE',
    'END_DATE',
    'PROJECT_DURATION',
    'PROJECT_STATUS_ID',
    'PROJECT_TYPE_ID',
    'OFFICE_ID',
    'OFFICE_NAME',
    'OFFICE_ADDRESS',
    'OFFICE_CITY',
    'OFFICE_STATE',
    'OFFICE_ZIP',
    'OFFICE_TYPE',
    'REGION_ID',
    'REGION_NAME',
    'CUSTOMER_ID',
    'CUSTOMER_ADDRESS',
    'CUSTOMER_CITY',
    'CUSTOMER_STATE',
    'CUSTOMER_ZIP',
    'CUSTOMER_CONTACT',
    'CONTACT_PHONE',
    'STAFF_ID',
    'ALLOCATION',
    'PROJECT_ROLE_ID',
    'CONFIRMED',
    'NEXT_AVAILABLE',
    'CATEGORY_ID',
    'PROJECT_DESCRIPTION',
    'ASSIGNMENT_DURATION',
    'GROUP_ID',
    'EXPERIENCE_ID',
    'PROJECT_NO',
    'TYPE_NAME',
    'TIMELINE_TYPE',
    'STATUS_NAME',
    'CATEGORY_NAME'
];
export const HIDDEN_ALL_PROJECT_IN_STAFF_COLUMNS = [
    'STAFF_ID',
    'PROJECT_ID',
    'PROJECT_ROLE_ID',
    'PROJECT_STATUS_ID',
    'ASSIGNMENT_DURATION',
    'CONFIRMED',
    'STATUS_NAME',
    'START_DATE',
    'ALLOCATION',
    'FUTURE_DAYS',
    'END_DATE1',
    'STAFF_STATUS_NAME',
    'EXPERIENCE_ID',
    'OFFICE_CITY'
];
export const HIDDEN_STAFF_ASSIGNMENT_COLUMNS = [
    'ID',
    'STAFF_ID',
    'PROJECT_ID',
    'PROJECT_ROLE_ID',
    'PROJECT_STATUS_ID',
    'ASSIGNMENT_DURATION',
    'CONFIRMED',
    'FUTURE_DAYS',
    'NEXT_AVAILABLE',
    'STAFF_STATUS_NAME',
    'EXPERIENCE_ID',
    'OFFICE_NAME'
];
export const STAFF_PROJECT_DETAILS_COLUMNS = [{
    'columnId': 'PROJECT_NAME',
    'columnLabel': 'Project Name'
}, {
    'columnId': 'ROLE_NAME',
    'columnLabel': 'Role'
}, {
    'columnId': 'START_DATE',
    'columnLabel': 'Start Date'
}, {
    'columnId': 'END_DATE',
    'columnLabel': 'End Date'
}, {
    'columnId': 'ALLOCATION',
    'columnLabel': 'Allocation'
}, {
    'columnId': 'CONFIRMED',
    'columnLabel': 'Confirmed'
}
];
export const STAFF_ALL_PROJECT_DETAILS_COLUMNS = [{
    'columnId': 'STAFF_NAME',
    'columnLabel': 'Staff'
}, {
    'columnId': 'PROJECT_NAME',
    'columnLabel': 'Project'
}, {
    'columnId': 'ROLE_NAME',
    'columnLabel': 'Project Role'
}, {
    'columnId': 'END_DATE',
    'columnLabel': 'End Date'
}, {
    'columnId': 'STAFF_ASSIGNMENT',
    'columnLabel': 'Assignment Status'
}, {
    'columnId': 'NEXT_AVAILABLE',
    'columnLabel': 'Next Available'
}];
export const STAFF_ASSIGNMENT_ALL_COLUMNS = [{
    'columnId': 'STAFF_NAME',
    'columnLabel': 'Staff'
}, {
    'columnId': 'PROJECT_NAME',
    'columnLabel': 'Project'
}, {
    'columnId': 'STATUS_NAME',
    'columnLabel': 'Project Status'
}, {
    'columnId': 'STAFF_ASSIGNMENT',
    'columnLabel': 'Assignment Status'
}, {
    'columnId': 'ROLE_NAME',
    'columnLabel': 'Project Role'
}, {
    'columnId': 'START_DATE',
    'columnLabel': 'Start Date'
}, {
    'columnId': 'END_DATE',
    'columnLabel': 'End Date'
}, {
    'columnId': 'RESUME_SUBMITTED',
    'columnLabel': 'Resume Submitted'
}, {
    'columnId': 'ALLOCATION',
    'columnLabel': 'Allocation'
}];
export const PROJECT_LOG_PROJECT_TEAM = [{
    'columnId': 'STAFF_NAME',
    'columnLabel': 'Staff Name'
}, {
    'columnId': 'START_DATE',
    'columnLabel': 'Start Date'
}, {
    'columnId': 'END_DATE',
    'columnLabel': 'End Date'
}, {
    'columnId': 'ALLOCATION',
    'columnLabel': 'Allocation'
}, {
    'columnId': 'RESUME_SUBMITTED',
    'columnLabel': 'Proposal'
}, {
    'columnId': 'ROLE_NAME',
    'columnLabel': 'Project Role'
}, {
    'columnId': 'STAFF_ASSIGNMENT',
    'columnLabel': 'Assignment Status'
}];
export const PROJECT_LOG_PROJECT_ROLE = [
    {
        'columnId': 'START_DATE',
        'columnLabel': 'Start Date'
    }, {
        'columnId': 'END_DATE',
        'columnLabel': 'End Date'
    }, {
        'columnId': 'ALLOCATION',
        'columnLabel': 'Allocation'
    }, {
        'columnId': 'RESUME_SUBMITTED',
        'columnLabel': 'Proposal'
    }, {
        'columnId': 'ROLE_NAME',
        'columnLabel': 'Project Role'
    }, {
        'columnId': 'COMMENT',
        'columnLabel': 'Comment'
    }];
    export const PROJECT_LOG_CREATE = {
        "PROJECT_NO": "Project Number",
        "PROJECT_NAME": "Project Name",
        "PROJECT_ROM": "ROM",
        "PROJECT_ADDRESS": "Street Address",
        "PROJECT_CITY": "City",
        "PROJECT_STATE": "State",
        "PROJECT_ZIP": "Zip",
        "START_DATE": "Start Date",
        "END_DATE": "End Date",
        "PROJECT_DESCRIPTION": "Project Description",
        "TIMELINE_TYPE": "Timeline"
    };
    export const STAFF_LOG_CREATE = {
        "FIRST_NAME": "First Name",
        "MIDDLE_INITIAL": "Middle Name",
        "LAST_NAME": "Last Name",
        "PREFERRED_NAME": "Preferred Name",
        "PHONE_1": "Cell Phone",
        "PHONE_2": "Alternate Phone",
        "HOME_CITY": "City",
        "HOME_STATE": "State",
        "HOME_ZIP": "Zip",
        "EMPLOYMENT_START_DATE": "Employment Start Date"
    };

export const getColumnLabel = function (key) {
    let keyWords = key.split('_');
    for (let item in keyWords) {
        keyWords[item] = keyWords[item].replace(/^[a-z]|[A-Z]/g, function (v, i) {
            return i === 0 ? v.toUpperCase() : v.toLowerCase();
        });
    }
    return keyWords.join(' ');
};

export const getColumnsList = function (item, hiddenColumns, customColumns, columnOrdering) {
    let columns = [];
    for (const key in item) {
        if (hiddenColumns.indexOf(key) < 0) {
            let columnInstance = {
                columnId: key,
                columnLabel: customColumns[key] || getColumnLabel(key)
            };
            columns.push(columnInstance);
        }
    }
    if (typeof columnOrdering === 'undefined') {
        return columns;
    } else {
        for (const key in columnOrdering) {
            let index = -1;
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].columnId == key) {
                    index = i;
                }
            }
            if (index != -1) {
                columns.splice(columnOrdering[key], 0, columns[index]);
                columns.splice(index + 1, 1);
            }
        }
        return columns;
    }

};

export const renderTabularViews = function (type, identifier) {
    let size;
    switch (type) {
        case 1:
            size = '1px';
            break;
        case 2:
            size = '10px';
            break;
        case 3:
            size = '18px';
            break;
    }
    $('#' + identifier + ' tbody td').css('padding-top', size);
    $('#' + identifier + ' tbody td').css('padding-bottom', size);
};

export const getMergedColumnsDataset = function (dataset, mergeColumns) {
    for (let i = 0; i < dataset.length; i++) {
        let data = dataset[i];
        for (let key in mergeColumns) {
            let inputString = '';
            const isDuplicate = mergeColumns[key].isDuplicate;
            for (let index in mergeColumns[key].columns) {
                const column = mergeColumns[key].columns[index];
                inputString += data[column] + mergeColumns[key].separator;
                if (!isDuplicate) {
                    delete data[column];
                }
            }
            data[key] = inputString;
        }
    }
    return dataset;
};
export const dateValidation = function (projectDate, assignDate) {
    if (typeof projectDate !== 'undefined' && typeof assignDate !== 'undefined') {
        let validation = {
            key: '',
            validationString: ''
        };
        if (convert(assignDate.START_DATE.toString()) < convert(projectDate.START_DATE.toString())) {
            validation['key'] = 'START_DATE';
            validation['validationString'] = 'Start date must be equal to or greater than project start date';
        } else if (convert(assignDate.END_DATE.toString()) > convert(projectDate.END_DATE.toString())) {
            validation['key'] = 'END_DATE';
            validation['validationString'] = 'End date must be equal to or less than project end date';
        } else if (convert(assignDate.START_DATE.toString()) > convert(assignDate.END_DATE.toString())) {
            validation['key'] = 'START_DATE';
            validation['validationString'] = 'Start date must be equal to or less than end date';
        }
        return validation;
    }
};
export const convert = function (str) {
   let mnths = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
            Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        },
        date = str.split(' ');

    return new Date([date[3], mnths[date[1]], date[2]].join('-'));
};

export const ERROR_MESSAGE = {
    'ERROR_MESSAGE_HEADING': 'Error',
    'ERROR_MESSAGE_TEXT': 'Something went wrong!',
    'PARTIAL_UPDATE_SUCESS': 'Partial Update Successfully. ',
    'INVALID_LOGIN_DETAIL': 'Invalid email or password'
};
export const ERROR_MESSAGE_REQUIRED = {
    'ERROR_MESSAGE_HEADING': 'Error',
    'ERROR_MESSAGE_TEXT': 'Please fill the Required Fields.',
};

export const DATE_FORMAT = 'MM/dd/yyyy';

export const TIMELINE_TYPE = [
    {
        'TIMELINE_TYPE_KEY': '1',
        'TIMELINE_TYPE_VALUE': 'Estimated',
    }, {
        'TIMELINE_TYPE_KEY': '2',
        'TIMELINE_TYPE_VALUE': 'Confirmed',
    }
];
export const USER_ROLE = ['C-Level'];
export const PROJECT_STATUS_IN_PROGRESS = 'In Progress';
export const STATIC_IMAGE = '../assets/common-images/avatar.png';
export const STAFF_PLAN_LOGO = '../assets/common-images/logo.png';
export const IMAGE_PATH = 'http://';

export const customFieldNames = function (projectColumns, customFields) {
    if (projectColumns !== null && projectColumns !== 'undefined') {
        for (const customName in customFields) {
            if (customName) {
                for (const pc of projectColumns) {
                    if (pc.columnId === customName) {
                        pc.columnLabel = customFields[customName];
                    }
                }
            }
        }
    }
    return projectColumns;
};
export const customFieldLabels = function (columns, customField) {
    if (columns !== null && columns !== 'undefined') {
      for (const customName in customField) {
          if (columns[customName] !== 'undefined') {
              columns[customName] = customField[customName];
        }
      }
    }
    return columns;
};
export const convertToUTC = function(date) {
    return moment.utc(date).format('YYYY-MM-DD');
};

export const convertDateToUTC = function(date) {
    return moment(date).toDate();
};