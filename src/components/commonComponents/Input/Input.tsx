import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { cssPrefix } from '../../../config';
import "./Input.scss";

const cls = `${cssPrefix}-input`;
type InputProps = {
    className?: string,
    disabled?: boolean,
    kind?: 'primary' | 'outlined' | 'filled',
    type?: 'text' | 'password' | 'number',
    label?: string,
    size?: 'sm' | 'md',
    defaultValue?: string,
    error?: boolean,
    errorText?: string,
    readOnly?: boolean,
    onBlur?: Function,
    onClick?: Function,
    onChange?: Function,
    onFocus?: Function
}

const Input: FC<InputProps> = (props) => {
    const { className, disabled, kind, type, size, defaultValue, onBlur, onClick, onChange, error, errorText, readOnly, onFocus, label } = props;
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [text, setText] = useState<string>(defaultValue);
    const labelRef = useRef<any>(null);

    useEffect(() => {
        if (text.length > 0) {
            setIsActive(true);
        }
    }, [])

    const classes = classNames(className, {
        [`${cls}`]: true,
        [`${cls}--${kind}`]: true,
        [`${cls}--${size}`]: true,
        [`${cls}--disabled`]: disabled,
        [`${cls}--error`]: error && !isFocus,
    });
    const labelClassnames = classNames(`${cls}--label`, {
        [`${cls}--active`]: isActive,
        [`${cls}--disabled`]: disabled,
    })

    const setActiveLabel = () => {
        if (!disabled) {
            setIsActive(true);
            labelRef.current.focus();
        }
    }
    const handleFocus = (e: any) => {
        setIsFocus(true);
        setIsActive(true);
        onFocus(e)
    }
    const handleBlur = (e: any) => {
        onBlur(e)
        setIsFocus(false);
        if (text.length > 0) {
            setIsActive(true);
        } else {
            setIsActive(false)
        }
    }
    const handleChange = (e: any) => {
        if (!readOnly) {
            onChange(e)
            setText(e.target.value)
        }
    }

    return <div className={`${cls}--wrapper`}>
        <input
            type={type}
            className={classes}
            disabled={disabled}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
            onClick={(e) => onClick(e)}
            onFocus={(e) => handleFocus(e)}
            ref={labelRef}
            value={text}
        />
        {
            error && <p className={`${cls}--errorText`} onClick={(e) => setActiveLabel()}>{errorText}</p>
        }
        {
            label && <label className={labelClassnames} onClick={(e) => setActiveLabel()}>{label}</label>
        }
    </div>
}

const defaultProps: InputProps = {
    className: '',
    disabled: false,
    kind: 'primary',
    type: 'text',
    size: 'md',
    defaultValue: '',
    error: false,
    errorText: '',
    label: '',
    readOnly: false,
    onBlur: () => { },
    onClick: () => { },
    onFocus: () => { },
    onChange: () => { },
}

Input.defaultProps = defaultProps;

export default Input;