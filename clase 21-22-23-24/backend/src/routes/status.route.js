/* Logica del /api/status */

import express from 'express'
import { postPingController } from '../controllers/status.controller.js'
import testMiddleware from '../middlewares/test.middleware.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const statusRouter = express.Router()


statusRouter.post('/ping',authMiddleware, testMiddleware, postPingController)


export default statusRouter