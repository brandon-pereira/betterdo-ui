import React from 'react';
import { SWRConfig } from 'swr';

function SWRProvider({ children }) {
    return (
        <SWRConfig
            value={{
                //   refreshInterval: 3000,
                fetcher: (...args) => {
                    // console.log(args);
                    return fetch(...args, {
                        credentials: 'include'
                        // method: 'POST'
                    }).then(res => res.json());
                }
            }}
        >
            {children}
        </SWRConfig>
    );
}

export default SWRProvider;
