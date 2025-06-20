// #region ---- Core Imports ----
import React, { useState } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZFormik, ZFormikForm } from '@/Packages/Formik';
import { ZClassNames } from '@/Packages/ClassNames';
import { useZNavigate } from '@/ZHooks/Navigation.hook';

// #endregion

// #region ---- Custom Imports ----
import {
  isZNonEmptyString,
  reportCustomError,
  validateField
} from '@/utils/Helpers';
import ZInput from '@/Components/Elements/Input';
import ZButton from '@/Components/Elements/Button';
import Copyright from '@/Components/Inpage/Copyright';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/utils/Helpers/Notification';
import { messages } from '@/utils/Messages';

// #endregion

// #region ---- Types Imports ----
import { zValidationRuleE } from '@/utils/Enums/index.enum';
import { ZFill } from '@/utils/Enums/Elements.enum';
import { AppRoutes } from '@/Routes/AppRoutes';

// #endregion

// #region ---- Images Imports ----
import { productLogo, productVector, SpinSvg } from '@/assets';

// #endregion

import { frbSignInWithEmailAndPassword } from '@/config/firebase';

const Login: React.FC = () => {
  const formikInitialValues = {
    email: '',
    password: '',

    // Just for frontend
    isApiError: false
  };
  const [compState, setCompState] = useState<{
    isLoginPending: boolean;
  }>({
    isLoginPending: false
  });

  // #region custom hooks
  const navigate = useZNavigate();
  // #endregion

  // #region Functions
  const signUpBtnClickHandler = (): void => {
    try {
      // void navigate({ to: AppRoutes.register });
    } catch (error) {
      reportCustomError(error);
    }
  };

  const formikSubmitHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    if (!isZNonEmptyString(email) || !isZNonEmptyString(password)) {
      showErrorNotification(messages.auth.invalidAuthData);
      return;
    }
    setCompState((oldValues) => ({
      ...oldValues,
      isLoginPending: true
    }));

    try {
      const _response = await frbSignInWithEmailAndPassword(email, password);

      if (_response !== undefined && _response !== null && !!_response.user) {
        showSuccessNotification(messages.auth.loginSuccess);

        void navigate({
          to: AppRoutes.oasis.entryForm
        });
      }
    } catch (error) {
      showErrorNotification(messages.auth.userNotFoundOrInvalidDetails);
      reportCustomError(error);
    } finally {
      setCompState((oldValues) => ({
        ...oldValues,
        isLoginPending: false
      }));
    }
  };
  // #endregion

  return (
    <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-10 bg-secondary h max-h-max pe-8'>
      <div className='flex flex-col items-center w-[25.5625rem] max-w-full h-full mt-6'>
        <img
          className='w-[4.8rem] cursor-pointer h-[4.8rem] maxSm:mx-auto relative'
          alt='Logo'
          src={productLogo}
          onClick={() => {
            void navigate({ to: AppRoutes.home });
          }}
        />

        <div className='w-full pt-3 mt-10 text-start ps-4'>
          <ZFormik
            initialValues={formikInitialValues}
            validate={(values) => {
              const errors = {};
              validateField('email', values, errors, zValidationRuleE.email);
              validateField(
                'password',
                values,
                errors,
                zValidationRuleE.password
              );

              return errors;
            }}
            onSubmit={(values) => {
              const email = values?.email ?? '';
              const password = values?.password ?? '';

              void formikSubmitHandler(email, password);
            }}
          >
            {({
              values,
              touched,
              errors,
              isValid,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              submitForm
            }) => {
              return (
                <ZFormikForm onSubmit={handleSubmit}>
                  <h2
                    className={ZClassNames({
                      'text-primary text-start text-[2.25rem] font-black uppercase font-mont-heavy maxMd:text-center mb-9':
                        true
                    })}
                  >
                    Sign in
                  </h2>

                  <div className='mt-6'>
                    {/* Name filed */}
                    <ZInput
                      label='Email*'
                      name='email'
                      value={values?.email}
                      touched={touched?.email}
                      className='w-full max-w-[23.438rem]'
                      isValid={
                        touched.email !== undefined
                          ? touched.email && !isZNonEmptyString(errors?.email)
                          : true
                      }
                      errorNode={errors?.email}
                      onChange={(e) => {
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
                      isValid={
                        touched.password !== undefined
                          ? touched.password &&
                            !isZNonEmptyString(errors?.password)
                          : true
                      }
                      touched={touched?.password}
                      errorNode={
                        values?.isApiError ? (
                          <div className='mt-4'>
                            {errors?.password}
                            <button
                              className='inline-block underline ms-1 text-primary text-[0.75rem] font-bold leading-[1rem] cursor-pointer'
                              onClick={() => {
                                void navigate({
                                  to: AppRoutes.oasis.entryForm
                                });
                              }}
                            >
                              Forgot your password?
                            </button>
                          </div>
                        ) : (
                          errors?.password
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
                  </div>

                  <div className='flex gap-1 pt-6 mt-6 maxSm:flex-col'>
                    <ZButton
                      type='button'
                      className={ZClassNames({
                        'flex items-center justify-center uppercase': true,
                        'cursor-not-allowed': compState.isLoginPending
                      })}
                      disabled={
                        (!isValid && !values?.isApiError) ||
                        compState.isLoginPending
                      }
                      onClick={() => {
                        void submitForm();
                      }}
                    >
                      {compState.isLoginPending ? (
                        <SpinSvg className='me-2 text-secondary' />
                      ) : (
                        ''
                      )}
                      Log in
                    </ZButton>
                    <ZButton
                      fill={ZFill.clear}
                      type='button'
                      onClick={signUpBtnClickHandler}
                    >
                      <span className='me-2 pe-1 text-tertiary'>OR</span>
                      <span>SIGN UP</span>
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

export default Login;
