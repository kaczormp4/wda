import React, { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom';

const navbarMenuMobile = document.getElementById('navbarMenuMobile');

interface NavbarMobileProviderProps {
    children: ReactNode
}
export const NavbarMobileProvider: FC<NavbarMobileProviderProps> = ({ children }) => {
    return ReactDOM.createPortal(
        <>
            {children}
        </>,
        navbarMenuMobile
    )
}
