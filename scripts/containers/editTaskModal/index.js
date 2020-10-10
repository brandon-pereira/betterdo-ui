import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '@components/Modal';
import { ThemeProvider } from 'styled-components';

@inject('store')
@observer
class AddListModalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasUnsavedChanges: false
        };
    }
    get visible() {
        return this.props.store.currentTask;
    }

    get theme() {
        return {
            background: '#eee',
            left: 'auto',
            right: '0',
            top: '0',
            bottom: '0',
            mobileWidth: '90%',
            transformTo: 'none',
            transformFrom: 'translateX(100%)'
        };
    }

    setUnsavedChanges(bool) {
        this.setState({ hasUnsavedChanges: bool });
    }

    close() {
        this.props.store.currentTask = null;
        this.setState({ hasUnsavedChanges: false });
    }

    canCloseModal() {
        if (!this.state.hasUnsavedChanges) {
            return true;
        } else {
            return Boolean(
                confirm(
                    `You've made changes that aren't saved. Are you sure you want to discard them?`
                )
            );
        }
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Modal
                    onRequestClose={this.close.bind(this)}
                    canCloseModal={this.canCloseModal.bind(this)}
                    visible={this.visible}
                    //  TODO: This doesn't work...
                    childProps={{
                        setUnsavedChanges: this.setUnsavedChanges.bind(this)
                    }}
                    asyncContent={() => import('./content')}
                />
            </ThemeProvider>
        );
    }
}

export default AddListModalContainer;
