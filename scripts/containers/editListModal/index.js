import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '@components/Modal';
@inject('store')
@observer
class EditListModalContainer extends Component {
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
                asyncContent={() => import('./content')}
            />
        );
    }
}
export default EditListModalContainer;
