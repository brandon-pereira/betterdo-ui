import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '../../components/modal';

@inject('store')
@observer
export default class AddListModalContainer extends Component {
    get visible() {
        return this.props.store.currentTask;
    }

    close() {
        this.props.store.currentTask = null;
    }

    render() {
        return (
            <Modal
                onRequestClose={this.close.bind(this)}
                visible={this.visible}
                title="Edit Task"
                asyncContent={() => import('./content')}
            />
        );
    }
}
