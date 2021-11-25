import.meta.hot;
import React from 'react';
import loadable from '@loadable/component';

import { Container, Logo, ChangeLog } from './About.styles.js';

import { VERSION } from '@utilities/env';

const ChangeLogLoader = loadable.lib(() => import('../../../CHANGELOG.md'));

function About() {
    return (
        <Container>
            <Logo />
            <h1>BetterDo.</h1>
            <h2>Version {VERSION}</h2>
            <ChangeLogLoader>
                {({ default: changelog }) => (
                    <ChangeLog
                        dangerouslySetInnerHTML={{ __html: changelog.html }}
                    />
                )}
            </ChangeLogLoader>
        </Container>
    );
}

export default About;
