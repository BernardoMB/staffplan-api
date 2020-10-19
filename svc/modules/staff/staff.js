const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");
const staffUtil = require('./util');
const log = require('../../common/logger');
const CONST = require('../../common/const');
const config = require('../../common/config');

const staffAssignments = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffAssignments = await db.execute(connection, SQL.staffAssignments(req.params.id));
    if (staffAssignments && staffAssignments.length) {
      for (let i = 0; i < staffAssignments.length; i++) {
        const assignment = staffAssignments[i];
        if (assignment.STAFF_ID) {
          // Getting Staff Experience
          const experience = await db.execute(connection, SQL.getstaffProjectExperience(assignment.STAFF_ID, assignment.PROJECT_ID));
          staffAssignments[i].experience = experience;
        }
      }
    }
    util.successResponse(res, staffAssignments);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const staffList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    let staffList = await db.execute(connection, SQL.staffList(staffUtil.filters(req)));
    staffList = staffList.map((item) => {
      return {
        ...item,
        STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
      }
    });
    util.successResponse(res, staffList);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const staffListCount = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectList = await db.execute(
      connection,
      SQL.getQueryCount(SQL.staffListCount(staffUtil.filters(req)))
    );
    util.successResponse(res, projectList[0]);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const availabilityByDate = async (req, res) => {
  // todo: get date and filters
  try {
    const connection = await db.connection(req);
    const filters = staffUtil.availabilityFilters(req);
    let startDate = 'CURDATE()';
    let endDate = 'CURDATE()';
    if (req.body.filter && req.body.filter.startDate) {
      startDate = `DATE("${req.body.filter.startDate}")`;
    }
    if (req.body.filter && req.body.filter.endDate) {
      endDate = `DATE("${req.body.filter.endDate}")`;
    }
    const result = await db.execute(connection, SQL.availabilityByDate(startDate, endDate, filters));
    const hash = {};
    result.forEach(e => {
      if (!hash[e.WEEK]) {
        hash[e.WEEK] = {}
      }
      if (!hash[e.WEEK][e.STAFF_ID]) {
        hash[e.WEEK][e.STAFF_ID] = e.ALLOCATION
      } else {
        hash[e.WEEK][e.STAFF_ID] += e.ALLOCATION
      }
    });
    util.successResponse(res, hash);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const assignmentList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffAssignments = await db.execute(connection, SQL.assignmentList(staffUtil.filters(req)));
    util.successResponse(res, staffAssignments);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const assignmentListCount = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectList = await db.execute(connection,
      SQL.getQueryCount(SQL.assignmentListGrouped(staffUtil.filters(req)))
    );
    util.successResponse(res, projectList[0]);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getStaffWorkloadList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    // console.log(SQL.getStaffWorkloadList(staffUtil.filters(req), req.body.startDate, req.body.endDate))
    let workloadList = await db.execute(connection,
      SQL.getStaffWorkloadList(staffUtil.filters(req), req.body.startDate, req.body.endDate));
    workloadList = workloadList.map((item) => {
      return {
        ...item,
        STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
      }
    });
    util.successResponse(res, workloadList);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getStaffWorkload = async (req, res) => {
  try {
    const connection = await db.connection(req);
    let workloadList = await db.execute(connection,
      SQL.getStaffWorkload(req.body.id, req.body.startDate, req.body.endDate));
    workloadList = workloadList.map((item) => {
      return {
        ...item,
        STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
      }
    });
    util.successResponse(res, workloadList);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getStaffWorkloadListCount = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const workloadList = await db.execute(
      connection,
      SQL.getQueryCount(
        SQL.getStaffWorkloadListCount(staffUtil.filters(req), req.body.startDate, req.body.endDate)
      )
    );
    util.successResponse(res, workloadList[0]);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getStaffProjectList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const ProjectList = await db.execute(connection, SQL.getStaffProjectList(req.params.id));
    util.successResponse(res, ProjectList);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const insertStaff = async (req, res) => {
  try {
    const staffDefault = {
      FIRST_NAME: '',
      MIDDLE_INITIAL: '',
      LAST_NAME: '',
      PREFERRED_NAME: '',
      EMAIL_ID: '',
      PHONE_1: '',
      PHONE_1_TYPE: '',
      PHONE_2: '',
      PHONE_2_TYPE: '',
      HOME_CITY: '',
      HOME_STATE: '',
      HOME_ZIP: '',
      STAFF_ROLE_ID: null,
      STAFF_GROUP_ID: null,
      STAFF_STATUS_ID: null,
      OFFICE_ID: null,
      EMPLOYMENT_START_DATE: null,
      PREFERENCES: '',
      CANRELOCATE: 0,
      CANCOMMUTE: 0
    };
    const staffInfo = req.body;
    const staffToCreate = Object.assign(staffDefault, util.cleanObject(staffInfo));
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertStaff(staffToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const updateStaff = async (req, res) => {
  try {
    const staff = req.body;
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getStaffInfoByID(req.params.id));
    let detailsToUpdate = {};
    if (result && result.length > 0) {
      detailsToUpdate = result[0];
    }
    const staffToUpdate = Object.assign(detailsToUpdate, staff);
    const rowsAffected = await db.execute(connection, SQL.updateStaff(req.params.id, staffToUpdate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getStaffCertification = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffCertification = await db.execute(connection, SQL.getStaffCertificationById(req.params.id));
    util.successResponse(res, staffCertification);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const insertStaffCertification = async (req, res) => {
  try {
    const STAFF_ID = req.params.id;
    const CERTIFICATION_ID = req.body.key;
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertStaffCertification(STAFF_ID, CERTIFICATION_ID));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const deleteStaffCertification = async (req, res) => {
  try {
    const STAFF_ID = req.params.id;
    const CERTIFICATION_ID = req.params.key;
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.deleteStaffCertification(STAFF_ID, CERTIFICATION_ID));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getStaffExperience = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffExperience = await db.execute(connection, SQL.getstaffExperienceById(req.params.id));
    util.successResponse(res, staffExperience);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const insertStaffExperience = async (req, res) => {
  try {
    const ExperienceToCreate = {
      EXPERIENCE_ID: req.body.experienceId,
      STAFF_ID: req.params.id,
      PROJECT_ID: req.body.projectId
    };
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertStaffExperience(ExperienceToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const removeStaffExperience = async (req, res) => {
  try {
    const ExperienceToDelete = {
      EXPERIENCE_ID: req.body.experienceId,
      STAFF_ID: req.params.id,
      PROJECT_ID: req.body.projectId
    };
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.removeStaffExperience(ExperienceToDelete));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getStaffDetailsById = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getStaffDetailsById(req.params.id));
    let staffDetails = {};
    if (result && result.length) {
      staffDetails = result[0];
      staffDetails.STAFF_PHOTO = util.getThumbnailUrl(staffDetails.STAFF_PHOTO);
    }
    util.successResponse(res, staffDetails);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const staffSearch = async (req, res) => {
  try {
    const connection = await db.connection(req);
    let condition = '';
    if (req.query && req.query.name) {
      condition = ` WHERE FIRST_NAME LIKE '%${req.query.name}%' OR PREFERRED_NAME LIKE '%${req.query.name}%'`;
    }
    // List staff based on user office access
    if (util.officeAccessRestricted(req.payload.ROLE)) {
      condition = `${condition} AND STAFF.OFFICE_ID IN (SELECT OFFICE_ID FROM USER_ACCESS WHERE USER_ID = ${req.payload.ID})`;
    }
    const result = await db.execute(connection, SQL.staffSearch(condition));
    let staffList = [];
    if (result && result.length > 0) {
      staffList = result.map((item) => {
        return {
          ...item,
          STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
        }
      });
    }
    util.successResponse(res, staffList);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const staffAdvanceSearch = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const condition = staffUtil.searchFilter(req);
    let orderBy = '';
    if (req.body.sortByRole) {
      orderBy = 'ORDER BY STAFF_ROLE.ROLE_NAME, STAFF.FIRST_NAME';
    } else {
      orderBy = 'ORDER BY STAFF.FIRST_NAME';
    }
    const result = await db.execute(connection, SQL.staffSearch(condition, orderBy));
    let staffList = [];
    if (result && result.length > 0) {
      staffList = result.map((item) => {
        return {
          ...item,
          STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
        }
      });
    }
    util.successResponse(res, staffList);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getStaffAllocation = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffProject = await db.execute(connection, SQL.getStaffProject(req.params.id));
    if (staffProject && staffProject.length) {
      for (let i = 0; i < staffProject.length; i++) {
        const project = staffProject[i];
        const calendar = await db.execute(connection, SQL.staffAllocationList(project.ID));
        staffProject[i].calendar = calendar;
      }
    }
    util.successResponse(res, staffProject);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const uploadImage = async (buffer, fileName) => {
  const aws = require('aws-sdk');
  aws.config.update({
    accessKeyId: config.AWS.accessKeyId,
    secretAccessKey: config.AWS.secretAccessKey,
    region: config.AWS.region
  });
  const s3 = new aws.S3();
  return s3.upload({
    Bucket: config.AWS.bucket,
    Key: fileName,
    Body: buffer,
    ACL: 'public-read'
  }).promise();
}

const insertStaffPhoto = async (req, res) => {
  try {
    const connection = await db.connection(req);
    // Get Staff ID and check is staff already have photo key
    const staffId = req.params.id;
    let key = '';
    const result = await db.execute(connection, SQL.getStaffPhoto(staffId));
    if (result && result.length > 0 && result[0].STAFF_PHOTO.length > 3) {
      key = result[0].STAFF_PHOTO;
    } else {
      // Generate new key if staff doesn't have
      const uuidv4 = require('uuid/v4');
      key = uuidv4();
      await db.execute(connection, SQL.insertStaffPhoto(staffId, key));
    }

    // Use sharp to get meta data and set file info
    const sharp = require('sharp');
    const orginalUrl = await uploadImage(req.file.buffer, `${key}/${CONST.ORGINAL}.${CONST.IMGEXTN}`);
    const buffer = await sharp(req.file.buffer).resize(80, 80).toBuffer();
    const thumbnailUrl = await uploadImage(buffer, `${key}/${CONST.THUMBNAIL}.${CONST.IMGEXTN}`);
    util.successResponse(res, { orginalUrl, thumbnailUrl, key });
  } catch (exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

const getStaffPhoto = async (req, res) => {
  try {
    const connection = await db.connection(req);
    // Get Staff ID and check is staff already have photo key
    const staffId = req.params.id;
    let key = '';
    const result = await db.execute(connection, SQL.getStaffPhoto(staffId));
    if (result && result.length > 0 && result[0].STAFF_PHOTO.length > 3) {
      key = result[0].STAFF_PHOTO;
      util.successResponse(res, util.getThumbnailUrl(key));
    } else {
      util.errorResponse(res, "Photo doesnot exists");
    }
  } catch (exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

const filters = (req) => {
  const filter = req.body.filter;
  let filterCondition = ' where 1 = 1 ';
  if (req.params.id) {
    filterCondition = `${filterCondition} AND PROJECT.PROJECT_ID = ${req.params.id}`;
  }
  if (filter) {
    if (filter.status) {
      filterCondition = `${filterCondition} AND PROJECT_STATUS.STATUS_ID IN (${filter.status.join(
        ','
      )})`;
    }

    if (filter.role) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_ROLE_ID IN (${filter.role.join(',')})`;
    }

    if (filter.group) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_GROUP_ID IN (${filter.group.join(',')})`;
    }

    if (filter.startBetween && filter.endBetween) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE BETWEEN '${filter.startBetween}' AND '${filter.endBetween}'`;
    }

    if (filter.StartIn) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE >= NOW() and PROJECT.START_DATE <=  DATE_ADD(NOW(), INTERVAL 90 DAY)`;
    }

    if (filter.EndIn) {
      filterCondition = `${filterCondition} AND PROJECT.END_DATE >= NOW() and PROJECT.END_DATE <=  DATE_ADD(NOW(), INTERVAL 90 DAY)`;
    }

    if (filter.startDate) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE >= '${filter.startDate}'`;
    }

    if (filter.endDate) {
      filterCondition = `${filterCondition} AND PROJECT.END_DATE >= '${filter.endDate}'`;
    }

    if (filter.office) {
      filterCondition = `${filterCondition} AND PROJECT.OFFICE_ID = ${filter.office}`;
    }

    if (filter.projectId) {
      filterCondition = `${filterCondition} AND PROJECT.PROJECT_ID = ${filter.projectId}`;
    }

    if (filter.ProjectGroup) {
      filterCondition = `${filterCondition} AND PROJECT.GROUP_ID = ${filter.ProjectGroup}`;
    }

    if (filter.OpenRoles) {
      filterCondition = `${filterCondition} AND (SELECT COUNT(ID) FROM
      PLANNED_PROJECT_STAFF WHERE
        PLANNED_PROJECT_STAFF.PROJECT_ID = PROJECT.PROJECT_ID) > 0`;
    }
  }
  // List project based on user office access
  if (util.officeAccessRestricted(req.payload.ROLE)) {
    filterCondition = `${filterCondition} AND PROJECT.OFFICE_ID IN (SELECT OFFICE_ID FROM USER_ACCESS WHERE USER_ID = ${req.payload.ID})`;
  }
  return filterCondition;
};

//#region Staff group CRUD

const getStaffGroupList = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffGroupList = await db.execute(
          connection,
          SQL.StaffGroupList(filters(req))
      );
      util.successResponse(res, staffGroupList);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getStaffGroupListCount = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffGroupList = await db.execute(
          connection,
          SQL.getStaffGroupQueryCount(SQL.StaffGroupList(filters(req)))
      );
      util.successResponse(res, staffGroupList[0]);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getStaffGroupDetailById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffGroupDetail = await db.execute(
          connection,
          SQL.staffGroupDetailsById(req.params.id)
      );
      util.successResponse(res, staffGroupDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const insertStaffGroupDetail = async (req, res) => {
  try {
      const staffGroupDefault = {
          GROUP_NAME: '',
      };
      const staffGroupDetails = req.body;
      const connection = await db.connection(req);
      const staffGroupToCreate = Object.assign(
          staffGroupDefault,
          util.cleanObject(staffGroupDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.insertStaffGroupDetail(staffGroupToCreate)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const updateStaffGroupDetail = async (req, res) => {
  try {
      const staffGroupDetails = req.body;
      const connection = await db.connection(req);
      const result = await db.execute(
          connection,
          SQL.staffGroupDetailsById(req.params.id)
      );
      let detailsToUpdate = {};
      if (result && result.length > 0) {
          detailsToUpdate = result[0];
      }
      const staffGroupToUpdate = Object.assign(
          detailsToUpdate,
          util.cleanObject(staffGroupDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.updateStaffGroupDetail(staffGroupToUpdate, req.params.id)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const deleteStaffGroupById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffGroupDetail = await db.execute(
          connection,
          SQL.removeStaffGroup(req.params.id)
      );
      util.successResponse(res, staffGroupDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

//#endregion

//#region Staff role CRUD

const getStaffRoleList = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffRoleList = await db.execute(
          connection,
          SQL.StaffRoleList(filters(req))
      );
      util.successResponse(res, staffRoleList);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getStaffRoleListCount = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffRoleList = await db.execute(
          connection,
          SQL.getStaffRoleQueryCount(SQL.StaffRoleList(filters(req)))
      );
      util.successResponse(res, staffRoleList[0]);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getStaffRoleDetailById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffRoleDetail = await db.execute(
          connection,
          SQL.staffRoleDetailsById(req.params.id)
      );
      util.successResponse(res, staffRoleDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const insertStaffRoleDetail = async (req, res) => {
  try {
      const staffRoleDefault = {
          ROLE_NAME: '',
      };
      const staffRoleDetails = req.body;
      const connection = await db.connection(req);
      const staffRoleToCreate = Object.assign(
          staffRoleDefault,
          util.cleanObject(staffRoleDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.insertStaffRoleDetail(staffRoleToCreate)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const updateStaffRoleDetail = async (req, res) => {
  try {
      const staffRoleDetails = req.body;
      const connection = await db.connection(req);
      const result = await db.execute(
          connection,
          SQL.staffRoleDetailsById(req.params.id)
      );
      let detailsToUpdate = {};
      if (result && result.length > 0) {
          detailsToUpdate = result[0];
      }
      const staffRoleToUpdate = Object.assign(
          detailsToUpdate,
          util.cleanObject(staffRoleDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.updateStaffRoleDetail(staffRoleToUpdate, req.params.id)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const deleteStaffRoleById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffRoleDetail = await db.execute(
          connection,
          SQL.removeStaffRole(req.params.id)
      );
      util.successResponse(res, staffRoleDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

//#endregion

//#region Staff certification CRUD

const getStaffCertificationList = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffCertificationList = await db.execute(
          connection,
          SQL.StaffCertificationList(filters(req))
      );
      util.successResponse(res, staffCertificationList);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getStaffCertificationListCount = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffCertificationList = await db.execute(
          connection,
          SQL.getStaffCertificationQueryCount(SQL.StaffCertificationList(filters(req)))
      );
      util.successResponse(res, staffCertificationList[0]);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getStaffCertificationDetailById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffCertificationDetail = await db.execute(
          connection,
          SQL.staffCertificationDetailsById(req.params.id)
      );
      util.successResponse(res, staffCertificationDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const insertStaffCertificationDetail = async (req, res) => {
  try {
      const staffCertificationDefault = {
          CERTIFICATION_NAME: '',
      };
      const staffCertificationDetails = req.body;
      const connection = await db.connection(req);
      const staffCertificationToCreate = Object.assign(
          staffCertificationDefault,
          util.cleanObject(staffCertificationDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.insertStaffCertificationDetail(staffCertificationToCreate)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const updateStaffCertificationDetail = async (req, res) => {
  try {
      const staffCertificationDetails = req.body;
      const connection = await db.connection(req);
      const result = await db.execute(
          connection,
          SQL.staffCertificationDetailsById(req.params.id)
      );
      let detailsToUpdate = {};
      if (result && result.length > 0) {
          detailsToUpdate = result[0];
      }
      const staffCertificationToUpdate = Object.assign(
          detailsToUpdate,
          util.cleanObject(staffCertificationDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.updateStaffCertificationDetail(staffCertificationToUpdate, req.params.id)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const deleteStaffCertificationById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffCertificationDetail = await db.execute(
          connection,
          SQL.removeStaffCertification(req.params.id)
      );
      util.successResponse(res, staffCertificationDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

//#endregion

//#region Staff experience CRUD

const getStaffExperienceList = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffExperienceList = await db.execute(
          connection,
          SQL.StaffExperienceList(filters(req))
      );
      util.successResponse(res, staffExperienceList);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getStaffExperienceListCount = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffExperienceList = await db.execute(
          connection,
          SQL.getStaffExperienceQueryCount(SQL.StaffExperienceList(filters(req)))
      );
      util.successResponse(res, staffExperienceList[0]);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getStaffExperienceDetailById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffExperienceDetail = await db.execute(
          connection,
          SQL.staffExperienceDetailsById(req.params.id)
      );
      util.successResponse(res, staffExperienceDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const insertStaffExperienceDetail = async (req, res) => {
  try {
      const staffExperienceDefault = {
          EXPERIENCE_LABEL: '',
      };
      const staffExperienceDetails = req.body;
      const connection = await db.connection(req);
      const staffExperienceToCreate = Object.assign(
          staffExperienceDefault,
          util.cleanObject(staffExperienceDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.insertStaffExperienceDetail(staffExperienceToCreate)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const updateStaffExperienceDetail = async (req, res) => {
  try {
      const staffExperienceDetails = req.body;
      const connection = await db.connection(req);
      const result = await db.execute(
          connection,
          SQL.staffExperienceDetailsById(req.params.id)
      );
      let detailsToUpdate = {};
      if (result && result.length > 0) {
          detailsToUpdate = result[0];
      }
      const staffExperienceToUpdate = Object.assign(
          detailsToUpdate,
          util.cleanObject(staffExperienceDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.updateStaffExperienceDetail(staffExperienceToUpdate, req.params.id)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const deleteStaffExperienceById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const staffExperienceDetail = await db.execute(
          connection,
          SQL.removeStaffExperience2(req.params.id)
      );
      util.successResponse(res, staffExperienceDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

//#endregion

module.exports = {
  staffAssignments,
  getStaffProjectList,
  staffList,
  staffListCount,
  assignmentList,
  assignmentListCount,
  insertStaff,
  updateStaff,
  getStaffCertification,
  insertStaffCertification,
  deleteStaffCertification,
  getStaffExperience,
  insertStaffExperience,
  removeStaffExperience,
  getStaffDetailsById,
  staffSearch,
  staffAdvanceSearch,
  getStaffAllocation,
  insertStaffPhoto,
  getStaffPhoto,
  availabilityByDate,
  getStaffWorkloadList,
  getStaffWorkload,
  getStaffWorkloadListCount,

  getStaffGroupList,
  getStaffGroupListCount,
  getStaffGroupDetailById,
  insertStaffGroupDetail,
  updateStaffGroupDetail,
  deleteStaffGroupById,

  getStaffRoleList,
  getStaffRoleListCount,
  getStaffRoleDetailById,
  insertStaffRoleDetail,
  updateStaffRoleDetail,
  deleteStaffRoleById,

  getStaffCertificationList,
  getStaffCertificationListCount,
  getStaffCertificationDetailById,
  insertStaffCertificationDetail,
  updateStaffCertificationDetail,
  deleteStaffCertificationById,

  getStaffExperienceList,
  getStaffExperienceListCount,
  getStaffExperienceDetailById,
  insertStaffExperienceDetail,
  updateStaffExperienceDetail,
  deleteStaffExperienceById,
}
