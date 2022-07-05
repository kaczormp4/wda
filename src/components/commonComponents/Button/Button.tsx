import React, { useRef } from 'react';
import './Button.scss';
import { cssPrefix } from '../../../config';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

const cls = `${cssPrefix}-btn`;
enum POSITIONS {
  RIGHT = 'right',
  TOP = 'top',
  LEFT = 'left',
  BOTTOM = 'bottom',
}

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  skeleton?: boolean;
  active?: boolean;
  kind?: 'primary' | 'secondary' | 'teritiary' | 'ghost';
  renderAsLink?: boolean;
  danger?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  onBlur?: Function;
  onClick?: Function;
  onFocus?: Function;
  onKeyDown?: Function;
  icon?: any;
  iconOnly?: boolean;
  iconPosition?: string;
  iconDescription?: string;
  counter?: string | number;
  [rest: string]: any;
};



const getIcon = (icon: ButtonProps['icon']) => {
  const Icon = icon;
  return Icon;
};

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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    disabled,
    skeleton,
    active,
    type,
    kind,
    renderAsLink,
    danger,
    size,
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    icon,
    iconOnly,
    iconDescription,
    iconPosition,
    counter,
    children,
    ...rest
  } = props;
  const ripple = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  const handleClick = (ev: React.MouseEvent, onClick: Function, ripple: HTMLSpanElement) => {
    ev.stopPropagation();
    ev.preventDefault();
    handleRipple(ev, ripple);
    onClick(ev);
  };
  
  const handleLinkClick = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    navigate(rest.href);
  };
  
  const handleMouseDown = (ev: React.MouseEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
    if(ev.button === 1) {
        window.open(rest.href, '_blank', 'noopener,noreferrer')
    }
  };

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

  const element = renderAsLink ? 'a' : 'button';

  const buttonChildren = (
    <>
      {!iconOnly && <span className={`${cls}--text`}>{children}</span>}
      {icon && (
        <span className={`${cls}--icon ${iconOnly ? `${cls}--icon-only` : ''}`}>
          {getIcon(icon)}
        </span>
      )}
      <span ref={ripple} className={`${cls}--ripple`}></span>
    </>
  );
  const Button = React.createElement(
    element,
    {
      className: classes,
      disabled: disabled || skeleton,
      title: iconOnly && iconDescription ? iconDescription : '',
      onClick: renderAsLink ? e => handleLinkClick(e) : e => handleClick(e, onClick, ripple.current),
      onMouseDown: renderAsLink ? e => handleMouseDown(e) : null,
      onFocus: e => onFocus(e),
      onBlur: e => onBlur(e),
      onKeyDown: e => onKeyDown(e),
      tabIndex: 0,
      ref: ref,
      type: type,
      ...rest,
    },
    buttonChildren
  );

  return (
    <div className={`${cls}--wrapper`}>
      {Button}
      {counter && <div className={`${cls}--counter`}>{counter}</div>}
    </div>
  );
});

const defaultProps: ButtonProps = {
  className: '',
  disabled: false,
  skeleton: false,
  active: false,
  kind: 'primary',
  renderAsLink: false,
  danger: false,
  size: 'md',
  type: 'button',
  onBlur: () => {},
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  icon: null,
  iconPosition: POSITIONS.RIGHT,
  iconDescription: null,
  iconOnly: false,
};

Button.defaultProps = defaultProps;

export default Button;
