import React, { createContext, useState } from 'react';

export const UiContext = createContext();

export const UiProvider = ({ children }) => {
    const [menu, setMenu] = useState(false);

    const showMenu = () => {
        setMenu(false);
    }

    const hideMenu = () => {
        setMenu(true);
    }

    return (
        <UiContext.Provider value={{
            menu,
            showMenu,
            hideMenu
        }}>
            {children}
        </UiContext.Provider>
    )
}
