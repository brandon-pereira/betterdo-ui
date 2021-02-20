import React, { useEffect } from 'react';
import loadable from '@loadable/component';

import { Container, Logo, ChangeLog } from './About.styles';

const ChangeLogLoader = loadable.lib(() => import('../../../CHANGELOG.md'));

function About() {
    useEffect(() => {}, []);
    return (
        <Container>
            <Logo />
            <h1>BetterDo.</h1>
            <h2>Version {process.env.VERSION}</h2>
            <ChangeLogLoader>
                {({ default: changelogHtml }) => (
                    <ChangeLog
                        dangerouslySetInnerHTML={{ __html: changelogHtml }}
                    />
                )}
            </ChangeLogLoader>
        </Container>
    );
}

export default About;
