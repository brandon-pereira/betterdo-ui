import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '../../components/modal';

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
                title="Settings"
                asyncContent={() => import('./content')}
            />
        );
    }
}

export default UserSettingsModal;
