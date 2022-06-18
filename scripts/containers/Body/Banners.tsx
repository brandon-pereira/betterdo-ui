import React from 'react';
import BetterDo from '@components/Icon/svgs/betterdo.svg?component';
import ServerError from '@components/Icon/svgs/server-error.svg?component';

import Banner from '@components/Banner';

export function AllCaughtUpBanner() {
    return <Banner icon={BetterDo} body="You're all caught up!" />;
}

export function ServerErrorBanner() {
    return (
        <Banner
            icon={ServerError}
            title="Oops!"
            body="There was an issue connecting to the server."
            buttonText="Reload"
            buttonAction={() => {
                window.location.reload();
            }}
        />
    );
}
