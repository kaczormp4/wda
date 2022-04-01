// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';

export enum FlyoutDirection {
    BottomStart = 'bottom-start',
    BottomEnd = 'bottom-end',
    TopStart = 'top-start',
    TopEnd = 'top-end',
    LeftStart = 'left-start',
    LeftEnd = 'left-end',
    RightStart = 'right-start',
    RightEnd = 'right-end',
};

const Directions = {
    BOTTOM: 'bottom',
    TOP: 'top',
    LEFT: 'left',
    RIGHT: 'right',
}

/**
 * Use for checking if passed element is out of bounds (OOB).
 * 
 * If element is not fully visible in viewport, it returns in which directions
 * element sticks out
 */
function isOutOfBounds(el: HTMLElement): string[] {
    const rect = el.getBoundingClientRect();

    const T = rect.top >= 0 ? '' : 'top';
    const R = rect.right <= (window.innerWidth || document.documentElement.clientWidth) ? '' : 'right';
    const B = rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) ? '' : 'bottom';
    const L = rect.left >= 0 ? '' : 'left';
    return [T, R, B, L].filter(Boolean);
}

function getCoords(el: HTMLElement, useAbsolutePositioning = false) {
    const box = el.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    const top = useAbsolutePositioning ? box.top : box.top + scrollTop - clientTop;
    const left = useAbsolutePositioning ? box.left : box.left + scrollLeft - clientLeft;


    return { top: Math.round(top), left: Math.round(left) };
}

/**
 * This is used as the callback for positiong of Flyout menu.
 * May be used in a future for all other "flying" components, like tooltips
 * 
 * It returns position and size of the flying component
 */
export const setFlyoutPositionig = (
    direction: string = FlyoutDirection.BottomStart,
    useAutoPositioning = true,
    useAbsolutePositioning = false,
    triggerEl: HTMLElement = null,
    flyoutEl: HTMLElement = null
) => {
    const positions = {
        trigger: triggerEl.getBoundingClientRect(),
        flyout: flyoutEl.getBoundingClientRect(),
    }
    const returnPos: { top?: string, bottom?: string, left?: string, right?: string } = {};
    const directions = direction.split('-');
    const elCords = getCoords(triggerEl, useAbsolutePositioning);
    switch (directions[0]) {
        case Directions.BOTTOM: {
            returnPos.top = `${elCords.top + positions.trigger.height}px`; break;
        }
        case Directions.TOP: {
            returnPos.top = `${elCords.top - positions.flyout.height}px`; break;
        }
        case Directions.LEFT: {
            returnPos.left = `${elCords.left - positions.flyout.width}px`; break;
        }
        case Directions.RIGHT: {
            returnPos.left = `${elCords.left + positions.trigger.width}px`; break;
        }
    }
    switch (direction) {
        case FlyoutDirection.BottomStart:
        case FlyoutDirection.TopStart: {
            returnPos.left = `${elCords.left}px`; break;
        }
        case FlyoutDirection.BottomEnd:
        case FlyoutDirection.TopEnd: {
            returnPos.left = `${elCords.left - positions.flyout.width + positions.trigger.width}px`; break;
        }
        case FlyoutDirection.LeftStart:
        case FlyoutDirection.RightStart: {
            returnPos.top = `${elCords.top}px`; break;
        }
        case FlyoutDirection.LeftEnd:
        case FlyoutDirection.RightEnd: {
            returnPos.top = `${elCords.top + positions.trigger.height - positions.flyout.height}px`; break;
        }
    }

    Object.keys(returnPos).forEach(((v: any) => {
        flyoutEl.style[v] = (returnPos as any)[v];
    }));
    if (useAutoPositioning) {
        const OOB = isOutOfBounds(flyoutEl);
        OOB.forEach((v) => {
            switch (v) {
                case Directions.TOP: {
                    returnPos.top = `${elCords.top + positions.trigger.height}px`; break;
                }
                case Directions.BOTTOM: {
                    returnPos.top = `${elCords.top - positions.flyout.height}px`; break;
                }
                case Directions.RIGHT: {
                    returnPos.left = `${elCords.left - positions.flyout.width}px`; break;
                }
                case Directions.LEFT: {
                    returnPos.left = `${elCords.left + positions.trigger.width}px`; break;
                }
            }
        });
        Object.keys(returnPos).forEach(((v: any) => {
            flyoutEl.style[v] = (returnPos as any)[v];
        }));
    }
};