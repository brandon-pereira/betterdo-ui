import loadable from '@loadable/component';

import { Container, Logo, ChangeLog } from './About.styles';

import { VERSION } from '@utilities/env';

const ChangeLogLoader = loadable.lib(() => import('../../../../CHANGELOG.md'));

function About() {
    return (
        <Container>
            <Logo />
            <h1>BetterDo.</h1>
            <h2>Version {VERSION}</h2>
            <ChangeLogLoader>
                {({ html: changelog }) => (
                    <ChangeLog
                        dangerouslySetInnerHTML={{ __html: changelog }}
                    />
                )}
            </ChangeLogLoader>
        </Container>
    );
}

export default About;
