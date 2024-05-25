// #region Packages
import { type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
// #endregion

// #region Customs
import { fbDB } from '../../config/firebase';
import ZTableNames from '../../utils/constants/databaseSchema/tableNames';
import { ZJobStatusEnum, jobInterface } from '../../types/job';
import {
	sendBackFailedResponse,
	sendBackNotFoundResponse,
	sendBackSuccessResponse,
} from '../../utils/helpers';
import jobsColumns from '../../utils/constants/databaseSchema/tableColumns/jobsColumns';
import messages from '../../utils/constants/messages';
import { Timestamp } from 'firebase-admin/firestore';
// #endregion

/**
 * Get all jobs from the database
 */
export const jobIndex = async (req: Request, res: Response) => {
	try {
		const jobs = await fbDB
			.collection(ZTableNames.jobs)
			// .where(jobsColumns.deletedAt, '==', null)
			.get();

		const formattedJobs: jobInterface[] = [];

		jobs?.forEach((doc) => {
			formattedJobs.push({ id: doc.id, ...(doc.data() as jobInterface) });
		});

		return sendBackSuccessResponse(res, {
			items: formattedJobs,
			jobs,
		});
	} catch (error) {
		if (error instanceof Error) {
			return sendBackFailedResponse(res, {
				messages: error.message,
			});
		}
		return sendBackFailedResponse(res, {
			messages: messages.job.fetchFailed,
		});
	}
};

/**
 * Create jobs
 */
export const jobStore = async (req: Request, res: Response) => {
	try {
		const validate = validationResult(req);

		if (validate.isEmpty()) {
			const _reqBody = req.body as jobInterface;

			// const _jobRes = await fbDB.collection(ZTableNames.jobs).add({ ..._data });
			const _jobRes = fbDB.collection(ZTableNames.jobs).doc();

			const _data = {
				[jobsColumns.title]: _reqBody[jobsColumns.title] ?? null,
				[jobsColumns.urlForOriginalPosting]:
					_reqBody[jobsColumns.urlForOriginalPosting] ?? null,
				[jobsColumns.companyName]: _reqBody[jobsColumns.companyName] ?? null,
				[jobsColumns.description]: _reqBody[jobsColumns.description] ?? null,
				[jobsColumns.platform]: _reqBody[jobsColumns.platform] ?? null,
				[jobsColumns.location]: _reqBody[jobsColumns.location] ?? null,
				[jobsColumns.salary]: _reqBody[jobsColumns.salary] ?? null,
				[jobsColumns.status]: {
					[jobsColumns.currentStatus]:
						_reqBody?.status?.currentStatus ?? ZJobStatusEnum.bookmarked,
					[jobsColumns.booked]: {
						[jobsColumns.reviewJobPositionDetails]: false,
					},
					[jobsColumns.applying]: {
						[jobsColumns.getReferral]: false,

						[jobsColumns.customizeResume]: false,

						[jobsColumns.writeCoverLetter]: false,

						[jobsColumns.identifyHiringManager]: false,

						[jobsColumns.submitApplication]: false,
					},
				},
				[jobsColumns.postedDate]: _reqBody[jobsColumns.postedDate] ?? null,
				[jobsColumns.saveDate]: _reqBody[jobsColumns.saveDate] ?? null,
				[jobsColumns.appliedDate]: _reqBody[jobsColumns.appliedDate] ?? null,
				[jobsColumns.followDate]: _reqBody[jobsColumns.followDate] ?? null,
				// [jobsColumns.createdAt]: new Timestamp(new Date().getTime(), 0),
				// [jobsColumns.updatedAt]: new Timestamp(new Date().getTime(), 0),
				[jobsColumns.deletedAt]: null,
			};

			await _jobRes.set({ ..._data });

			const _getJob = await _jobRes.get();

			if (_getJob.exists) {
				return sendBackSuccessResponse(res, {
					item: { id: _getJob.id, ..._getJob.data() },
				});
			} else {
				return sendBackNotFoundResponse(res, {
					message: messages.job.notFound,
				});
			}
		} else {
			return sendBackFailedResponse(res, { errors: validate.array() });
		}
	} catch (error) {
		if (error instanceof Error) {
			return sendBackFailedResponse(res, {
				messages: error.message,
			});
		}
		return sendBackFailedResponse(res, {
			messages: messages.job.createFailed,
		});
	}
};

/**
 * Get single job
 */
export const jobShow = async (req: Request, res: Response) => {
	try {
		const _jobId = req.params.jobId;
		if (_jobId?.trim()?.length > 0) {
			const _job = await fbDB.collection(ZTableNames.jobs).doc(_jobId).get();

			if (_job.exists) {
				return sendBackSuccessResponse(res, {
					item: { id: _job.id, ..._job.data() },
				});
			} else {
				return sendBackNotFoundResponse(res, {
					message: messages.job.notFound,
				});
			}
		} else {
			return sendBackFailedResponse(res, {
				messages: messages.job.jobIdMessing,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			return sendBackFailedResponse(res, {
				messages: error.message,
			});
		}
		return sendBackFailedResponse(res, {
			messages: messages.job.fetchFailed,
		});
	}
};

/**
 * Update single job
 */
export const jobUpdate = async (req: Request, res: Response) => {
	try {
		const _jobId = req.params.jobId;

		if (_jobId?.trim()?.length > 0) {
			const _job = fbDB.collection(ZTableNames.jobs).doc(_jobId);

			const _jobData = await _job.get();

			if (_jobData.exists) {
				const oldData = _jobData.data() ?? {};
				const _reqData = req.body as jobInterface;

				const _updateData = {
					[jobsColumns.title]:
						_reqData[jobsColumns.title] ?? oldData[jobsColumns.title] ?? null,
					[jobsColumns.urlForOriginalPosting]:
						_reqData[jobsColumns.urlForOriginalPosting] ??
						oldData[jobsColumns.urlForOriginalPosting] ??
						null,
					[jobsColumns.companyName]:
						_reqData[jobsColumns.companyName] ??
						oldData[jobsColumns.companyName] ??
						null,
					[jobsColumns.description]:
						_reqData[jobsColumns.description] ??
						oldData[jobsColumns.description] ??
						null,
					[jobsColumns.platform]:
						_reqData[jobsColumns.platform] ??
						oldData[jobsColumns.platform] ??
						null,
					[jobsColumns.location]:
						_reqData[jobsColumns.location] ??
						oldData[jobsColumns.location] ??
						null,
					[jobsColumns.salary]:
						_reqData[jobsColumns.salary] ?? oldData[jobsColumns.salary] ?? null,
					[jobsColumns.postedDate]:
						_reqData[jobsColumns.postedDate] ??
						oldData[jobsColumns.postedDate] ??
						null,
					[jobsColumns.saveDate]:
						_reqData[jobsColumns.saveDate] ??
						oldData[jobsColumns.saveDate] ??
						null,
					[jobsColumns.appliedDate]:
						_reqData[jobsColumns.appliedDate] ??
						oldData[jobsColumns.appliedDate] ??
						null,
					[jobsColumns.followDate]:
						_reqData[jobsColumns.followDate] ??
						oldData[jobsColumns.followDate] ??
						null,
					[jobsColumns.updatedAt]: new Timestamp(new Date().getTime(), 0),
				};

				await _job.set({ ..._updateData });

				const _updatedJobData = await _job.get();

				return sendBackSuccessResponse(res, {
					item: { id: _updatedJobData.id, ..._updatedJobData.data() },
				});
			} else {
				return sendBackNotFoundResponse(res, {
					message: messages.job.notFound,
				});
			}
		} else {
			return sendBackFailedResponse(res, {
				messages: messages.job.jobIdMessing,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			return sendBackFailedResponse(res, {
				messages: error.message,
			});
		}
		return sendBackFailedResponse(res, {
			messages: messages.job.updateFailed,
		});
	}
};

/**
 * Update single job statue
 */
export const jobStatusUpdate = async (req: Request, res: Response) => {
	try {
		const _jobId = req.params.jobId;

		if (_jobId?.trim()?.length > 0) {
			const _jobRef = fbDB.collection(ZTableNames.jobs).doc(_jobId);

			const _jobData = await _jobRef.get();

			if (_jobData.exists) {
				const oldData = (_jobData.data() ?? {}) as jobInterface;
				const _reqData = req.body;

				const _statusUpdateData: Partial<jobInterface> = {
					[jobsColumns.status]: {
						[jobsColumns.currentStatus]:
							_reqData[jobsColumns.currentStatus] ??
							`${oldData}.${jobsColumns.status}.${jobsColumns.currentStatus}` ??
							null,
						[jobsColumns.booked]: {
							[jobsColumns.reviewJobPositionDetails]:
								_reqData.reviewJobPositionDetails ??
								oldData?.status?.booked?.reviewJobPositionDetails ??
								false,
						},
						[jobsColumns.applying]: {
							[jobsColumns.getReferral]:
								_reqData.getReferral ??
								oldData?.status?.applying?.getReferral ??
								false,

							[jobsColumns.customizeResume]:
								_reqData.customizeResume ??
								oldData?.status?.applying?.customizeResume ??
								false,

							[jobsColumns.writeCoverLetter]:
								_reqData.writeCoverLetter ??
								oldData?.status?.applying?.writeCoverLetter ??
								false,

							[jobsColumns.identifyHiringManager]:
								_reqData.identifyHiringManager ??
								oldData?.status?.applying?.identifyHiringManager ??
								false,

							[jobsColumns.submitApplication]:
								_reqData.submitApplication ??
								oldData?.status?.applying?.submitApplication ??
								false,
						},
					},
				};

				const _updatedData: jobInterface = { ...oldData, ..._statusUpdateData };

				// TODO: need to confirm that the write operation was a success
				await _jobRef.set(_updatedData);

				const _updatedJobData = await _jobRef.get();

				return sendBackSuccessResponse(res, {
					item: { id: _updatedJobData.id, ..._updatedJobData.data() },
					_reqData,
				});
			} else {
				return sendBackNotFoundResponse(res, {
					message: messages.job.notFound,
				});
			}
		} else {
			return sendBackFailedResponse(res, {
				messages: messages.job.jobIdMessing,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			return sendBackFailedResponse(res, {
				messages: error.message,
			});
		}
		return sendBackFailedResponse(res, {
			messages: messages.job.updateFailed,
		});
	}
};

/**
 * Delete single job
 */
export const jobDelete = async (req: Request, res: Response) => {
	try {
		const _jobId = req.params.jobId;

		if (_jobId?.trim()?.length > 0) {
			const _job = fbDB.collection(ZTableNames.jobs).doc(_jobId);

			const _jobData = await _job.get();

			if (_jobData.exists) {
				// don't delete the item from the database // but for development and until we does'nt found the data solution.
				await _job.delete();

				// await _job.set({ updatedAt: new Timestamp(new Date().getTime(), 0), deletedAt: new Timestamp(new Date().getTime(), 0) });

				return sendBackSuccessResponse(res, {
					message: messages.job.deleteSuccess,
				});
			} else {
				return sendBackNotFoundResponse(res, {
					message: messages.job.notFound,
				});
			}
		} else {
			return sendBackFailedResponse(res, {
				messages: messages.job.jobIdMessing,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			return sendBackFailedResponse(res, {
				messages: error.message,
			});
		}
		return sendBackFailedResponse(res, {
			messages: messages.job.deleteFailed,
		});
	}
};
