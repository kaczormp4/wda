import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import _ from 'lodash';

import { cssPrefix } from '../../../config';
import './Checkbox.scss'

const cls = `${cssPrefix}-checkbox`;
let uId: string;

type CheckboxProps = {
  className?: string,
  label?: string,
  disabled?: boolean,
  defaultChecked?: boolean,
  helperText?: string,
  labelPosition?: 'left' | 'right' | 'top' | 'bottom',
  onChange?: Function,
  error?: boolean,
  errorText?: string,
  size?: 'sm' | 'md' | 'lg'
  required?: boolean,
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { className, label, disabled, defaultChecked, labelPosition, onChange, error, errorText, helperText, size, required } = props;
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);
  const [isError, setIsError] = useState<boolean>(error);
  const [isDisabled, setIsDisabled] = useState<boolean>(disabled);

  useEffect(() => {
    uId = _.uniqueId(cls)
  }, [isChecked]);

  // classnames
  const classesRoot = classNames(`${cls}--root`, {
    // [`${cls}--${kind}`]: true,
    // [`${cls}--${size}`]: true,
    [`${cls}--disabled`]: disabled,
    [`${cls}--root-${labelPosition}`]: true,
    // [`${cls}--error`]: isError && !isFocus,
    // [`${cls}--date`]: type === 'date',
    // [`${cls}--skeleton`]: skeleton,
  });
  const classesInput = classNames(className, {
    [`${cls}`]: true,
    [`${cls}--disabled`]: disabled,
    // [`${cls}--${kind}`]: true,
    [`${cls}--${size}`]: true,
    // [`${cls}--disabled`]: disabled || skeleton,
    // [`${cls}--error`]: isError && !isFocus,
    // [`${cls}--date`]: type === 'date',
    // [`${cls}--skeleton`]: skeleton,
  });

  // handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, e);
    if (!isDisabled) {
      setIsChecked(!isChecked)
    }
  }

  return <div className={`${cls}--wrapper`}>
    <label htmlFor={uId} className={classesRoot}>
      <div className={`${cls}--bg`}>
        <div className={`${cls}--required`}>{required ? '*' : ''}</div>
        <input
          id={uId}
          type="checkbox"
          className={classesInput}
          checked={isChecked}
          disabled={disabled}
          onChange={(e) => handleChange(e)}
        />
      </div>
      {label && <span className={`${cls}--label`}>{label}</span>}
    </label>
    {
      isError && <p className={`${cls}--errorText`}>{errorText}</p>
    }
    {
      !isError && helperText && <p className={`${cls}--helperText`}>{helperText}</p>
    }
  </div>
}

const defaultProps: CheckboxProps = {
  label: '',
  disabled: false,
  defaultChecked: false,
  labelPosition: 'right',
  error: false,
  required: false,
  errorText: '',
  helperText: '',
  onChange: () => { },
  size: 'md'
}

Checkbox.defaultProps = defaultProps;

export default Checkbox;
