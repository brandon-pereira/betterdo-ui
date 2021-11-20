import React from 'react';

import { Container, Icon, Heading, BodyCopy, Button } from './Banner.styles.js';

const Banner = ({ title, body, buttonText, buttonAction, icon, className }) => (
    <Container className={className}>
        <Icon size="30vmin" icon={icon} />
        <Heading>{title}</Heading>
        <BodyCopy>{body}</BodyCopy>
        {buttonText && (
            <Button color="grey" onClick={buttonAction}>
                {buttonText}
            </Button>
        )}
    </Container>
);

export default Banner;
