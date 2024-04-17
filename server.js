const express = require('express');
const app = express();
const { getRoutines, createRoutine, getRoutineById, deleteRoutine } = require('./Db/routines.js');
const { createActivity, getActivitities, getActivityById, deleteActivity } = require('./Db/activities.js');
const { createActivities_Routines } = require('./Db/activities_routines.js');

app.use(express.json());

const client = require('./Db/client.js');
client.connect();

app.get('/api/v1/activities', async(req, res, next) => {
  try {
    const allActivities = await getActivitities();

    res.send(allActivities) 
  }catch(err) {
    next(err);
  }
});

app.get('/api/v1/routines', async(req, res, next) => {
  try {
    const allRoutines = await getRoutines();

    res.send(allRoutines)
  }catch(err) {
    next(err);
  }
});

app.get('/api/v1/activities/:activityId', async(req, res, next) => {
  const { activityId } = req.params;
  try {
    const activity = await getActivityById(activityId);

    res.send(activity);
  }catch(err) {
    next(err);
  }
});

app.get('/api/v1/routines/:routineId', async(req, res, next) => {
  const { routineId } = req.params;
  try {
    const routine = await getRoutineById(routineId);

    res.send(routine);
  }catch(err) {
    next(err);
  }
})

app.post('/api/v1/activities', async(req, res, next) => {
  const { name, description } = req.body;

  try {
    const newlyCreatedActivity = await createActivity(name, description);
    res.send(newlyCreatedActivity);
  }catch(err) {
    next(err);
  }
});

app.post('/api/v1/routines', async(req, res, next) => {
  const { name, is_public, goal } = req.body;

  try {
    const newlyCreatedRoutine = await createRoutine(name, is_public, goal);
    res.send(newlyCreatedRoutine);
  }catch(err) {
    next(err);
  }
});

app.post('/api/v1/activities_routines', async(req, res, next) => {
  const { routines_id, activities_id, count } = req.body;

  try {
    const newlyCreatedActivities_Routines = await createActivities_Routines(routines_id, activities_id, count);
    res.send(newlyCreatedActivities_Routines);
  }catch(err) {
    next(err);
  }
});

app.delete('/api/v1/activities/:activityId', async(req, res, next) => {
  const { activityId } = req.params;

  try {
    const deletedActivity = await deleteActivity(activityId);
    res.send(deletedActivity);
  }catch(err) {
    next(err);
  }
});

app.delete('/api/v1/routines/:routineId', async(req, res, next) => {
  const { routineId } = req.params;

  try {
    const deletedRoutine = await deleteRoutine(routineId);
    res.send(deletedRoutine);
  }catch(err) {
    next(err);
  }
});


app.listen(3000, () => console.log('listening on port 3000'));