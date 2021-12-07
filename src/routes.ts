import { itsWorks } from '@controllers/index'
import { generateAccessToken, verifyAccessToken } from '@controllers/auth'
import {
  createHiringProcessEndpoint,
  delAllHiringProcesses,
  editHiringProcess,
  getAllHiringProcesses
} from '@controllers/hiring-process'

import { importCandidates } from '@controllers/candidate'
import { createEvaluation, editEvaluation, deleteEvaluation, getExerciseById, getAllExercises } from '@controllers/exercise'
import { importExercises } from '@controllers/exercise'

export const defineRoutes = (app) => {
  app.get('/', itsWorks)
  app.post('/login', generateAccessToken)

  app.get('/hiring_process', verifyAccessToken, getAllHiringProcesses)
  app.post('/hiring_process', verifyAccessToken, createHiringProcessEndpoint)
  app.patch('/hiring_process/:id', verifyAccessToken, editHiringProcess)
  app.delete('/hiring_process/:id', verifyAccessToken, delAllHiringProcesses)

  app.post('/candidate/hiring_process/:id', importCandidates)

  app.delete('/exercise/:id', deleteEvaluation)
  app.post('/exercise', createEvaluation)
  app.patch('/exercise/:id', editEvaluation)
  app.get('/exercise/:id', getExerciseById)
  app.get('/exercise', getAllExercises)

  app.post('/exercise/hiring_process/:id', importExercises)
}
