import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '../../components/modal';
import { ThemeProvider } from 'styled-components';

@inject('store')
@observer
export default class AddListModalContainer extends Component {
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
            transform: 'none'
        };
    }

    close() {
        this.props.store.currentTask = null;
    }

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <Modal
                    onRequestClose={this.close.bind(this)}
                    visible={this.visible}
                    title="Edit Task"
                    asyncContent={() => import('./content')}
                />
            </ThemeProvider>
        );
    }
}
