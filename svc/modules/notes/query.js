module.exports = {
  getProjectNotes: (condition) => (
    `
    SELECT 
      PROJECT.PROJECT_NAME,
      PROJECT.PROJECT_ID,
      NOTES.NOTE_ID,
      NOTES.CONTENT,
      NOTES.NODE_PARENT_ID,
      NOTES.IS_PARENT,
      NOTES.UPDATED,
      USERS.FIRST_NAME,
      USERS.MIDDLE_NAME,
      USERS.LAST_NAME,
      (SELECT COUNT(CHILDNOTES.NOTE_ID) FROM NOTES CHILDNOTES WHERE CHILDNOTES.NODE_PARENT_ID = NOTES.NOTE_ID) REPLYCOUNT
    FROM
	    PROJECT
	  INNER JOIN NOTES
		  ON PROJECT.PROJECT_ID = NOTES.PROJECT_ID
	  INNER JOIN USERS
		  ON USERS.USER_ID = NOTES.USER_ID
    WHERE
      ${condition}
    ORDER BY
      NOTES.NOTE_ID DESC
    `
  ),
  insertProjectNotes: (notes) => (
    `
    INSERT INTO NOTES (
      USER_ID,
      CONTENT,
      CREATED,
      UPDATED,
      PROJECT_ID,
      NODE_PARENT_ID,
      IS_PARENT
    ) VALUES (
      ${notes.USER_ID},
      '${notes.CONTENT}',
      NOW(),
      NOW(),
      ${notes.PROJECT_ID},
      ${notes.NODE_PARENT_ID},
      ${notes.IS_PARENT}      
    )
    `
  ),
  updateProjectNotes: (content, noteid) => (
    `
    UPDATE NOTES SET 
      CONTENT = '${content}',
      UPDATED = NOW()
    WHERE
      NOTE_ID = ${noteid}
    `
  ),
  deleteProjectNote: (projectId, noteId) => (
    `
    DELETE FROM NOTES 
    WHERE
      NOTE_ID = ${noteId}
      AND PROJECT_ID = ${projectId}
    `
  )
}