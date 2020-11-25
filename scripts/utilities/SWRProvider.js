import React from 'react';
import { SWRConfig } from 'swr';

function SWRProvider({ children }) {
    return (
        <SWRConfig
            value={{
                // revalidateOnMount: false,
                //   refreshInterval: 3000,
                fetcher: async (...args) => {
                    // console.log(args);
                    const res = await fetch(...args, {
                        credentials: 'include'
                        // method: 'POST'
                    });

                    // const res = await fetch('/api/teams/my-team')

                    if (res.status === 401) throw new Error('Not authorized');
                    // if (res.status === 404) return { team: null };
                    // if (res.status === 200) return { team: await res.json() };

                    return await res.json();
                }
            }}
        >
            {children}
        </SWRConfig>
    );
}

export default SWRProvider;
