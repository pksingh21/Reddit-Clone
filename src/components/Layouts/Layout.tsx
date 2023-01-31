import React, { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
type LayoutProps = {
    children : React.ReactNode
}
const Layout: React.FC <LayoutProps>= ( props:LayoutProps ) => {
    return (
        <>
            <Navbar />
            <main>{props.children}</main>
        </>
    )
}
export default Layout;