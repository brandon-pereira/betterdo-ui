import React from 'react';
import { SWRConfig } from 'swr';

function SWRProvider({ children }) {
    return (
        <SWRConfig
            value={{
                // revalidateOnMount: false,
                //   refreshInterval: 3000,
                fetcher: async (...args) => {
                    const res = await fetch(...args, {
                        credentials: 'include'
                    });
                    if (res.status >= 400) {
                        if (res.status === 401) {
                            window.location.href =
                                window.origin + '/auth/google';
                        }
                        let error = 'Unexpected Error';
                        try {
                            const data = await res.json();
                            error = data.error;
                        } catch (err) {
                            error = 'Internal Error';
                        }
                        console.error('API Request Failed!', ...args, error);
                        throw new Error(error);
                    }

                    return await res.json();
                }
            }}
        >
            {children}
        </SWRConfig>
    );
}

export default SWRProvider;
