const general = {
  requestSuccess: 'Request completed successfully.',
  requestFailed: 'Error Occurred, try again later.',
  invalidParams:
    'Invalid params send, please send all required request params.',
  notFound: 'Not found',
  fetchFailed: 'An error occurred while fetching.'
};

const job = {
  jobIdMessing: 'Job id was not passed, Job id is required',
  createFailed: 'An error occurred while creating jobs.',
  updateFailed: 'An error occurred while updating jobs.',
  deleteFailed: 'An error occurred while deleting jobs.',
  fetchFailed: 'An error occurred while fetching.',
  notFound: 'Job not found',
  deleteSuccess: 'Job deleted successfully'
};

const oasis = {
  notFound: 'Plot not found',
  plotQrCodeMissing: 'Plot QR code is missing'
};

const messages = {
  general,
  job,
  oasis
};

export default messages;
