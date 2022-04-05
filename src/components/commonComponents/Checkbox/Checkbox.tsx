import classNames from 'classnames';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import _ from 'lodash';

import { cssPrefix } from '../../../config';
import './Checkbox.scss'

const cls = `${cssPrefix}-checkbox`;
let uId: string;

type CheckboxProps = {
  labelPosition?: 'left' | 'right' | 'top' | 'bottom',
  kind?: 'primary' | 'secondary',
  size?: 'sm' | 'md' | 'lg',
  label?: string,
  className?: string,
  errorText?: string,
  helperText?: string,
  error?: boolean,
  disabled?: boolean,
  required?: boolean,
  defaultChecked?: boolean,
  onChange?: Function,
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    children,
    labelPosition, kind, size, label, className, errorText, helperText,
    error, disabled, required, defaultChecked,
    onChange,
  } = props;

  // hooks
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);
  const [isError, setIsError] = useState<boolean>(error);
  const [isDisabled, setIsDisabled] = useState<boolean>(disabled);

  const focusRef = useRef<any>(null);

  useEffect(() => {
    uId = _.uniqueId(cls);
  }, [isChecked]);

  // classnames
  const classesRoot = classNames(`${cls}--root`, {
    [`${cls}--disabled`]: disabled,
    [`${cls}--root-${labelPosition}`]: true,
    [`${cls}--error`]: isError,
  });
  const classesBg = classNames(`${cls}--bg`, {
    [`${cls}--${kind}`]: true,
  });
  const classesInput = classNames(className, {
    [`${cls}`]: true,
    [`${cls}--disabled`]: disabled,
    [`${cls}--${size}`]: true,
    [`${cls}:focus`]: false,

  });

  // handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked, e);
    if (!isDisabled) {
      setIsChecked(!isChecked);
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      setIsChecked(!isChecked);
    }
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    focusRef.current.blur();
  }


  return <div className={`${cls}--wrapper`}>
    <label htmlFor={uId} className={classesRoot}>
      <div className={classesBg}>
        <div className={`${cls}--required`}>{required ? '*' : ''}</div>
        <input
          id={uId}
          ref={focusRef}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          className={classesInput}
          onClick={(e) => handleClick(e)}
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
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
  size: 'md',
  kind: 'secondary',
  labelPosition: 'right',
  label: '',
  errorText: '',
  helperText: '',
  error: false,
  disabled: false,
  required: false,
  defaultChecked: false,
  onChange: () => { },
}

Checkbox.defaultProps = defaultProps;

export default Checkbox;
