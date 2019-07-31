const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getProjectNotes = async (req, res) => {
  try {
    let condition = '';
    if (req.params.noteid) {
      condition = `PROJECT.PROJECT_ID = ${req.params.id} AND NOTES.NODE_PARENT_ID = ${req.params.noteid}`
    } else {
      condition = `PROJECT.PROJECT_ID = ${req.params.id} AND NOTES.IS_PARENT = 1`
    }
    const connection = await db.connection(req);
    const projectNotes = await db.execute(connection, SQL.getProjectNotes(condition));
    util.successResponse(res, projectNotes);
  } catch (exception) {
      util.errorResponse(res,exception);
  }
}

const insertProjectNotes = async (req, res) => {
  try {
      const IS_PARENT = !(req.body.project.parentId);
      const notesToCreate = {
      USER_ID: req.payload.ID,
      CONTENT: req.body.project.content,      
      PROJECT_ID: req.params.id,
      NODE_PARENT_ID: req.body.project.parentId || null,
      IS_PARENT
    };
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertProjectNotes(notesToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const updateProjectNotes = async (req, res) => {
  try {
    const notes = req.body.project;    
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.updateProjectNotes(notes.content, notes.noteId));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const deleteProjectNote = async (req, res) => {
  try {
    const projectId = req.params.id;
    const noteId = req.params.noteid;
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.deleteProjectNote(projectId, noteId));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

module.exports = {
  getProjectNotes,
  insertProjectNotes,
  updateProjectNotes,
  deleteProjectNote
}