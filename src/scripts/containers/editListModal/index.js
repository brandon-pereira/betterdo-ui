import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '../../components/modal';
@inject('store')
@observer
export default class AddListModalContainer extends Component {
    get visible() {
        return this.props.store.modalVisibility.editList;
    }

    set visible(bool) {
        this.props.store.modalVisibility.editList = bool;
        return bool;
    }

    render() {
        return (
            <Modal
                onRequestClose={() => (this.visible = false)}
                visible={this.visible}
                title="Edit List"
                asyncContent={() => import('./content')}
            />
        );
    }
}
