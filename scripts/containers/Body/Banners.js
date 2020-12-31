import React from 'react';
import Banner from '@components/banner';

export function AllCaughtUpBanner() {
    return <Banner icon="betterdo" body="You're all caught up!" />;
}

export function ServerErrorBanner() {
    return (
        <Banner
            icon="server-error"
            title="Oops!"
            body="There was an issue connecting to the server."
            buttonText="Reload"
            buttonAction={() => {
                window.location.reload();
            }}
        />
    );
}
