import React, { Component } from 'react';
import styled from 'styled-components';
import { QUERIES } from '../constants';
import { observer, inject } from 'mobx-react';

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 0px 1fr;
    grid-template-rows: 4rem 1fr;
    ${props =>
        props.mobileNavVisible &&
        `
          grid-template-rows: 4rem 60% 4rem 1fr;  
    `}
    @media ${QUERIES.medium} {
        grid-template-columns: 10rem 1fr;
        grid-template-rows: 4rem 1fr;
    }
    @media ${QUERIES.large} {
        grid-template-columns: 14rem 1fr;
    }
`;

@inject('store')
@observer
class Container extends Component {
    render() {
        return (
            <Div mobileNavVisible={this.props.store.modalVisibility.listsView}>
                {this.props.children}
            </Div>
        );
    }
}

export default styled(Container)``;
