// #region ---- Core Imports ----
import React, { useMemo, useState } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import ZInput from '@/Components/Elements/Input';
import Copyright from '@/Components/Inpage/Copyright';
import { ZFormik, ZFormikForm } from '@/Packages/Formik';
import {
  isZNonEmptyString,
  reportCustomError,
  validateFields
} from '@/utils/Helpers';
import ZButton from '@/Components/Elements/Button';
import { useZNavigate } from '@/ZHooks/Navigation.hook';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';

// #endregion

// #region ---- Types Imports ----
import { ZFill } from '@/utils/Enums/Elements.enum';
import { AppRoutes } from '@/Routes/AppRoutes';
import { zValidationRuleE } from '@/utils/Enums/index.enum';

// #endregion

// #region ---- Images Imports ----
import { SpinSvg, productLogo, productVector } from '@/assets';
import { frbCreateUserWithEmailAndPassword } from '@/config/firebase';

// #endregion

const Register: React.FC = () => {
  const [compState, setCompState] = useState<{
    isProcessing: boolean;
  }>({
    isProcessing: false
  });

  const formikInitialValues = useMemo(
    () => ({
      name: '',
      email: '',
      password: '',

      //
      isApiError: false,
      isRegisterPending: false
    }),
    []
  );

  // #region custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region Functions
  const registerHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    if (!isZNonEmptyString(email) || !isZNonEmptyString(password)) {
      showErrorNotification(messages.auth.invalidAuthData);
      return;
    }
    setCompState((oldValues) => ({
      ...oldValues,
      isProcessing: true
    }));

    try {
      const _response = await frbCreateUserWithEmailAndPassword(
        email,
        password
      );

      if (_response !== undefined && _response !== null) {
        showSuccessNotification(messages.auth.registerSuccess);

        void navigate({
          to: AppRoutes.oasis.entryForm
        });
      }
    } catch (error) {
      reportCustomError(error);
      showErrorNotification(messages.auth.registrationFailed);
    } finally {
      setCompState((oldValues) => ({
        ...oldValues,
        isProcessing: false
      }));
    }
  };

  const signInBtnClickHandler = (): void => {
    try {
      // void navigate({ to: AppRoutes.login });
    } catch (error) {
      reportCustomError(error);
    }
  };
  // #endregion

  //
  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-0 bg-secondary h max-h-max pe-8'>
      <div className='flex flex-col items-center w-[25.5625rem] max-w-full h-full mt-6'>
        <img
          className='w-[12rem] cursor-pointer maxSm:mx-auto relative'
          alt='Logo'
          src={productLogo}
          onClick={() => {
            void navigate({ to: AppRoutes.home });
          }}
        />

        <div className='w-full pt-3 mt-10 text-start ps-4'>
          <h2
            className={ZClassNames({
              'text-primary text-start text-[2.25rem] font-black uppercase font-mont-heavy maxMd:text-center':
                true
            })}
          >
            Register
          </h2>

          {/* Progress integrator */}
          <div className='flex items-center w-full gap-3 mt-1'>
            <div className='h-[4px] w-[18.65rem] mt-1 overflow-hidden max-w-auto rounded-full bg-[#cadad3] relative'>
              <div
                className={ZClassNames({
                  'absolute h-full transition-all rounded-e-full bg-primary w-[25%]':
                    true
                })}
              ></div>
            </div>
            <span className='flex items-center text-[1rem] leading-[120%] font-semibold font-roboto-regular'>
              Step
              <span className='flex items-center ms-1'>
                <span className='text-primary'>1</span>/<span>4</span>
              </span>
            </span>
          </div>

          <ZFormik
            initialValues={formikInitialValues}
            validate={(values) => {
              const errors = {};

              validateFields(['email', 'password'], values, errors, [
                zValidationRuleE.email,
                zValidationRuleE.password
              ]);

              return errors;
            }}
            onSubmit={(values) => {
              const email = values?.email ?? '';
              const password = values?.password ?? '';

              void registerHandler(email, password);
            }}
          >
            {({
              values,
              touched,
              errors,
              isValid,
              handleChange,
              handleBlur,
              setFieldValue,
              submitForm
            }) => {
              return (
                <ZFormikForm>
                  {/* Form */}
                  <div className='mt-6'>
                    {/* Name filed */}
                    {/* <ZInput
                      label='Your name*'
                      name='name'
                      value={values?.name}
                      touched={touched?.name}
                      className='w-full max-w-[23.438rem]'
                      isValid={
                        touched.name !== undefined
                          ? touched.name && !isZNonEmptyString(errors?.name)
                          : true
                      }
                      errorNode={errors?.name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                      }}
                    /> */}

                    {/* Email filed */}
                    <ZInput
                      name='email'
                      label='Email*'
                      type='email'
                      className='w-full max-w-[23.438rem] mt-4'
                      value={values?.email}
                      touched={touched?.email}
                      isValid={
                        touched.email !== undefined
                          ? touched.email && !isZNonEmptyString(errors?.email)
                          : true
                      }
                      errorNode={
                        values?.isApiError ? (
                          <>
                            {errors?.email}
                            <span
                              className='inline-block underline ms-1 text-primary text-[0.75rem] font-bold leading-[1rem] cursor-pointer'
                              onClick={() => {
                                // void navigate({ to: AppRoutes.login });
                              }}
                            >
                              Sign in
                            </span>
                          </>
                        ) : (
                          errors?.email
                        )
                      }
                      onChange={(e) => {
                        if (values?.isApiError) {
                          void setFieldValue('isApiError', false, false);
                        }
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                      }}
                    />

                    {/* Password filed */}
                    <ZInput
                      name='password'
                      label='Password*'
                      type='password'
                      className='w-full max-w-[23.438rem] mt-4'
                      value={values?.password}
                      touched={touched?.password}
                      isValid={
                        touched.password !== undefined
                          ? touched.password &&
                            !isZNonEmptyString(errors?.password)
                          : true
                      }
                      errorNode={errors?.password}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                      }}
                    />
                  </div>

                  <div className='flex gap-1 pt-6 mt-6 maxSm:flex-col'>
                    <ZButton
                      type='button'
                      onClick={() => {
                        void submitForm();
                      }}
                      className={ZClassNames({
                        'flex items-center justify-center uppercase': true,
                        'cursor-not-allowed': compState.isProcessing
                      })}
                      disabled={
                        (!isValid && !values?.isApiError) ||
                        compState.isProcessing
                      }
                    >
                      {compState.isProcessing ? (
                        <SpinSvg className='me-2 text-secondary' />
                      ) : (
                        ''
                      )}
                      REGISTER
                    </ZButton>
                    <ZButton
                      fill={ZFill.clear}
                      type='button'
                      onClick={signInBtnClickHandler}
                    >
                      <span className='me-2 pe-1 text-tertiary'>OR</span>
                      <span>SIGN IN</span>
                    </ZButton>
                  </div>
                </ZFormikForm>
              );
            }}
          </ZFormik>
        </div>
      </div>

      <img
        src={productVector}
        alt='product vector'
        className='maxMd:hidden absolute bottom-0 left-0 maxMd:w-[16rem] maxLg:w-[17rem] w-[19.5rem]'
      />
      <div className='flex items-end w-full text-center'>
        <Copyright className='pb-[1.2rem] pt-[2.5rem] w-full' />
      </div>
    </div>
  );
};

export default Register;
