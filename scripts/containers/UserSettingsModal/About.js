import React from 'react';

import { Container, Logo } from './About.styles';

function About() {
    return (
        <Container>
            <Logo />
            <h1>BetterDo.</h1>
            <h2>Version {process.env.VERSION}</h2>
        </Container>
    );
}

export default About;
