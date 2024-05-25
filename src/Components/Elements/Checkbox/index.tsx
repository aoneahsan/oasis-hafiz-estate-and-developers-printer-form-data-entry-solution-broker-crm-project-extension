// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Packages Imports ----
import { ZClassNames } from '@/Packages/ClassNames';

// #endregion

// #region ---- Custom Imports ----
import { isZNonEmptyString } from '@/utils/Helpers';

// #endregion

// #region ---- Types Imports ----
import { type ZLabelPosition } from '@/utils/Enums/Elements.enum';
import { SearchSvg } from '@/assets';

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----
interface ZCheckboxI {
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  touched?: boolean;
  isValid?: boolean;
  errorNode?: React.ReactNode;
  infoText?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  value?: string | number | readonly string[];
  className?: string;
  name?: string;
  readOnly?: boolean;
  labelPosition?: ZLabelPosition;
  uploadBtnHandler?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  disabled?: boolean;
  max?: string | number;
  min?: string | number;
  minLength?: number;
  maxLength?: number;
}
// #endregion

const ZCheckbox: React.FC<ZCheckboxI> = ({
  onBlur,
  onChange,
  isValid = true,
  errorNode,
  type = 'text',
  placeholder,
  label = 'label',
  value = '',
  className,
  name = '',
  readOnly = false,
  infoText,
  style,
  max,
  min,
  minLength,
  maxLength
}) => {
  return (
    <div className='w-full'>
      <div
        style={style}
        className={ZClassNames(className, {
          'relative h-[3.5rem] w-full z-input-group flex justify-start items-center':
            true,
          'border-ShadowedPlum': isValid,
          'border-danger': !isValid
        })}
      >
        <input
          readOnly={readOnly}
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          max={max}
          min={min}
          maxLength={maxLength}
          minLength={minLength}
          onChange={(event) => {
            if (onChange !== undefined) {
              onChange(event);
            }
          }}
          onBlur={onBlur}
          className={ZClassNames({
            'w-[25px] h-[25px] mt-3 ps-4 leading-[1.5rem] font-medium tracking-[0.15px] font-roboto-regular border-none text-[1rem] bg-transparent outline-none rounded-md transition-all':
              true,
            'text-danger': !isValid,
            'text-tertiary': isValid
          })}
        />
        <label
          htmlFor={name}
          className={ZClassNames({
            'text-[1rem] pointer-events-none font-medium font-roboto-regular z-input-label mt-3 ml-3':
              true,
            'text-tertiary': isValid,
            'text-danger': !isValid,
            'floating-label': isZNonEmptyString(String(value))
          })}
        >
          {label}
        </label>
      </div>

      {!isValid &&
      ((typeof errorNode === 'string' && isZNonEmptyString(errorNode)) ||
        (errorNode !== null && errorNode !== undefined)) ? (
        <span className='text-[0.75rem] ps-4 leading-[1rem] block mt-[3px] tracking-[0.4px] font-medium font-roboto-regular'>
          {errorNode}
        </span>
      ) : null}

      {isValid &&
      ((typeof infoText === 'string' && isZNonEmptyString(infoText)) ||
        (infoText !== null && infoText !== undefined)) ? (
        <span className='text-[0.75rem] ms-4 me-[2rem] block mt-[3px] text-[#666] leading-[1rem] tracking-[0.4px] font-medium font-roboto-regular'>
          {infoText}
        </span>
      ) : null}
    </div>
  );
};

export default ZCheckbox;
