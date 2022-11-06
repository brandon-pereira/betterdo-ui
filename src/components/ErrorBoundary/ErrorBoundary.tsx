import { Component } from 'react';

import { Container, Icon, Button } from './ErrorBoundary.styles';

import ServerError from '@components/Icon/svgs/server-error.svg';

interface Props {
    children: React.ReactChild;
}
class ErrorBoundary extends Component<
    Props,
    { hasError: boolean; errorMessage?: string }
> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            includesStackTrace: true,
            errorMessage: error.stack
        };
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <Container>
                    <h1>
                        <Icon icon={ServerError} size="5rem" />
                        Unexpected Error!
                    </h1>

                    <p>
                        {`We'll look into this error. It's probably an issue on our
                    end. Please share the below error with us!`}
                    </p>
                    <pre>{this.state.errorMessage}</pre>
                    <Button
                        onClick={() => window.location.reload()}
                        color="rgba(0,0,0,.3)"
                    >
                        Reload
                    </Button>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
