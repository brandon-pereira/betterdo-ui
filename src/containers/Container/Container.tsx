import { _Container } from './Container.styles';

import useHamburgerNav from '@hooks/useHamburgerNav';

function Container({ children }: { children: React.ReactNode }) {
    const [isMobileNavVisible] = useHamburgerNav();
    return (
        <_Container $isMobileNavVisible={isMobileNavVisible}>
            {children}
        </_Container>
    );
}

export default Container;
