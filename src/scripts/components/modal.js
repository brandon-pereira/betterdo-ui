import React, { Component } from 'react';
import styled from 'styled-components';

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
const Modal = styled.div`
    display: block;
    background: #fff;
    width: 60%;
    max-width: 600px;
    padding: 1rem;
`;

export default class Header extends Component {
    constructor(props) {
        super(props);
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
        }
    }

    componentDidUpdate() {
        if (
            !this.state.content &&
            this.props.asyncContent &&
            this.props.visible
        ) {
            this.loadContent();
        }
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
            return <span>Loading...</span>;
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
                <Modal>{this.getModalContent()}</Modal>
            </Overlay>
        );
    }
}
