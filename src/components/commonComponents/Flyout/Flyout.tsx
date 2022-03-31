import React, { FC, useState, useRef, useEffect } from 'react';
import "./Flyout.scss";
import Button from './../Button/Button';
import { ButtonProps } from './../Button/Button';
import { cssPrefix } from '../../../config';
import { uniqueId } from 'lodash';
import { FlyoutDirection, setFlyoutPositionig } from './../hooks/flyoutUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Portal } from '../../Portal/Portal';
import FocusTrap from 'focus-trap-react';

const cls = `${cssPrefix}-flyout`;

type FlyoutProps = {
    buttonProps?: ButtonProps,
    CustomTrigger?: Function,
    buttonSize?: "md" | "sm" | "lg",
    icon?: any,
    direction?: string,
    disabled?: boolean,
    closeOnClickOutside?: boolean,
    onOpen?: Function,
    onClose?: Function,
    open?: boolean,
    useAutoPositioning?: boolean,
    useAbsolutePositioning?: boolean,
    focusTrap?: boolean,
    renderInPortal?: boolean
}

const Flyout: FC<FlyoutProps> = (props: React.PropsWithChildren<FlyoutProps>) => {
    const { buttonProps, buttonSize, CustomTrigger, icon, direction, disabled,
        closeOnClickOutside, useAutoPositioning, renderInPortal,
        children, onClose, onOpen, focusTrap, useAbsolutePositioning, open } = props;
    const [isOpen, setIsOpen] = useState<boolean>(open || false);
    const [id] = useState<string>(uniqueId('flyout_'));
    const triggerId = `trigger_${id}`;
    const buttonRef = useRef<any>(null);
    const flyoutRef = useRef<any>(null);
    useEffect(() => {
        // isOpen callback 
        // - used to trigger positioning function
        // - used for observing clickoutisde ev
        // - used for observing Esc ev
        const clickOutsideFn = (ev: MouseEvent) => {
            const eventIds = ev.composedPath().map((v) => {
                const el = v as HTMLElement;
                return el.id;
            })
            if (!(eventIds.includes(id) || eventIds.includes(triggerId))) {
                setIsOpen(false);
                document.removeEventListener('mouseup', clickOutsideFn);
            }
        };

        const escFunction = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                document.addEventListener('keydown', escFunction);
                setIsOpen(false);
            }
        };

        const observeClickOutside = () => {
            document.addEventListener('mouseup', clickOutsideFn);
        }

        const observeEscEvent = () => {
            document.addEventListener('keydown', escFunction);
        }

        if (isOpen) {
            observeEscEvent();
            if (closeOnClickOutside)
                observeClickOutside();
            setFlyoutPositionig(direction, useAutoPositioning, useAbsolutePositioning, buttonRef.current, flyoutRef.current);
            onOpen && onOpen();
        } else {
            document.removeEventListener('mouseup', clickOutsideFn);
            document.removeEventListener('keydown', escFunction);
            onClose && onClose();
        }
    }, [isOpen]);



    const positionMenu = (ev: React.MouseEvent) => {
        setIsOpen(!isOpen);
    }

    const checkBlur = (ev: React.FocusEvent) => {
        if (!focusTrap && closeOnClickOutside) {
            if (!ev.relatedTarget || !(ev.relatedTarget.id === id || ev.relatedTarget.id === triggerId))
                setIsOpen(false);
        }
    }


    const renderFlyout = () => isOpen
        && <FocusTrap active={focusTrap && isOpen} focusTrapOptions={{ allowOutsideClick: true }}>
            <div className={`${cls}`} ref={flyoutRef} id={id}>
                {children}
            </div>
        </FocusTrap>;

    const triggerProps = {
        ref: buttonRef, id: `trigger_${id}`, active: isOpen,
        disabled: disabled, icon: icon, size: buttonSize, ...buttonProps,
        onClick: (e: React.MouseEvent) => positionMenu(e),
        onBlur: (e: React.FocusEvent) => checkBlur(e)
    }

    return <div className={`${cls}--wrapper`} >
        <Button {...triggerProps} />
        <div
            className={`${cls}--anchor`}
        >
            {renderInPortal
                ? <Portal divId={`portal_${id}`}>{renderFlyout()}</Portal>
                : renderFlyout()}
        </div>
    </div>
}

const defaultProps: FlyoutProps = {
    buttonProps: { iconOnly: true },
    buttonSize: 'md',
    icon: <FontAwesomeIcon icon="adjust" />,
    direction: FlyoutDirection.BottomStart,
    disabled: false,
    onOpen: null,
    onClose: null,
    open: undefined,
    closeOnClickOutside: true,
    useAutoPositioning: true,
    useAbsolutePositioning: false,
    focusTrap: false,
    renderInPortal: false
}

Flyout.defaultProps = defaultProps;

export default Flyout;
