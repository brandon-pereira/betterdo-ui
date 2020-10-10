import React, { useContext } from 'react';

function createSharedHook() {
    const Context = React.createContext();

    function Provider({ children, value }) {
        return <Context.Provider value={value}>{children}</Context.Provider>;
    }

    function useConsumer() {
        const ctx = useContext(Context);

        if (!ctx) {
            throw new Error(
                'Missing provider or no value supplied to provider.'
            );
        }

        return ctx;
    }

    return { useConsumer, Context, Provider };
}

export default createSharedHook;
