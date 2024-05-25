import { type ValidationChain, body } from 'express-validator';
import jobsColumns from '../utils/constants/databaseSchema/tableColumns/jobsColumns';


/**
 * Function to validate job.
 * This function returns an array of validation chains that ensure
 *
 * @returns {ValidationChain[]} An array of validation chains for job fields.
 */
export const validateJob = (): ValidationChain[] => {
    return [
        body(jobsColumns.title).trim().isString().notEmpty(),
        body(jobsColumns.companyName).trim().isString().notEmpty(),
        body(jobsColumns.location).trim().isString().notEmpty(),
        body(jobsColumns.description).optional().trim().isString(),
        body(jobsColumns.platform).optional().trim().isString(),

        // Salary
        body(`${jobsColumns.salary}.${jobsColumns.min}`).optional().trim().isNumeric(),
        body(`${jobsColumns.salary}.${jobsColumns.max}`).optional().trim().isNumeric(),
        body(`${jobsColumns.salary}.${jobsColumns.period}`).optional().trim().isString(),
        body(`${jobsColumns.salary}.${jobsColumns.currency}`).optional().trim().isString(),

        body(jobsColumns.postedDate).optional().trim().isString(),
        body(jobsColumns.saveDate).optional().trim().isString(),
        body(jobsColumns.appliedDate).optional().trim().isString(),
        body(jobsColumns.followDate).optional().trim().isString(),
    ]
};

export const validateJobStatus = (): ValidationChain[] => {
    return [
        // Status
        body(`${jobsColumns.currentStatus}`).optional().trim().isString(),
        body(`${jobsColumns.reviewJobPositionDetails}`).optional().trim().isBoolean(),
        body(`${jobsColumns.getReferral}`).optional().trim().isBoolean(),
        body(`${jobsColumns.customizeResume}`).optional().trim().isBoolean(),
        body(`${jobsColumns.writeCoverLetter}`).optional().trim().isBoolean(),
        body(`${jobsColumns.identifyHiringManager}`).optional().trim().isBoolean(),
        body(`${jobsColumns.submitApplication}`).optional().trim().isBoolean(),
    ]
}
