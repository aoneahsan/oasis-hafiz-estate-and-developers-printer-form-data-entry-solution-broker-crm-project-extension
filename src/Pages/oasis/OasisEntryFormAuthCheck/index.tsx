// #region ---- Core Imports ----
import React, { useEffect, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { AxiosError } from 'axios';
import { useParams } from '@tanstack/react-router';
import {
  ZFormik,
  ZFormikForm,
  type zSetFieldErrorType
} from '@/Packages/Formik';
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import ZAuthNavigation from '@/Components/Auth/Navigation';
import Copyright from '@/Components/Inpage/Copyright';
import ZButton from '@/Components/Elements/Button';
import {
  useZRQCreateRequest,
  useZRQGetRequest,
  useZRQUpdateRequest,
  useZUpdateRQCacheData
} from '@/ZHooks/zreactquery.hooks';
import { queryKeys } from '@/utils/Constants/Query';
import {
  isZNonEmptyString,
  reportCustomError,
  validateFields,
  zStringify
} from '@/utils/Helpers';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import { AppRoutes } from '@/Routes/AppRoutes';

// #endregion

// #region ---- Types Imports ----
import { extractInnerData } from '@/utils/Helpers/APIS';
import {
  ApiUrlEnum,
  RouteParams,
  ZRQGetRequestExtractEnum,
  ZRQUpdaterAction
} from '@/utils/Enums/apis.enum';
import { ZFill } from '@/utils/Enums/Elements.enum';
import { type ZClientI } from '@/Types/Auth/Clients/index.type';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/Types/APIs/index.type';
import { zValidationRuleE } from '@/utils/Enums/index.enum';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
import { SpinSvg, productVector } from '@/assets';
import { constants } from '@/utils/Constants';
import OasisEntryFormFields from '@/Components/oasis/OasisEntryFormFields';

// #endregion

const OasisEntryFormAuthCheck: React.FC = () => {
  // When it's edit route that we will get clientId from route params

  // #region Custom hooks
  const { updateRQCDataHandler } = useZUpdateRQCacheData();
  const navigate = useZNavigate();
  // #endregion

  // #region Functions
  const formikSubmitHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType
  ): Promise<void> => {
    try {
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  // #endregion

  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-5 overflow-x-hidden bg-secondary h max-h-max lg:pe-8 maxLg:px-2'>
      <div className='max-w-[85.4rem] w-full mx-auto'>
        <ZAuthNavigation />

        <div className='w-[64.4375rem] max-w-full mx-auto maxMd:mt-[1.6rem] md:mt-[2.4rem]'>
          <h2 className='uppercase maxLg:text-center text-primary md:me-9 text-[1.5rem] md:text-[2.25rem] font-black font-mont-heavy'>
            Add Client Details
          </h2>
          <ZFormik
            initialValues={{
              // Property selection
              plotNumber: '',
              registrationNumber: '',
              serialNumber: '',
              plotType: '',
              plotSize: '',
              extraPercentageForLocationCategory: '',
              extraPercentageForLocationCategoryReason: '',

              // Personal Information
              applicantName: '',
              guardianName: '',
              relationWithGuardian: '',
              cnicNumber: '',
              passportNumber: '',
              mailAddress: '',
              permanentAddress: '',
              phoneNumber: '',
              mobileNumber: '',

              // Nominee Information
              nomineeName: '',
              nomineeGuardianName: '',
              nomineeRelationWithGuardian: '',
              nomineeCnicNumber: '',
              nomineeRelationWithApplicant: '',
              nomineeAddress: '',
              nomineePhoneNumber: '',
              nomineeMobileNumber: '',

              // Payment Information
              paymentMethod: ''
            }}
            enableReinitialize={true}
            validate={(values) => {
              const errors: { default_currency?: string } = {};
              validateFields(
                [
                  // Property selection
                  'plotNumber', // 1
                  'registrationNumber', // 2
                  'serialNumber', // 3
                  'plotType', // 4
                  'plotSize', // 5
                  'extraPercentageForLocationCategory', // 6
                  'extraPercentageForLocationCategoryReason', // 7

                  // Personal Information
                  'applicantName', // 8
                  'guardianName', // 9
                  'relationWithGuardian', // 10
                  'cnicNumber', // 11
                  'passportNumber', // 12
                  'mailAddress', // 13
                  'permanentAddress', // 14
                  'phoneNumber', // 15
                  'mobileNumber', // 16

                  // Nominee Information
                  'nomineeName', // 17
                  'nomineeGuardianName', // 18
                  'nomineeRelationWithGuardian', // 19
                  'nomineeCnicNumber', // 20
                  'nomineeRelationWithApplicant', // 21
                  'nomineeAddress', // 22
                  'nomineePhoneNumber', // 23
                  'nomineeMobileNumber', // 24

                  // Payment Information
                  'paymentMethod' // 25
                ],
                values,
                errors,
                [
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string,
                  zValidationRuleE.string
                ]
              );

              return errors;
            }}
            onSubmit={(values, { setFieldError }) => {
              const {
                plotNumber,
                registrationNumber,
                serialNumber,
                plotType,
                plotSize,
                extraPercentageForLocationCategory,
                extraPercentageForLocationCategoryReason,
                applicantName,
                guardianName,
                relationWithGuardian,
                cnicNumber,
                passportNumber,
                mailAddress,
                permanentAddress,
                phoneNumber,
                mobileNumber,
                nomineeName,
                nomineeGuardianName,
                nomineeRelationWithGuardian,
                nomineeCnicNumber,
                nomineeRelationWithApplicant,
                nomineeAddress,
                nomineePhoneNumber,
                nomineeMobileNumber,
                paymentMethod
              } = values;

              console.log({
                plotNumber,
                registrationNumber,
                serialNumber,
                plotType,
                plotSize,
                extraPercentageForLocationCategory,
                extraPercentageForLocationCategoryReason,
                applicantName,
                guardianName,
                relationWithGuardian,
                cnicNumber,
                passportNumber,
                mailAddress,
                permanentAddress,
                phoneNumber,
                mobileNumber,
                nomineeName,
                nomineeGuardianName,
                nomineeRelationWithGuardian,
                nomineeCnicNumber,
                nomineeRelationWithApplicant,
                nomineeAddress,
                nomineePhoneNumber,
                nomineeMobileNumber,
                paymentMethod
              });
            }}
          >
            {({ isValid, handleSubmit, dirty }) => {
              return (
                <ZFormikForm
                  onSubmit={handleSubmit}
                  className='flex flex-col items-center w-full mt-5'
                >
                  <>
                    <OasisEntryFormFields />

                    <div className='flex pt-3 max-w-[23.438rem] w-full mt-10 maxSm:flex-col-reverse maxSm:gap-y-2 sm:items-center sm:justify-between'>
                      <ZButton
                        fill={ZFill.clear}
                        className='uppercase'
                        type='reset'
                      >
                        Cancel
                      </ZButton>
                      <ZButton
                        type='submit'
                        className={ZClassNames({
                          'flex items-center justify-center uppercase': true,
                          'cursor-not-allowed': !dirty
                        })}
                        disabled={!isValid || !dirty}
                      >
                        Save
                      </ZButton>
                    </div>
                  </>
                </ZFormikForm>
              );
            }}
          </ZFormik>
        </div>
      </div>

      <div className='flex items-start flex-col w-full maxMd:mt-[2rem] md:mt-[7.15rem]'>
        <img
          src={productVector}
          alt='product vector'
          className='maxLg:hidden absolute bottom-0 left-0 z-1 maxMd:w-[16rem] maxXl:w-[17rem] w-[19.5rem]'
        />
        <div className='flex items-end w-full text-center'>
          <Copyright className='pb-[1.2rem] pt-[2.5rem] w-full' />
        </div>
      </div>
    </div>
  );
};

export default OasisEntryFormAuthCheck;
