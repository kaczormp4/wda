import React, { useEffect, useRef, useState } from 'react';
import "./Select.scss";
import { cssPrefix } from '../../../config';
import classNames from 'classnames';
import { uniqueId } from 'lodash';
import Button, { ButtonProps } from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FocusTrap from 'focus-trap-react';
import { Directions, isOutOfBounds } from '../hooks/flyoutUtils';

const cls = `${cssPrefix}-select`;

export interface ISelectItem {
    id: string,
    text: string
}

export type SelectProps = {
    className?: string,
    disabled?: boolean,
    skeleton?: boolean,
    kind?: 'primary' | 'secondary' | 'teritiary' | 'ghost',
    size?: 'sm' | 'md' | 'lg',
    items: ISelectItem[],
    defaultSelected?: string,
    onChange: Function,
    [rest: string]: any;
    buttonProps: ButtonProps;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>((props, ref) => {
    const { className, disabled, skeleton, kind, size, onBlur, onClick, onFocus, onKeyDown, children, items, buttonProps, onChange, defaultSelected, ...rest } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [id] = useState<string>(uniqueId('select_'));
    const [selectedItem, setSelectedItem] = useState<ISelectItem>(items.find((v) => v.id === defaultSelected) || items[0]);
    const selectListRef = useRef<HTMLDivElement>();
    const openSelect = (ev: any) => {
        document.addEventListener('mouseup', clickOutsideFn);
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (isOpen) {
            if (isOutOfBounds(selectListRef.current).includes(Directions.BOTTOM)) {
                selectListRef.current.classList.add(`${cls}--top`);
            };
        }
    }, [isOpen]);

    const closeSelect = () => {
        document.removeEventListener('mouseup', clickOutsideFn);
        setIsOpen(false);
    }

    const selectItem = (item: ISelectItem) => {
        setSelectedItem(item);
        onChange(item);
        closeSelect();
    }

    const clickOutsideFn = (ev: MouseEvent) => {
        const eventIds = ev.composedPath().map((v) => {
            const el = v as HTMLElement;
            return el.id;
        })
        if (!(eventIds.includes(id))) {
            closeSelect();
        }
    };

    const classes = classNames(className, {
        [`${cls}-list`]: true,
        [`${cls}--${kind}`]: true,
        [`${cls}--${size}`]: true,
    });

    const chevronCls = classNames({
        [`${cls}--icon`]: true,
        [`${cls}--icon--rotated`]: isOpen,
    });

    const isSelected = (itemId: string) => {
        return itemId === selectedItem.id;
    }

    return <div className={`${cls}--wrapper`} id={id}>
        <Button
            disabled={disabled} skeleton={skeleton} kind={kind} 
            size={size} type={'button'} icon={<FontAwesomeIcon className={chevronCls} icon="chevron-down" />} iconDescription={'Otwórz'}
            onClick={openSelect} active={isOpen}
            {...buttonProps}
        >{selectedItem.text}</Button>
        {isOpen &&
            <FocusTrap active={isOpen} focusTrapOptions={{ allowOutsideClick: true, returnFocusOnDeactivate: false }}>
                <div role="listbox" className={classes} ref={selectListRef}>
                    {items.map((v) => {
                        return <button key={v.id} id={v.id} className={`${cls}-list--item`} title={v.text}
                            role="option" aria-selected={isSelected(v.id)} tabIndex={0}
                            onClick={() => selectItem(v)}>
                                <span>{v.text}</span>
                                {isSelected(v.id) ? <FontAwesomeIcon icon="check" /> : <></>}</button>
                    })}
                </div>
            </FocusTrap>
        }
    </div>
});

const defaultProps: SelectProps = {
    className: '',
    disabled: false,
    skeleton: false,
    kind: 'ghost',
    size: 'md',
    items: [],
    defaultSelected: null,
    onChange: () => { },
    buttonProps: {}
}

Select.defaultProps = defaultProps;

export default Select;
