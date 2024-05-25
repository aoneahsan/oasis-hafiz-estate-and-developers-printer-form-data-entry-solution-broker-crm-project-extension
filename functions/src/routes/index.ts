import * as express from 'express';
import {
  jobStore,
  jobIndex,
  jobShow,
  jobUpdate,
  jobDelete,
  jobStatusUpdate
} from '../controllers/jobs';
import { validateJob, validateJobStatus } from '../validations/jobs.validate';
import { getOasisPlotDetails } from '../controllers/oasis';

const router = express.Router();

// #region Jobs
router.get('/jobs', jobIndex);
router.post('/jobs', validateJob(), jobStore);
router.get('/jobs/:jobId', jobShow);
router.put('/jobs/:jobId', jobUpdate);
router.put('/jobs/status/:jobId', validateJobStatus(), jobStatusUpdate);
router.delete('/jobs/:jobId', jobDelete);

router.post('/zaions/oasis/get-plot-details', getOasisPlotDetails);

// #endregion

export default router;
