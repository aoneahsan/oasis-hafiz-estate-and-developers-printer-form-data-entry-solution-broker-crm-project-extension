// #region ---- Core Imports ----
import React, { useCallback, useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';
import {
  ZFormik,
  ZFormikForm,
  type zSetFieldErrorType
} from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZButton from '@/Components/Elements/Button';
import {
  Storage,
  isZNonEmptyString,
  reportCustomError,
  validateFields,
  zStringify
} from '@/utils/Helpers';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/Enums/Elements.enum';

// #endregion

// #region ---- Store Imports ----
import { zValidationRuleE } from '@/utils/Enums/index.enum';
import { useZRQUpdateRequest } from '@/ZHooks/zreactquery.hooks';
import { ApiUrlEnum } from '@/utils/Enums/apis.enum';
import { extractInnerData } from '@/utils/Helpers/APIS';
import {
  extractInnerDataObjectEnum,
  extractInnerDataOptionsEnum
} from '@/Types/APIs/index.type';
import { type ZAuthI } from '@/Types/Auth/index.type';
import { constants } from '@/utils/Constants';
import { useSetRecoilState } from 'recoil';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';
import { AxiosError } from 'axios';
import { SpinSvg } from '@/assets';
import { AppRoutes } from '@/Routes/AppRoutes';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import ProfileForm from '@/Components/Inpage/ProfileForm';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const OnBoardingProfile: React.FC = () => {
  const formikInitialValues = useMemo(
    () =>
      ({
        company: '',
        address: '',
        zipcode: '',
        city: '',
        country: '',
        registration_number: '',
        vat_number: '',

        //
        isApiError: false,
        isRegisterPending: false
      }) as const,
    []
  );

  // #region custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region api
  const {
    mutateAsync: profileDetailMutateAsync,
    isPending: isProfileDetailPending
  } = useZRQUpdateRequest({
    _url: ApiUrlEnum.profileDetails
  });
  // #endregion

  // #region functions
  const formikSubmitHandler = async (
    value: string,
    setFieldError: zSetFieldErrorType
  ): Promise<void> => {
    try {
      const _response = await profileDetailMutateAsync({
        itemIds: [],
        urlDynamicParts: [],
        requestData: value
      });

      if (_response !== undefined && _response !== null) {
        const _data = extractInnerData<ZAuthI>(
          _response,
          extractInnerDataOptionsEnum.createRequestResponseItem
        );

        if (_data !== null && _data !== undefined) {
          showSuccessNotification(messages.user.profileDetails);

          void navigate({
            to: AppRoutes.oasis.entryForm
          });
        }
      }
    } catch (error) {
      reportCustomError(error);

      if (error instanceof AxiosError) {
        const _data = extractInnerData<{
          item: string[];
          company: string[];
          address: string[];
          zipcode: string[];
          city: string[];
          country: string[];
          registration_number: string[];
          vat_number: string[];
        }>(
          error?.response?.data,
          extractInnerDataOptionsEnum.createRequestResponseData,
          extractInnerDataObjectEnum.error
        );
        if (
          _data?.item !== undefined &&
          _data?.item !== null &&
          isZNonEmptyString(_data?.item[0])
        ) {
          showErrorNotification(_data?.item[0]);
        }

        if (
          Array.isArray(_data?.company) &&
          isZNonEmptyString(_data?.company[0])
        ) {
          setFieldError('company', _data?.company[0]);
        }

        if (
          Array.isArray(_data?.address) &&
          isZNonEmptyString(_data?.address[0])
        ) {
          setFieldError('address', _data?.address[0]);
        }

        if (Array.isArray(_data?.city) && isZNonEmptyString(_data?.city[0])) {
          setFieldError('city', _data?.city[0]);
        }

        if (
          Array.isArray(_data?.country) &&
          isZNonEmptyString(_data?.country[0])
        ) {
          setFieldError('country', _data?.country[0]);
        }

        if (
          Array.isArray(_data?.vat_number) &&
          isZNonEmptyString(_data?.vat_number[0])
        ) {
          setFieldError('vat_number', _data?.vat_number[0]);
        }

        if (
          Array.isArray(_data?.registration_number) &&
          isZNonEmptyString(_data?.registration_number[0])
        ) {
          setFieldError('registration_number', _data?.registration_number[0]);
        }
      }
    }
  };

  const skipForNowBthHandler = useCallback(() => {
    void navigate({
      to: AppRoutes.oasis.entryForm
    });
    // eslint-disable-next-line
  }, []);
  // #endregion

  return (
    <div className='w-full pt-3 mt-10 text-start ps-4'>
      <h2
        className={ZClassNames({
          'text-primary text-start text-[2.25rem] font-black uppercase font-mont-heavy maxMd:text-center mb-10':
            true
        })}
      >
        Your profile
      </h2>

      {/* Progress integrator */}
      <div className='flex items-center w-full gap-3 mt-1'>
        <div className='h-[4px] w-[18.65rem] mt-1 overflow-hidden max-w-auto rounded-full bg-[#cadad3] relative'>
          <div
            className={ZClassNames({
              'absolute h-full transition-all rounded-e-full bg-primary w-[50%]':
                true
            })}
          ></div>
        </div>
        <span className='flex items-center text-[1rem] leading-[120%] font-semibold font-roboto-regular'>
          Step
          <span className='flex items-center ms-1'>
            <span className='text-primary'>2</span>/<span>4</span>
          </span>
        </span>
      </div>

      <ZFormik
        initialValues={formikInitialValues}
        validate={(values) => {
          const errors = {};

          validateFields(
            [
              'company',
              'address',
              'zipcode',
              'city',
              'country',
              'registration_number',
              'vat_number'
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
              zValidationRuleE.string
            ]
          );

          return errors;
        }}
        onSubmit={(values, { setFieldError }) => {
          const zStringifyData = zStringify({
            company: values.company,
            address: values.address,
            zipcode: values.zipcode,
            city: values.city,
            country: values.country,
            registration_number: values.registration_number,
            vat_number: values.vat_number
          });

          void formikSubmitHandler(zStringifyData, setFieldError);
        }}
      >
        {({ isValid, handleSubmit }) => {
          return (
            <ZFormikForm onSubmit={handleSubmit}>
              <div className='mt-6'>
                <ProfileForm />
              </div>

              <div className='flex gap-1 pt-6 mt-6 maxSm:flex-col'>
                <ZButton
                  type='submit'
                  className={ZClassNames({
                    'flex items-center justify-center uppercase': true,
                    'cursor-not-allowed px-[1rem!important]':
                      isProfileDetailPending
                  })}
                  disabled={!isValid || isProfileDetailPending}
                >
                  {isProfileDetailPending ? (
                    <SpinSvg className='me-2 text-secondary' />
                  ) : (
                    ''
                  )}
                  CONTINUE
                </ZButton>
                <ZButton
                  fill={ZFill.clear}
                  type='button'
                  onClick={skipForNowBthHandler}
                >
                  <span className='me-2 pe-1 text-tertiary'>OR</span>
                  <span>SKIP FOR NOW</span>
                </ZButton>
              </div>
            </ZFormikForm>
          );
        }}
      </ZFormik>
    </div>
  );
};

export default OnBoardingProfile;
