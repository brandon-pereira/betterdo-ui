import React, { Component } from 'react';
import styled from 'styled-components';
import { Header } from './copy';
import Loader from './loader';
import Icon from './icon';
import { QUERIES } from '../constants';

const Overlay = styled.div`
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
`;
const _Modal = styled.div`
    position: absolute;
    top: ${props => props.theme.top || '50%'};
    left: ${props => props.theme.left || '50%'};
    bottom: ${props => props.theme.bottom || 'auto'};
    right: ${props => props.theme.right || 'auto'};
    transform: ${props => props.theme.transform || 'translate(-50%, -50%)'};
    background: ${props => props.theme.background || '#fff'};
    width: 100%;
    max-width: 500px;
    padding: 1rem;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    overflow-y: scroll;
    @media ${QUERIES.medium} {
        width: 60%;
    }
`;
const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    h2 {
        margin-bottom: 0;
    }
`;
const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
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
            this.setState({ content: null });
            this.props.onRequestClose();
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
            return <this.state.content closeModal={e => this.closeModal(e)} />;
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
                <_Modal innerRef={this.ref}>
                    <HeaderContainer>
                        <Header>{this.props.title || ''}</Header>
                        <Icon
                            icon="x"
                            color="#a9a9a9"
                            size="1rem"
                            onClick={() => this.closeModal()}
                        >
                            Close
                        </Icon>
                    </HeaderContainer>
                    {this.getModalContent()}
                </_Modal>
            </Overlay>
        );
    }
}
