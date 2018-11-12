import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from '../../components/modal';
@inject('store')
@observer
export default class AddListModalContainer extends Component {
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

    calculatePosition(coords) {
        console.log(coords);
    }

    render() {
        return (
            <Modal
                ref={this.ref}
                onResize={this.calculatePosition.bind(this)}
                onRequestClose={() => (this.visible = false)}
                visible={this.visible}
                title="Create List"
                asyncContent={() => import('./content')}
            />
        );
    }
}
