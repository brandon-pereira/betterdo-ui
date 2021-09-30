import.meta.hot;
import React, { useEffect } from 'react';
import loadable from '@loadable/component';

import { Container, Logo, ChangeLog } from './About.styles.js';

const ChangeLogLoader = loadable.lib(() => import('../../../CHANGELOG.md'));

function About() {
    useEffect(() => {}, []);
    return (
        <Container>
            <Logo />
            <h1>BetterDo.</h1>
            <h2>Version {__SNOWPACK_ENV__.VERSION}</h2>
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
