import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '../../components/Modal';

@inject('store')
@observer
class UserSettingsModal extends Component {
    get visible() {
        return this.props.store.modalVisibility.userSettings;
    }

    set visible(bool) {
        this.props.store.modalVisibility.userSettings = bool;
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

export default UserSettingsModal;
