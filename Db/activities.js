const client = require('./client.js');

const createActivity = async(activityName, activityDescription) => {
  try{
    const { rows: [ newlyCreatedActivity ] } = await client.query(`
      INSERT INTO activities (name,description)
      VALUES ('${activityName}', '${activityDescription}')
      RETURNING *;
      `);
      return newlyCreatedActivity;
  } catch(err) {
    console.log(err);
  }
}

const getActivitities = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities;
      `);
    return rows;
  } catch(err) {
    console.log(err);
  }
}

const getActivityById = async(activityId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities WHERE id = $1;
    `, [activityId]);
    return rows
  }catch(err) {
    console.log(err);
  }
};

const deleteActivity = async(activityId) => {
  try {
    const currentActivity = await getActivityById(activityId);
    if (!currentActivity) {
      return null;
    }

    const deletedActivity = await client.query(`
      DELETE FROM activities WHERE id = $1
      RETURNING *;
    `, [activityId]);
    return deletedActivity
  }catch(err) {
    console.log('error deleting activity', err);
  }
}

module.exports = {
  createActivity,
  getActivitities,
  getActivityById,
  deleteActivity
}