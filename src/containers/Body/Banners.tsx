import ServerError from '@components/Icon/svgs/server-error.svg';
import Banner from '@components/Banner';

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
