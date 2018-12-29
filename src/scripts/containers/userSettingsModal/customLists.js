import React, { Component, Fragment } from 'react';
import { Label } from '../../components/forms';
import Icon from '../../components/icon';
import Toggle from '../../components/toggle';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const CustomListsContainer = styled.ol`
    position: relative;
    padding: 0;
    margin: 0 -1rem;
    background: ${COLORS.navigationBackground};
`;
const CustomList = styled.li`
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    box-shadow: 0 1px rgba(255, 255, 255, 0.15);
    padding: 0 0.5rem;
`;
const Title = styled.span`
    flex: 1;
    padding: 1rem 1rem 1rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const IconHolder = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${Icon} {
        filter: drop-shadow(0 1px #000);
    }
`;

@inject('store')
@observer
class ListMembers extends Component {
    constructor(props) {
        super(props);
        const user = this.props.store.user;
        this.state = {
            isSaving: false,
            isInvalid: false,
            serverError: null
        };
        this.lists = {
            highPriority: {
                title: 'High Priority',
                icon: 'bookmarks'
            },
            today: {
                title: 'Today',
                icon: 'alarm'
            },
            tomorrow: {
                title: 'Tomorrow',
                icon: 'calendar'
            }
        };
    }

    render() {
        return (
            <Fragment>
                <Label>
                    Enable or disable custom lists to customize your BetterDo
                    experience.
                </Label>

                <CustomListsContainer>
                    {Object.entries(this.lists).map(([id, value]) => {
                        return (
                            <CustomList>
                                <IconHolder>
                                    <Icon icon={value.icon} color="#fff" />
                                </IconHolder>
                                <Title>{value.title}</Title>
                                <Toggle />
                            </CustomList>
                        );
                    })}
                </CustomListsContainer>
            </Fragment>
        );
    }
}

export default ListMembers;
