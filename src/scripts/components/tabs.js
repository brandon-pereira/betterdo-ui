import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const TabsHeader = styled.ol`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    border: 2px solid ${props => props.color};
    border-radius: 3px;
    margin-bottom: 1rem;
`;
const TabHeaderItem = styled.li`
    flex: 1;
    text-align: center;
    border-right: 1px solid ${props => props.color};
    padding: 0.4rem;
    cursor: pointer;
    color: ${props => props.color};
    ${props =>
        props.selected &&
        `
        background-color: ${props.color};
        color: #fff;
        cursor: default;
    `}
    &:last-of-type {
        border-right: none;
    }
`;

const TabsBody = styled.div``;
const TabBodyItem = styled.div`
    display: none;
    ${props =>
        props.selected &&
        `
        display: block;
    `}
`;

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedIndex || 0
        };
    }

    selectTab(index) {
        this.setState({ selectedIndex: index });
    }

    render() {
        return (
            <Container>
                <TabsHeader color={this.props.color || 'cyan'}>
                    {this.props.titles.map((title, index) => (
                        <TabHeaderItem
                            key={index}
                            selected={this.state.selectedIndex === index}
                            onClick={() => this.selectTab(index)}
                            color={this.props.color || 'cyan'}
                        >
                            {title}
                        </TabHeaderItem>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {React.Children.map(this.props.children, (value, index) => {
                        return React.cloneElement(value, {
                            index,
                            selected: index === this.state.selectedIndex
                        });
                    })}
                </TabsBody>
            </Container>
        );
    }
}

export const Tab = TabBodyItem;
export default Tabs;
