import React, { useRef } from 'react';
import "./Button.scss";
import { cssPrefix } from '../../../config';
import classNames from 'classnames';

const cls = `${cssPrefix}-btn`;
enum POSITIONS {
    RIGHT = 'right',
    TOP = 'top',
    LEFT = 'left',
    BOTTOM = 'bottom'
};

export type ButtonProps = {
    className?: string,
    disabled?: boolean,
    skeleton?: boolean,
    active?: boolean,
    kind?: 'primary' | 'secondary' | 'teritiary' | 'ghost',
    danger?: boolean,
    size?: 'sm' | 'md' | 'lg',
    type?: "button" | "submit" | "reset",
    onBlur?: Function,
    onClick?: Function,
    onFocus?: Function,
    onKeyDown?: Function,
    icon?: any,
    iconOnly?: boolean,
    iconPosition?: string,
    iconDescription?: string,
    counter?: string | number,
    [rest: string]: any;
}

const getIcon = (icon: ButtonProps["icon"]) => {
    const Icon = icon;
    return Icon;
}

const handleRipple = (ev: React.MouseEvent, ripple: HTMLSpanElement) => {
    const button = ev.currentTarget as HTMLButtonElement;
    const buttonWrapper = button.parentElement;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    if (ripple) {
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${ev.pageX - buttonWrapper.offsetLeft - radius}px`;
        ripple.style.top = `${ev.pageY - buttonWrapper.offsetTop - radius}px`;
        ripple.className = `${cls}--ripple`;
        button.appendChild(ripple);
    }
};

const handleClick = (ev: React.MouseEvent, onClick: Function, ripple: HTMLSpanElement) => {
    ev.stopPropagation();
    ev.preventDefault();
    handleRipple(ev, ripple);
    onClick(ev);
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, disabled, skeleton, active, type, kind, danger, size, onBlur, onClick, onFocus, onKeyDown, icon, iconOnly, iconDescription, iconPosition, counter, children, ...rest } = props;
    const ripple = useRef<HTMLSpanElement>(null);

    const classes = classNames(className, {
        [`${cls}`]: true,
        [`${cls}--${kind}`]: true,
        [`${cls}--${size}`]: true,
        [`${cls}--disabled`]: disabled || skeleton,
        [`${cls}--icon-${iconPosition}`]: icon && !iconOnly,
        [`${cls}--skeleton`]: skeleton,
        [`${cls}--danger`]: danger,
        [`active`]: active,
        [`${cls}--icon-only`]: iconOnly,
    });

    return <div className={`${cls}--wrapper`}>
        <button
            className={classes}
            disabled={disabled || skeleton}
            title={(iconOnly && iconDescription) ? iconDescription : ''}
            onClick={(e) => handleClick(e, onClick, ripple.current)}
            onFocus={(e) => onFocus(e)}
            onBlur={(e) => onBlur(e)}
            onKeyDown={(e) => onKeyDown(e)}
            tabIndex={0}
            ref={ref}
            type={type}
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
        {counter && <div className={`${cls}--counter`}>{counter}</div>}
    </div>
});

const defaultProps: ButtonProps = {
    className: '',
    disabled: false,
    skeleton: false,
    active: false,
    kind: 'primary',
    danger: false,
    size: 'md',
    type: 'button',
    onBlur: () => { },
    onClick: () => { },
    onFocus: () => { },
    onKeyDown: () => { },
    icon: null,
    iconPosition: POSITIONS.RIGHT,
    iconDescription: null,
    iconOnly: false
}

Button.defaultProps = defaultProps;

export default Button;
