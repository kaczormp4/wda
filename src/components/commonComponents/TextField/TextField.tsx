import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { cssPrefix } from '../../../config';
import "./TextField.scss";

const cls = `${cssPrefix}-text-field`;
type TextFieldProps = {
    id?: string,
    kind?: 'primary' | 'outlined' | 'filled',
    label?: string,
    errorText?: string,
    className?: string,
    defaultValue?: string,
    maxLength?: number,
    error?: boolean,
    required?: boolean,
    disabled?: boolean,
    skeleton?: boolean,
    readOnly?: boolean,
    onBlur?: Function,
    onClick?: Function,
    onFocus?: Function,
    onChange?: Function,
    onKeyDown?: Function
}

const TextField: FC<TextFieldProps> = (props) => {
    const {
        id, kind, label, errorText, className, defaultValue,
        error, required, disabled, skeleton, readOnly, maxLength,
        onBlur, onClick, onFocus, onChange, onKeyDown,
    } = props;

    // hooks
    const [isError, setError] = useState<boolean>(error);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isText, setText] = useState<typeof defaultValue>(defaultValue);

    const labelRef = useRef<any>(null);

    useEffect(() => {
        if (isText.toString().length > 0) {
            setIsActive(true);
        }
    }, [])

    // classnames
    const wrapperClasses = classNames(className, {
        [`${cls}--wrapper`]: true,
        [`${cls}--skeleton`]: skeleton,
    });
    const classes = classNames(className, {
        [`${cls}`]: true,
        [`${cls}--${kind}`]: true,
        [`${cls}--disabled`]: disabled || skeleton,
        [`${cls}--error`]: (isError && !isFocus) || error,
    });
    const labelClassnames = classNames(`${cls}--label`, {
        [`${cls}--active`]: isActive,
        [`${cls}--disabled`]: disabled,
    })

    // functions
    const setActiveLabel = () => {
        if (!disabled) {
            setIsActive(true);
            labelRef.current.focus();
        }
    }

    // handlers
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        onFocus(e);
        setIsActive(true);
        setIsFocus(true);
        setError(false);
    }
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        onBlur(e);
        setIsFocus(false);

        if (isText.toString().length > 0) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        if (required && isText === "") {
            setError(true);
        } else if (required && isText.toString().length > 0) {
            setError(false);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!readOnly) {
            onChange(e);
            setText(e.target.value);
        }
    }
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        onClick(e);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyDown(e);
    }

    return <div className={wrapperClasses}>
        <textarea
            value={isText}
            ref={labelRef}
            className={classes}
            id={id}
            maxLength={maxLength}
            disabled={disabled || skeleton}
            placeholder={!isActive && `${label} ${required ? '*' : ''}`}
            onBlur={(e) => handleBlur(e)}
            onClick={(e) => handleClick(e)}
            onFocus={(e) => handleFocus(e)}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
        />
        {
            label && !skeleton && <label className={labelClassnames} onClick={(e) => setActiveLabel()}>{label} {required && <span>*</span>}</label>
        }
        {
            (isError || error) && <p className={`${cls}--errorText`} onClick={(e) => setActiveLabel()}>{errorText}</p>
        }
        {
            (!isError && !error) && maxLength && <p className={`${cls}--helperText`} onClick={(e) => setActiveLabel()}>{`${isText.length} / ${maxLength}`}</p>
        }
    </div>
}

const defaultProps: TextFieldProps = {
    id: 'textfield',
    kind: 'primary',
    label: '',
    errorText: '',
    className: '',
    defaultValue: '',
    error: false,
    required: false,
    disabled: false,
    skeleton: false,
    maxLength: null,
    readOnly: false,
    onBlur: () => { },
    onClick: () => { },
    onFocus: () => { },
    onChange: () => { },
    onKeyDown: () => { },
}

TextField.defaultProps = defaultProps;

export default TextField;