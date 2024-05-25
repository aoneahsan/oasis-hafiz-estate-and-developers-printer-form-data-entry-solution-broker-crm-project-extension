import jobsColumns from "../../utils/constants/databaseSchema/tableColumns/jobsColumns";

// #region Enums
export enum ZJobStatusEnum {
    bookmarked = 'bookmarked',
    applying = 'applying',
    applied = 'applied',
    interviewing = 'interviewing',
    negotiating = 'negotiating',
    accepted = 'accepted',
}
// #endregion

// #region Interfaces
export interface jobSalaryInterface {
    [jobsColumns.min]: number;
    [jobsColumns.max]: number;
    [jobsColumns.currency]: string;
    [jobsColumns.period]: string;
}

export interface jobStatusInterface {
    [jobsColumns.currentStatus]: string | null;
    [jobsColumns.booked]: {
        [jobsColumns.reviewJobPositionDetails]: boolean;
    };
    [jobsColumns.applying]: {
        [jobsColumns.getReferral]: boolean;
        [jobsColumns.customizeResume]: boolean;
        [jobsColumns.writeCoverLetter]: boolean;
        [jobsColumns.identifyHiringManager]: boolean;
        [jobsColumns.submitApplication]: boolean;
    }
}
export interface jobInterface {
    id?: string;
    [jobsColumns.title]: string;
    [jobsColumns.urlForOriginalPosting]: string;
    [jobsColumns.companyName]: string;
    [jobsColumns.description]: string;
    [jobsColumns.platform]: string;
    [jobsColumns.location]: string;
    [jobsColumns.salary]: jobSalaryInterface;
    [jobsColumns.status]: jobStatusInterface;
    [jobsColumns.postedDate]: string;
    [jobsColumns.saveDate]: string;
    [jobsColumns.appliedDate]: string;
    [jobsColumns.followDate]: string;
}
// #endregion
