const notes = require('./notes');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'project';
module.exports = (app) => {
  app.get(`/${CONST.API}/${MODULE}/:id/notes`, authenticate.isAuthenticated, notes.getProjectNotes);
  app.put(`/${CONST.API}/${MODULE}/:id/notes`, authenticate.isAuthenticated, notes.insertProjectNotes);
  app.post(`/${CONST.API}/${MODULE}/:id/notes`, authenticate.isAuthenticated, notes.updateProjectNotes);
  app.delete(`/${CONST.API}/${MODULE}/:id/notes/:noteid`, authenticate.isAuthenticated, notes.deleteProjectNote);
  app.get(`/${CONST.API}/${MODULE}/:id/notes/:noteid`, authenticate.isAuthenticated, notes.getProjectNotes);
}