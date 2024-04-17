const client = require('./client.js');

const createRoutine = async(routineName, routinePublic, routineGoal) => {
  try{
    const { rows: [ newlyCreatedRoutine ] } = await client.query(`
      INSERT INTO routines (name,is_public,goal)
      VALUES ('${routineName}', '${routinePublic}', '${routineGoal}')
      RETURNING *;
    `);
    return newlyCreatedRoutine;
  }catch(err) {
    console.log(err);
  }
}

const getRoutines = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines;
      `);
    return rows;
  }catch(err) {
    console.log(err);
  }
}

const getRoutineById = async(routineId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines WHERE id = $1;
    `, [routineId]);
    return rows
  }catch(err) {
    console.log(err);
  }
}

const deleteRoutine = async(routineId) => {
  try {
    const currentRoutine = getRoutineById(routineId);
    if(!currentRoutine) {
      return null;
    };

    const deletedRoutine = await client.query(`
      DELETE FROM routines WHERE id= $1
      RETURNING *;
    `, [routineId]);
    return deletedRoutine;
  }catch(err) {
    console.log('error getting routine', err);
  }
}
module.exports = {
  createRoutine,
  getRoutines,
  getRoutineById,
  deleteRoutine
}