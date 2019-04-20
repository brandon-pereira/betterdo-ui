import React, { Component } from 'react';
import styled from 'styled-components';
import Loader from './loader';
import Icon from './icon';
import { QUERIES } from '../constants';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    ${props =>
        !props.visible &&
        `
        visibility: hidden;
        pointer-events: none;
    `}
`;
const ModalContent = styled.div``;
const _Modal = styled.div`
    position: absolute;
    top: ${props => props.theme.top || '50%'};
    left: ${props => props.theme.left || '50%'};
    bottom: ${props => props.theme.bottom || 'auto'};
    right: ${props => props.theme.right || 'auto'};
    transform:  ${props =>
        props.theme.transformFrom || 'translate(-50%, -50%)'};
    transform-origin: center;
    transition: transform 0.2s;
    backface-visibility: hidden;
    width: ${props => props.theme.mobileWidth || '100%'};
    max-width: 500px;
    ${ModalContent} {
        box-sizing: border-box;
        transition: all .2s;
        transform: ${props =>
            !props.theme.transformFrom ? 'scale(0)' : 'none'};
        background: ${props => props.theme.background || '#fff'};
        padding: 1rem;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
        overflow-y: scroll;
        max-height: 100vh;
        width: 100%;
        height: 100%;
    }
    ${props =>
        props.visible &&
        `
        transform: ${props.theme.transformTo || 'translate(-50%, -50%)'};
        ${ModalContent} {
            transform: scale(1);
        }
    `}
    @media ${QUERIES.medium} {
        width: 60%;
    }
`;
const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
`;
const ModalClose = styled(Icon)`
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    filter: drop-shadow(0 1px #555);
`;

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this._resizer = null;
        this.dimensions = {
            height: 0,
            width: 0
        };
        this.state = {
            loading: true,
            content: null
        };
        this.ref = React.createRef();
    }

    closeModal(e) {
        const isBackgroundClick = !e || e.currentTarget === e.target;
        if (isBackgroundClick) {
            const canCloseModal =
                typeof this.props.canCloseModal === 'function'
                    ? this.props.canCloseModal()
                    : true;
            if (canCloseModal) {
                this.setState({ content: null });
                this.props.onRequestClose();
            }
        }
    }

    componentDidMount() {
        if (this.props.asyncContent && this.props.visible) {
            this.loadContent();
            this.initializeResizer();
        }
    }

    componentWillUnmount() {
        this.destroyResizer();
    }

    componentDidUpdate() {
        if (
            !this.state.content &&
            this.props.asyncContent &&
            this.props.visible
        ) {
            this.loadContent();
            this.initializeResizer();
        }

        if (!this.props.visible) {
            this.destroyResizer();
        }
    }

    initializeResizer() {
        this._resizer = () => {
            if (this.props.onResize && this.ref.current) {
                this.props.onResize(this.ref.current.getBoundingClientRect());
            }
        };
        window.addEventListener('resize', this._resizer, { passive: true });
    }

    destroyResizer() {
        window.removeEventListener('resize', this._resizer);
    }

    async loadContent() {
        const content = await this.props.asyncContent();
        this.setState({
            content: content.default,
            loading: false
        });
    }

    getModalContent() {
        if (this.state.loading) {
            return (
                <LoaderContainer>
                    <Loader color="#006fb0" size="4rem" loading={true}>
                        Loading...
                    </Loader>
                </LoaderContainer>
            );
        } else if (this.state.content) {
            const childrenProps = {};
            Object.keys(this.props).forEach(key => {
                if (key.startsWith('childProp_')) {
                    childrenProps[key.replace('childProp_', '')] = this.props[
                        key
                    ];
                }
            });
            return (
                <this.state.content
                    {...childrenProps}
                    closeModal={e => this.closeModal(e)}
                />
            );
        } else {
            return this.props.children;
        }
    }

    render() {
        return (
            <Overlay
                visible={this.props.visible}
                onClick={e => this.closeModal(e)}
            >
                <_Modal ref={this.ref} visible={this.props.visible}>
                    <ModalContent>
                        <ModalClose
                            icon="x"
                            color="#a9a9a9"
                            size="1rem"
                            onClick={() => this.closeModal()}
                        >
                            Close
                        </ModalClose>
                        {this.getModalContent()}
                    </ModalContent>
                </_Modal>
            </Overlay>
        );
    }
}
