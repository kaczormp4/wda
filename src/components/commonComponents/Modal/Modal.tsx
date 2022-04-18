import React, { FC} from 'react';
import "./Modal.scss";
import { cssPrefix } from '../../../config';
import { Portal } from '../../Portal/Portal';
import FocusTrap from 'focus-trap-react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cls = `${cssPrefix}-modal`;

export type ModalProps = {
    heading?: string,
    className?: string,
    open: boolean,
    onClose?: Function,
    primaryButtonText?: string,
    secondaryButtonText?: string,
    passive?: boolean
}

const Modal: FC<ModalProps> = (props: React.PropsWithChildren<ModalProps>) => {
    const { className, heading, open, passive, onClose, primaryButtonText, secondaryButtonText, children } = props;

    const closeModal = () => {
        onClose();
    }


    return <Portal divId="categoryModal">
        <FocusTrap active={open} focusTrapOptions={{ allowOutsideClick: true, returnFocusOnDeactivate: false }}>
                <div className={`${cls}--wrapper`}>
                    <div className={`${cls}--modal-container`}>
                        <header className={`${cls}--header`}>
                            <span className={`${cls}--header--text`}>{heading}</span>
                            <Button kind="ghost" iconOnly onClick={() => closeModal()} icon={<FontAwesomeIcon icon="xmark" />}></Button>
                        </header>
                        <div className={`${cls}--body`}>{children}</div>
                        {!passive && <footer>
                            {/* TODO buttons */}
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
    onClose: () => { },
    primaryButtonText: "OK",
    secondaryButtonText: "Zamknij"
}

Modal.defaultProps = defaultProps;

export default Modal;
