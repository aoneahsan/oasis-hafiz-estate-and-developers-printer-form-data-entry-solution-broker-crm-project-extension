// #region ---- Core Imports ----
import React, { useMemo } from 'react';

// #endregion

// #region ---- Packages Imports ----
import { useZFormikContext } from '@/Packages/Formik';

// #endregion

// #region ---- Custom Imports ----
import ZInput from '@/Components/Elements/Input';
import ZSelect from '@/Components/Elements/Select';
import { isZNonEmptyString } from '@/utils/Helpers';

// #endregion

// #region ---- Store Imports ----
import ZTextarea from '@/Components/Elements/Textarea';
import { IZOasisEntryForm } from '@/Types/oasis';

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface OasisEntryFormFieldsI {
  inputMaxWidth?: string;
  width?: string;
}

// #endregion

const OasisEntryFormFields: React.FC<OasisEntryFormFieldsI> = ({
  inputMaxWidth = '70rem',
  width = '100%'
}) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched
  } = useZFormikContext<IZOasisEntryForm>();

  const containerStyle = useMemo(
    () => ({
      maxWidth: inputMaxWidth,
      width
    }),
    // eslint-disable-next-line
    []
  );

  return (
    <div
      style={containerStyle}
      className='maxSm:w-[100%!important] maxSm:max-w-[100%!important]'
    >
      <ZInput
        label='Plot Number*'
        name='plotNumber'
        value={values?.plotNumber}
        touched={touched?.plotNumber}
        isValid={
          touched.plotNumber !== undefined
            ? touched.plotNumber && !isZNonEmptyString(errors?.plotNumber)
            : true
        }
        errorNode={errors?.plotNumber}
        className='w-full'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Registration Number*'
        name='registrationNumber'
        value={values?.registrationNumber}
        touched={touched?.registrationNumber}
        isValid={
          touched.registrationNumber !== undefined
            ? touched.registrationNumber &&
              !isZNonEmptyString(errors?.registrationNumber)
            : true
        }
        errorNode={errors?.registrationNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Serial Number*'
        name='serialNumber'
        value={values?.serialNumber}
        touched={touched?.serialNumber}
        isValid={
          touched.serialNumber !== undefined
            ? touched.serialNumber && !isZNonEmptyString(errors?.serialNumber)
            : true
        }
        errorNode={errors?.serialNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Plot Type*'
        name='plotType'
        value={values?.plotType}
        touched={touched?.plotType}
        isValid={
          touched.plotType !== undefined
            ? touched.plotType && !isZNonEmptyString(errors?.plotType)
            : true
        }
        errorNode={errors?.plotType}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Plot Size*'
        name='plotSize'
        value={values?.plotSize}
        touched={touched?.plotSize}
        isValid={
          touched.plotSize !== undefined
            ? touched.plotSize && !isZNonEmptyString(errors?.plotSize)
            : true
        }
        errorNode={errors?.plotSize}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Extra Percentage For Location Category'
        name='extraPercentageForLocationCategory'
        value={values?.extraPercentageForLocationCategory}
        touched={touched?.extraPercentageForLocationCategory}
        isValid={
          touched.extraPercentageForLocationCategory !== undefined
            ? touched.extraPercentageForLocationCategory &&
              !isZNonEmptyString(errors?.extraPercentageForLocationCategory)
            : true
        }
        errorNode={errors?.extraPercentageForLocationCategory}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZTextarea
        label='Extra Percentage For Location Category Reason'
        name='extraPercentageForLocationCategoryReason'
        value={values?.extraPercentageForLocationCategoryReason}
        touched={touched?.extraPercentageForLocationCategoryReason}
        isValid={
          touched.extraPercentageForLocationCategoryReason !== undefined
            ? touched.extraPercentageForLocationCategoryReason &&
              !isZNonEmptyString(
                errors?.extraPercentageForLocationCategoryReason
              )
            : true
        }
        errorNode={errors?.extraPercentageForLocationCategoryReason}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Applicant Name*'
        name='applicantName'
        value={values?.applicantName}
        touched={touched?.applicantName}
        isValid={
          touched.applicantName !== undefined
            ? touched.applicantName && !isZNonEmptyString(errors?.applicantName)
            : true
        }
        errorNode={errors?.applicantName}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Guardian Name*'
        name='guardianName'
        value={values?.guardianName}
        touched={touched?.guardianName}
        isValid={
          touched.guardianName !== undefined
            ? touched.guardianName && !isZNonEmptyString(errors?.guardianName)
            : true
        }
        errorNode={errors?.guardianName}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Relation With Guardian*'
        name='relationWithGuardian'
        value={values?.relationWithGuardian}
        touched={touched?.relationWithGuardian}
        isValid={
          touched.relationWithGuardian !== undefined
            ? touched.relationWithGuardian &&
              !isZNonEmptyString(errors?.relationWithGuardian)
            : true
        }
        errorNode={errors?.relationWithGuardian}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='CNIC Number*'
        name='cnicNumber'
        value={values?.cnicNumber}
        touched={touched?.cnicNumber}
        isValid={
          touched.cnicNumber !== undefined
            ? touched.cnicNumber && !isZNonEmptyString(errors?.cnicNumber)
            : true
        }
        errorNode={errors?.cnicNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Passport Number*'
        name='passportNumber'
        value={values?.passportNumber}
        touched={touched?.passportNumber}
        isValid={
          touched.passportNumber !== undefined
            ? touched.passportNumber &&
              !isZNonEmptyString(errors?.passportNumber)
            : true
        }
        errorNode={errors?.passportNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Mail Address*'
        name='mailAddress'
        value={values?.mailAddress}
        touched={touched?.mailAddress}
        isValid={
          touched.mailAddress !== undefined
            ? touched.mailAddress && !isZNonEmptyString(errors?.mailAddress)
            : true
        }
        errorNode={errors?.mailAddress}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Permanent Address*'
        name='permanentAddress'
        value={values?.permanentAddress}
        touched={touched?.permanentAddress}
        isValid={
          touched.permanentAddress !== undefined
            ? touched.permanentAddress &&
              !isZNonEmptyString(errors?.permanentAddress)
            : true
        }
        errorNode={errors?.permanentAddress}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Phone Number*'
        name='phoneNumber'
        value={values?.phoneNumber}
        touched={touched?.phoneNumber}
        isValid={
          touched.phoneNumber !== undefined
            ? touched.phoneNumber && !isZNonEmptyString(errors?.phoneNumber)
            : true
        }
        errorNode={errors?.phoneNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Mobile Number*'
        name='mobileNumber'
        value={values?.mobileNumber}
        touched={touched?.mobileNumber}
        isValid={
          touched.mobileNumber !== undefined
            ? touched.mobileNumber && !isZNonEmptyString(errors?.mobileNumber)
            : true
        }
        errorNode={errors?.mobileNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Nominee Name*'
        name='nomineeName'
        value={values?.nomineeName}
        touched={touched?.nomineeName}
        isValid={
          touched.nomineeName !== undefined
            ? touched.nomineeName && !isZNonEmptyString(errors?.nomineeName)
            : true
        }
        errorNode={errors?.nomineeName}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Nominee Guardian Name*'
        name='nomineeGuardianName'
        value={values?.nomineeGuardianName}
        touched={touched?.nomineeGuardianName}
        isValid={
          touched.nomineeGuardianName !== undefined
            ? touched.nomineeGuardianName &&
              !isZNonEmptyString(errors?.nomineeGuardianName)
            : true
        }
        errorNode={errors?.nomineeGuardianName}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Nominee Relation With Guardian*'
        name='nomineeRelationWithGuardian'
        value={values?.nomineeRelationWithGuardian}
        touched={touched?.nomineeRelationWithGuardian}
        isValid={
          touched.nomineeRelationWithGuardian !== undefined
            ? touched.nomineeRelationWithGuardian &&
              !isZNonEmptyString(errors?.nomineeRelationWithGuardian)
            : true
        }
        errorNode={errors?.nomineeRelationWithGuardian}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Nominee CNIC Number*'
        name='nomineeCnicNumber'
        value={values?.nomineeCnicNumber}
        touched={touched?.nomineeCnicNumber}
        isValid={
          touched.nomineeCnicNumber !== undefined
            ? touched.nomineeCnicNumber &&
              !isZNonEmptyString(errors?.nomineeCnicNumber)
            : true
        }
        errorNode={errors?.nomineeCnicNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Nominee Relation With Applicant*'
        name='nomineeRelationWithApplicant'
        value={values?.nomineeRelationWithApplicant}
        touched={touched?.nomineeRelationWithApplicant}
        isValid={
          touched.nomineeRelationWithApplicant !== undefined
            ? touched.nomineeRelationWithApplicant &&
              !isZNonEmptyString(errors?.nomineeRelationWithApplicant)
            : true
        }
        errorNode={errors?.nomineeRelationWithApplicant}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Nominee Address*'
        name='nomineeAddress'
        value={values?.nomineeAddress}
        touched={touched?.nomineeAddress}
        isValid={
          touched.nomineeAddress !== undefined
            ? touched.nomineeAddress &&
              !isZNonEmptyString(errors?.nomineeAddress)
            : true
        }
        errorNode={errors?.nomineeAddress}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Nominee Phone Number*'
        name='nomineePhoneNumber'
        value={values?.nomineePhoneNumber}
        touched={touched?.nomineePhoneNumber}
        isValid={
          touched.nomineePhoneNumber !== undefined
            ? touched.nomineePhoneNumber &&
              !isZNonEmptyString(errors?.nomineePhoneNumber)
            : true
        }
        errorNode={errors?.nomineePhoneNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZInput
        label='Nominee Mobile Number*'
        name='nomineeMobileNumber'
        value={values?.nomineeMobileNumber}
        touched={touched?.nomineeMobileNumber}
        isValid={
          touched.nomineeMobileNumber !== undefined
            ? touched.nomineeMobileNumber &&
              !isZNonEmptyString(errors?.nomineeMobileNumber)
            : true
        }
        errorNode={errors?.nomineeMobileNumber}
        className='w-full mt-4'
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />

      <ZSelect
        label='Payment Method*'
        name='paymentMethod'
        value={[
          { label: 'Cash', value: 'cash' },
          { label: 'Cheque', value: 'cheque' },
          { label: 'Bank Transfer', value: 'bankTransfer' }
        ].find((item) => item.value === values?.paymentMethod)}
        isValid={
          touched.paymentMethod !== undefined
            ? touched.paymentMethod && !isZNonEmptyString(errors?.paymentMethod)
            : true
        }
        errorNode={errors?.paymentMethod}
        className='w-full mt-4'
        options={[
          { label: 'Cash', value: 'cash' },
          { label: 'Cheque', value: 'cheque' },
          { label: 'Bank Transfer', value: 'bankTransfer' }
        ]}
        onChange={(e) => {
          setFieldValue('paymentMethod', e?.value);
          setFieldTouched('paymentMethod', true);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />
    </div>
  );
};

export default OasisEntryFormFields;
