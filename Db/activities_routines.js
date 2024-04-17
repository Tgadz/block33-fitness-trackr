const client = require('./client.js');

const createActivities_Routines = async(routine_id, activity_id, count) => {
  try {
    await client.query(`
      INSERT INTO activities_routines (routines_id,activities_id,count)
      VALUES ('${routine_id}', '${activity_id}', '${count}');
    `)
  }catch(err) {
    console.log(err);
  }
}

module.exports ={
  createActivities_Routines
}