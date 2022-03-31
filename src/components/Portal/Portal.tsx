import { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom';

interface PortalProps {
    children: ReactNode,
    divId: string
}

export const Portal: FC<PortalProps> = ({ children, divId }) => {
    return children && ReactDOM.createPortal(
        <div id={divId}>
            {children}
        </div>,
        document.body
    )
}