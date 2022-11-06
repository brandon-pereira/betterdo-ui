import { LoaderContainer } from './Modal.styles';

import Loader from '@components/Loader';

function ModalLoader() {
    return (
        <LoaderContainer>
            <Loader color="#006fb0" size="4rem" isVisible={true} />
        </LoaderContainer>
    );
}

export default ModalLoader;
