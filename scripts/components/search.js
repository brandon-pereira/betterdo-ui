import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1rem 0.5rem;
    box-sizing: border-box;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    input {
        width: auto;
        appearance: none;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        outline: none;
        color: #fff;
        border-radius: 10px;
        padding: 0.5rem;
        box-sizing: border-box;
        width: 100%;
    }
`;

class Search extends Component {
    render() {
        return (
            <Container>
                <input aria-label="Search" placeholder="Search..." />
            </Container>
        );
    }
}

export default Search;
