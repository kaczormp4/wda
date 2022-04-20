import React, { FC} from 'react';
import "./Modal.scss";
import { cssPrefix } from '../../../config';
import { Portal } from '../../Portal/Portal';
import FocusTrap from 'focus-trap-react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const cls = `${cssPrefix}-modal`;

export type ModalProps = {
    heading?: string,
    className?: string,
    open: boolean,
    onClose?: Function,
    action?: Function,
    primaryButtonText?: string,
    secondaryButtonText?: string,
    passive?: boolean
    disabled?: boolean
}

const Modal: FC<ModalProps> = (props: React.PropsWithChildren<ModalProps>) => {
    const { className, heading, open, passive, onClose, action, primaryButtonText, secondaryButtonText, disabled, children } = props;

    const closeModal = () => {
        onClose();
    }


    return <Portal divId="categoryModal">
        <FocusTrap active={open} focusTrapOptions={{ allowOutsideClick: true, returnFocusOnDeactivate: false }}>
                <div className={classNames(`${cls}--wrapper`, className)}>
                    <div className={`${cls}--modal-container`}>
                        <header className={`${cls}--header`}>
                            <span className={`${cls}--header--text`}>{heading}</span>
                            <Button kind="ghost" iconOnly disabled={disabled} onClick={() => closeModal()} icon={<FontAwesomeIcon icon="xmark" />}></Button>
                        </header>
                        <div className={`${cls}--body`}>{children}</div>
                        {!passive && <footer className={`${cls}--footer`}>
                            <Button kind="ghost" size="lg" onClick={() => closeModal()}>{secondaryButtonText}</Button>
                            <Button kind="primary" size="lg" disabled={disabled} onClick={action}>{primaryButtonText}</Button>
                        </footer>}
                    </div>
                </div>
        </FocusTrap>
    </Portal >
};

const defaultProps: ModalProps = {
    heading: null,
    className: null,
    open: true,
    passive: false,
    disabled: false,
    onClose: () => { },
    action: () => { },
    primaryButtonText: "OK",
    secondaryButtonText: "Zamknij"
}

Modal.defaultProps = defaultProps;

export default Modal;
