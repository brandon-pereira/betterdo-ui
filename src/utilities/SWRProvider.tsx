import { SWRConfig } from 'swr';

import { SERVER_URL } from '@utilities/env';

function SWRProvider({ children }: { children: React.ReactChild }) {
    return (
        <SWRConfig
            value={{
                fetcher: async (url: string) => {
                    const res = await fetch(url, {
                        credentials: 'include'
                    });
                    if (res.status >= 400) {
                        if (res.status === 401) {
                            window.location.href = SERVER_URL + '/auth/google';
                        }
                        let error = 'Unexpected Error';
                        try {
                            const data = await res.json();
                            error = data.error;
                        } catch (err) {
                            error = 'Internal Error';
                        }
                        console.error('API Request Failed!', url, error);
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
