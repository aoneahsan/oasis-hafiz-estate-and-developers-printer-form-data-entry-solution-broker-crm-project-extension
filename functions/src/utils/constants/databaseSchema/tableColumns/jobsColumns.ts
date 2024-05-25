const jobsColumns = {
	title: 'title',
	urlForOriginalPosting: 'urlForOriginalPosting',
	companyName: 'companyName',
	description: 'description',
	platform: 'platform', // eg. LinkedIn, Indeed, etc.
	location: 'location',
	salary: 'salary',
	status: 'status',
	currentStatus: 'currentStatus', // sub of status
	booked: 'booked', // sub of status
	reviewJobPositionDetails: 'reviewJobPositionDetails', // sub of booked
	applying: 'applying', // sub of status
	getReferral: 'getReferral', // sub of applying
	customizeResume: 'customizeResume', // sub of applying
	writeCoverLetter: 'writeCoverLetter', // sub of applying
	identifyHiringManager: 'identifyHiringManager', // sub of applying
	submitApplication: 'submitApplication', // sub of applying
	min: 'min',
	max: 'max',
	currency: 'currency',
	period: 'period',
	postedDate: 'postedDate',
	saveDate: 'saveDate',
	appliedDate: 'appliedDate',
	followDate: 'followDate',
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	deletedAt: 'deletedAt',
} as const;

export default jobsColumns;
