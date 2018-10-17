import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '../../components/modal';
@inject('state')
@observer
export default class AddListModalContainer extends Component {
    get visible() {
        return this.props.state.modalVisibility.newList;
    }

    set visible(bool) {
        this.props.state.modalVisibility.newList = bool;
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
