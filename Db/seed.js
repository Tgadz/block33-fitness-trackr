const client = require('./client.js');
const { createActivity } = require('./activities.js');
const { createRoutine } = require('./routines.js');
const { createActivities_Routines } = require('./activities_routines.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS activities_routines;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
    `)
  } catch(err) {
    console.log(err);
  }
};

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        description TEXT 
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        is_public BOOLEAN,
        goal TEXT
      );

      CREATE TABLE activities_routines (
        id SERIAL PRIMARY KEY,
        routines_id INT REFERENCES routines(id),
        activities_id INT REFERENCES activities(id),
        count INT
      );
    `)
  }catch(err) {
    console.log(err);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED');

  await dropTables();
  console.log('TABLES DROPPED');

  await createTables();
  console.log('TABLES CREATED');

  const lightWorkout = await createRoutine('Light WorkOut', 'true', 'for inexperienced users to get used to exercise.');
  const medWorkout = await createRoutine('Med WorkOut', 'true', 'for relatively fit people to stay in shape.');
  const heavyWorkout = await createRoutine('Heavy WorkOut', 'true', 'For the relatively fit or fit people to get into serious shape.');
  console.log('ROUTINES CREATED');

  const pushUp = await createActivity('PushUp', 'hands shoulder width apart in planking position while pushing yourself up and down from ground.');
  const sitUp = await createActivity('SitUp', 'lay down with knees up, then bring chest to knees.');
  const squat = await createActivity('Squat', 'stand up straight, then benc knees till thighs are parallel with ground');
  const pullUp = await createActivity('PullUp', 'find bar above head height, pull yourself up on the bar until chin is over.');
   console.log('ACTIVITIES CREATED');
  
  await createActivities_Routines(lightWorkout.id, sitUp.id, 10);
  await createActivities_Routines(lightWorkout.id, squat.id, 10);
  await createActivities_Routines(medWorkout.id, pushUp.id, 15);
  await createActivities_Routines(medWorkout.id, sitUp.id, 15);
  await createActivities_Routines(medWorkout.id, squat.id, 15);
  await createActivities_Routines(heavyWorkout.id, pushUp.id, 25);
  await createActivities_Routines(heavyWorkout.id, sitUp.id, 25);
  await createActivities_Routines(heavyWorkout.id, squat.id, 25);
  await createActivities_Routines(heavyWorkout.id, pullUp.id, 15);
  console.log('ACTIVITIES_ROUTINES CREATED');

  await client.end();
  console.log('DISCONNECTED');
};

syncAndSeed()