import * as express from 'express';

import { getOasisPlotDetails } from '../controllers/oasis';

const router = express.Router();

router.post('/zaions/oasis/get-plot-details', getOasisPlotDetails);

// #endregion

export default router;
