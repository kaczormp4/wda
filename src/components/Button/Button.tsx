import React, { FC, useRef } from 'react';
import "./Button.scss";
import { cssPrefix } from '../../config';
import classNames from 'classnames';

const cls = `${cssPrefix}-btn`;
enum POSITIONS  {
    RIGHT = 'right',
    TOP = 'top',
    LEFT = 'left',
    BOTTOM = 'bottom'
};

type ButtonProps = {
    className?: string,
    disabled?: boolean,
    skeleton?: boolean,
    kind?: 'primary' | 'secondary' | 'teritiary' | 'ghost',
    danger?: boolean,
    size?: 'sm' | 'md' | 'lg',
    onBlur?: Function,
    onClick?: Function,
    onFocus?: Function,
    icon?: any,
    iconOnly?: boolean,
    iconPosition?: string,
    iconDescription?: string,
    [rest: string]: any;
}



const getIcon = (icon: ButtonProps["icon"]) => {
    const Icon = icon;
    return Icon;
}

const handleRipple = (ev: React.MouseEvent, ripple: HTMLSpanElement) => {
    const button = ev.currentTarget as HTMLButtonElement;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    if (ripple) {
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${ev.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${ev.clientY - button.offsetTop - radius}px`;
        ripple.className = `${cls}--ripple`;
        button.appendChild(ripple);
    }
};

const handleClick = (ev: React.MouseEvent, onClick: Function, ripple: HTMLSpanElement) => {
    handleRipple(ev, ripple);
    onClick(ev);
};

const Button: FC<ButtonProps> = (props: React.PropsWithChildren<ButtonProps>) => {
    const { className, disabled, skeleton, kind, danger, size, onBlur, onClick, onFocus, icon, iconOnly, iconDescription, children, ...rest } = props;
    const ripple = useRef<HTMLSpanElement>(null);

    const classes = classNames(className, {
        [`${cls}`]: true,
        [`${cls}--${kind}`]: true,
        [`${cls}--${size}`]: true,
        [`${cls}--disabled`]: disabled || skeleton,
        [`${cls}--icon-${props.iconPosition}`]: icon && !iconOnly,
        [`${cls}--skeleton`]: skeleton,
        [`${cls}--danger`]: danger,
        [`${cls}--icon-only`]: iconOnly,
    });

    return <button
        className={classes}
        disabled={disabled || skeleton}
        title={iconOnly && iconDescription}
        onClick={(e) => handleClick(e, onClick, ripple.current)}
        onFocus={(e) => onFocus(e)}
        {...rest}
    >
        {!iconOnly && <span className={`${cls}--text`}>
            {children}
        </span>}
        {icon && <span className={`${cls}--icon ${iconOnly ? `${cls}--icon-only` : ''}`}>
            {getIcon(icon)}
        </span>}
        <span ref={ripple} className={`${cls}--ripple`}></span>
    </button>
}

const defaultProps: ButtonProps = {
    className: '',
    disabled: false,
    skeleton: false,
    kind: 'primary',
    danger: false,
    size: 'md',
    onBlur: () => { },
    onClick: () => { },
    onFocus: () => { },
    icon: null,
    iconPosition: POSITIONS.RIGHT,
    iconDescription: null,
    iconOnly: false
}

Button.defaultProps = defaultProps;

export default Button;
