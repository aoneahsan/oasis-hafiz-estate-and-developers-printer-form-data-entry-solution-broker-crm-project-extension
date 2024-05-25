// #region ---- Core Imports ----
import React, { useState } from 'react';
// #endregion

// #region ---- Packages Imports ----
import { ZFormik, ZFormikForm } from '@/Packages/Formik';
import { ZClassNames } from '@/Packages/ClassNames';
// #endregion

// #region ---- Custom Imports ----
import ZAuthNavigation from '@/Components/Auth/Navigation';
import Copyright from '@/Components/Inpage/Copyright';
import ZButton from '@/Components/Elements/Button';
import { reportCustomError, validateFields } from '@/utils/Helpers';
// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/Enums/Elements.enum';
import { zValidationRuleE } from '@/utils/Enums/index.enum';
// #endregion

// #region ---- Types Imports ----
import { productVector } from '@/assets';
import OasisEntryFormFields from '@/Components/oasis/OasisEntryFormFields';
import { IZOasisEntryForm } from '@/Types/oasis';
import { addOasisFormEntryInFirestore } from '@/config/firebase';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
// #endregion

const OasisEntryFormContent: React.FC = () => {
  const [compState, setCompState] = useState<{ processing: boolean }>({
    processing: false
  });

  // #region Functions
  const formikSubmitHandler = async (
    data: IZOasisEntryForm,
    callBack: () => void
  ): Promise<void> => {
    setCompState({ ...compState, processing: true });
    try {
      const _resData = await addOasisFormEntryInFirestore(data);

      console.log({
        ml: 'OasisEntryFormContent -> formikSubmitHandler -> _resData',
        _resData
      });

      showSuccessNotification(
        'Oasis Entry Form has been submitted successfully'
      );

      callBack();
    } catch (error) {
      reportCustomError(error);

      showErrorNotification('Failed to submit Oasis Entry Form');
    } finally {
      setCompState({ ...compState, processing: false });
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
              qrCodeNumber: '',

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
              const errors: { qrCodeNumber?: string } = {};
              validateFields(
                [
                  'qrCodeNumber',

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
                  zValidationRuleE.string,
                  zValidationRuleE.string
                ]
              );

              try {
                const _qrCodeNumber = parseInt(values.qrCodeNumber);
                if (_qrCodeNumber < 1 || _qrCodeNumber > 5000) {
                  errors.qrCodeNumber =
                    'QR Code Number should be between 1-5000';
                }
              } catch (error) {}

              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              const {
                qrCodeNumber,
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

              formikSubmitHandler(
                {
                  qrCodeNumber,
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
                },
                () => {
                  resetForm();
                }
              );
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
                        disabled={!dirty || compState.processing}
                      >
                        Cancel
                      </ZButton>
                      <ZButton
                        type='submit'
                        className={ZClassNames({
                          'flex items-center justify-center uppercase': true,
                          'cursor-not-allowed': !isValid || compState.processing
                        })}
                        disabled={!isValid || compState.processing}
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

export default OasisEntryFormContent;
