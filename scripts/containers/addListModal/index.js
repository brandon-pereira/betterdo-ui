import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '../../components/modal';
@inject('store')
@observer
class AddListModalContainer extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    get visible() {
        return this.props.store.modalVisibility.newList;
    }

    set visible(bool) {
        this.props.store.modalVisibility.newList = bool;
        return bool;
    }

    calculatePosition() {}

    render() {
        return (
            <Modal
                ref={this.ref}
                onResize={this.calculatePosition.bind(this)}
                onRequestClose={() => (this.visible = false)}
                visible={this.visible}
                asyncContent={() => import('./content')}
            />
        );
    }
}
export default AddListModalContainer;
