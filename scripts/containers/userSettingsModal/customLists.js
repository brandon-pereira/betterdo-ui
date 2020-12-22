import React, { Component, useCallback, Fragment, useState } from 'react';
import { Body } from '../../components/copy';
import { Error } from '../../components/forms';
import Icon from '../../components/icon';
import Toggle from '../../components/toggle';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const CustomListsContainer = styled.ol`
    position: relative;
    padding: 0;
    margin: 0 -1rem;
    background: ${COLORS.navigationBackground};
`;
const CustomList = styled.li`
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

class ListMembers extends Component {
    constructor(props) {
        super(props);
        const user = this.props.store.user;
        this.state = {
            serverError: null,
            customLists: user.customLists
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

    async onCustomListToggle(id, bool) {
        this.setState({
            serverError: null
        });
        try {
            await this.props.store.updateUser({
                customLists: {
                    [id]: bool
                }
            });
        } catch (err) {
            this.setState({
                serverError: err.formattedMessage
            });
            return;
        }
    }

    // render() {}
}

const CUSTOM_LISTS = [
    {
        id: 'highPriority',
        title: 'High Priority',
        icon: 'bookmarks'
    },
    {
        id: 'today',
        title: 'Today',
        icon: 'alarm'
    },
    {
        id: 'tomorrow',
        title: 'Tomorrow',
        icon: 'calendar'
    }
];
function CustomListSettings() {
    const [error, setError] = useState(null);
    const [customLists] = useState({
        customLists: {
            highPriority: true
        }
    });
    const onCustomListToggle = useCallback(async (id, bool) => {
        this.setState({
            serverError: null
        });
        try {
            await this.props.store.updateUser({
                customLists: {
                    [id]: bool
                }
            });
        } catch (err) {
            this.setState({
                serverError: err.formattedMessage
            });
            return;
        }
    }, []);

    return (
        <Fragment>
            {error && <Error>{error}</Error>}
            <Body>
                Enable or disable custom lists to customize your BetterDo
                experience.
            </Body>
            <CustomListsContainer>
                {CUSTOM_LISTS.map(list => (
                    <CustomList key={list.id}>
                        <IconHolder>
                            <Icon icon={list.icon} color="#fff" />
                        </IconHolder>
                        <Title>{list.title}</Title>
                        <Toggle
                            onChange={(e, bool) =>
                                onCustomListToggle(list.id, bool)
                            }
                            checked={customLists[list.id]}
                        />
                    </CustomList>
                ))}
            </CustomListsContainer>
        </Fragment>
    );
}

export default CustomListSettings;
