import { LoaderContainer } from './EditTask.styles';

import _Loader from '@components/Loader';

const Loader = () => (
    <LoaderContainer>
        <_Loader color="#006fb0" size="4rem" isVisible={true} />
    </LoaderContainer>
);

export default Loader;
