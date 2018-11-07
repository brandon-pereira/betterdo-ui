import React, { Component } from 'react';
import styled from 'styled-components';
import { Header } from './copy';
import Loader from './loader';
import Icon from './icon';

const Overlay = styled.div`
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;
const _Modal = styled.div`
    display: block;
    background: #fff;
    width: 60%;
    max-width: 600px;
    padding: 1rem;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
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
            if (this.props.onResize) {
                this.props.onResize();
            }
        };
        window.addEventListener('resize', this._resizer);
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
                <_Modal>
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
