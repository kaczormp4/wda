import React, { useEffect, useRef, useState } from 'react';
import './../Select/Select.scss';
import { cssPrefix } from '../../../config';
import classNames from 'classnames';
import { uniqueId } from 'lodash';
import Button, { ButtonProps } from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FocusTrap from 'focus-trap-react';
import { Directions, isOutOfBounds } from '../hooks/flyoutUtils';
import { ISelectItem } from '../Select/Select';

const cls = `${cssPrefix}-select`;

export type SelectProps = {
  className?: string;
  disabled?: boolean;
  skeleton?: boolean;
  error?: boolean;
  errorText?: string;
  kind?: 'primary' | 'secondary' | 'teritiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  items: ISelectItem[];
  defaultSelected: string[] | number[];
  onChange: Function;
  [rest: string]: any;
  buttonProps: ButtonProps;
};

const Select = React.forwardRef<HTMLButtonElement, SelectProps>((props, ref) => {
  const {
    className,
    disabled,
    skeleton,
    error,
    errorText,
    kind,
    size,
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    children,
    items,
    buttonProps,
    onChange,
    defaultSelected,
    ...rest
  } = props;
  const selectItems = [{ id: -1, text: 'Nie wybrano', value: -1 }, ...items];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id] = useState<string>(uniqueId('select_'));
  const [selectedItems, setSelectedItems] = useState<ISelectItem[]>(
    defaultSelected?.length > 0
      ? selectItems.filter(v => defaultSelected.includes(v.id as never))
      : [selectItems[0]]
  );
  const selectListRef = useRef<HTMLDivElement>();
  const openSelect = (ev: any) => {
    document.addEventListener('mouseup', clickOutsideFn);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let defaultItems: ISelectItem[] = [];
    const itemsIDs = items.map((v) => v.id.toString());
    if(defaultSelected) {
      defaultSelected.forEach((v) => {
        if(itemsIDs.includes(v.toString())) {
          defaultItems.push(items.find((item) => v == item.id))
        }
      })
  
      setSelectedItems(defaultItems);

    }
  }, [defaultSelected]);

  useEffect(() => {
    if (isOpen) {
      if (isOutOfBounds(selectListRef.current).includes(Directions.BOTTOM)) {
        selectListRef.current.classList.add(`${cls}--top`);
      }
    }
  }, [isOpen]);

  const closeSelect = () => {
    document.removeEventListener('mouseup', clickOutsideFn);
    setIsOpen(false);
  };

  const selectItem = (item: ISelectItem) => {
    let newSelectedItems: ISelectItem[] = [];
    if (item.id === -1) {
      newSelectedItems = [selectItems[0]];
    } else if (selectedItems.some(v => item.id === v.id)) {
      newSelectedItems = selectedItems.filter(v => v.id !== item.id);
      if(newSelectedItems.length === 0) {
        newSelectedItems = [selectItems[0]];
      }
    } else {
      const filteredItems = [...selectedItems].filter(v => v.id !== -1);
      newSelectedItems = [item, ...filteredItems];
    }
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  const clickOutsideFn = (ev: MouseEvent) => {
    const eventIds = ev.composedPath().map(v => {
      const el = v as HTMLElement;
      return el.id;
    });
    if (!eventIds.includes(id)) {
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

  const isSelected = (itemId: ISelectItem['id']) => {
    if (itemId === -1) {
      return Boolean(selectedItems.filter(v => v.id === -1).length);
    }
    return selectedItems.map(v => v.id).includes(itemId);
  };

  return (
    <>
      <div className={`${cls}--wrapper`}>
        <div id={id}>
          <Button
            disabled={disabled}
            skeleton={skeleton}
            kind={kind}
            size={size}
            type={'button'}
            icon={<FontAwesomeIcon className={chevronCls} icon="chevron-down" />}
            iconDescription={'Otwórz'}
            onClick={openSelect}
            active={isOpen}
            {...buttonProps}
          >
            {selectedItems?.length === 1
              ? selectedItems[0].text
              : `${selectedItems[0].text} +${selectedItems.length - 1}`}
          </Button>
          {isOpen && (
            <FocusTrap
              active={isOpen}
              focusTrapOptions={{ allowOutsideClick: true, returnFocusOnDeactivate: false }}
            >
              <div role="listbox" className={classes} ref={selectListRef} {...rest}>
                {selectItems.map(v => {
                  return (
                    <button
                      key={v.id}
                      id={String(v.id)}
                      className={`${cls}-list--item`}
                      title={v.text}
                      role="option"
                      type="button"
                      aria-selected={isSelected(v.id)}
                      tabIndex={0}
                      value={v.id}
                      onClick={() => selectItem(v)}
                    >
                      <span>{v.text}</span>
                      {isSelected(v.id) ? <FontAwesomeIcon icon="check" /> : <></>}
                    </button>
                  );
                })}
              </div>
            </FocusTrap>
          )}
        </div>
        {error && <p className={`${cls}--errorText`}>{errorText}</p>}
      </div>
    </>
  );
});

const defaultProps: SelectProps = {
  className: '',
  disabled: false,
  skeleton: false,
  error: false,
  errorText: '',
  kind: 'ghost',
  size: 'md',
  items: [],
  defaultSelected: null,
  onChange: () => {},
  buttonProps: {},
};

Select.defaultProps = defaultProps;

export default Select;
