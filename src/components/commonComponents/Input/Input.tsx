import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { cssPrefix } from '../../../config';
import './Input.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cls = `${cssPrefix}-input`;
type InputProps = {
  autocompleteId?: 'name' | 'surname' | 'username' | 'email' | 'password' | string;
  kind?: 'primary' | 'outlined' | 'filled';
  type?: 'text' | 'password' | 'number' | 'email' | 'date' | 'search';
  size?: 'sm' | 'md';
  label?: string;
  errorText?: string;
  className?: string;
  helperText?: string;
  defaultValue?: string | number;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  skeleton?: boolean;
  readOnly?: boolean;
  onBlur?: Function;
  onClick?: Function;
  onFocus?: Function;
  onChange?: Function;
  onKeyDown?: Function;
  [rest: string]: any;
};

const Input: FC<InputProps> = props => {
  const {
    autocompleteId,
    kind,
    type,
    size,
    label,
    errorText,
    className,
    helperText,
    defaultValue,
    error,
    required,
    disabled,
    skeleton,
    readOnly,
    onBlur,
    onClick,
    onFocus,
    onChange,
    onKeyDown,
    ...rest
  } = props;

  // hooks
  const [isError, setError] = useState<boolean>(error);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isText, setText] = useState<typeof defaultValue>(defaultValue);

  const labelRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isText.toString().length > 0 || type === 'date') {
      setIsActive(true);
    }
  }, []);

  useEffect(() => {
      setText(defaultValue);
  }, [defaultValue]);

  // classnames
  const classes = classNames(className, {
    [`${cls}`]: true,
    [`${cls}--${kind}`]: true,
    [`${cls}--${size}`]: true,
    [`${cls}--disabled`]: disabled || skeleton,
    [`${cls}--error`]: (isError && !isFocus) || error,
    [`${cls}--date`]: type === 'date',
    [`${cls}--skeleton`]: skeleton,
  });
  const labelClassnames = classNames(`${cls}--label`, {
    [`${cls}--active`]: isActive,
    [`${cls}--disabled`]: disabled,
  });

  // functions
  const setActiveLabel = () => {
    if (!disabled) {
      setIsActive(true);
      labelRef.current.focus();
    }
  };

  // handlers
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus(e);
    setIsActive(true);
    setIsFocus(true);
    setError(false);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);
    setIsFocus(false);

    if (isText.toString().length > 0 || type === 'date') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (required && isText === '') {
      setError(true);
    } else if (required && isText.toString().length > 0) {
      setError(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      onChange(e);
      setText(e.target.value);
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown(e);
    // input type='number' edge case bug fixed
    if (type === 'number') {
      if (e.key === 'e' || e.key === '.') {
        e.preventDefault();
      }
      if (e.currentTarget.value.length > 0) {
        if (e.key === '+' || e.key === '-') {
          e.preventDefault();
        }
      }
    }
  };

  return (
    <div className={`${cls}--wrapper`}>
      <input
        type={type}
        value={isText}
        ref={labelRef}
        className={classes}
        id={autocompleteId}
        name={autocompleteId}
        disabled={disabled || skeleton}
        placeholder={!isActive && `${label} ${required ? '*' : ''}`}
        onBlur={e => handleBlur(e)}
        onClick={e => handleClick(e)}
        onFocus={e => handleFocus(e)}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleKeyDown(e)}
        {...rest}
      />
      {label && !skeleton && (
        <label className={labelClassnames} onClick={e => setActiveLabel()}>
          {label} {required && <span>*</span>}
        </label>
      )}
      {(isError || error) && (
        <p className={`${cls}--errorText`} onClick={e => setActiveLabel()}>
          {errorText}
        </p>
      )}
      {!isError && !error && helperText && (
        <p className={`${cls}--helperText`} onClick={e => setActiveLabel()}>
          {helperText}
        </p>
      )}
    </div>
  );
};

const defaultProps: InputProps = {
  size: 'md',
  type: 'text',
  kind: 'primary',
  autocompleteId: 'on',
  label: '',
  errorText: '',
  className: '',
  helperText: '',
  defaultValue: '',
  error: false,
  required: false,
  disabled: false,
  skeleton: false,
  readOnly: false,
  onBlur: () => {},
  onClick: () => {},
  onFocus: () => {},
  onChange: () => {},
  onKeyDown: () => {},
};

Input.defaultProps = defaultProps;

export default Input;
