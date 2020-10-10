import React, { Component, Fragment } from 'react';
import Button from '@components/Button';
import { Label, Error } from '@components/forms';
import Toggle from '@components/toggle';
// import Dropdown from '../../components/dropdown';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const OptionGroup = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    margin: 0 -1rem;
    &:first-of-type {
        padding-top: 0.5rem;
    }
    &:nth-of-type(even) {
        background: #eee;
    }
    > div {
        flex: 1;
        margin-right: 1rem;
    }
`;

const Description = styled.p`
    margin-top: -0.2rem;
    font-size: 0.9rem;
`;

@inject('store')
@observer
class ListMembers extends Component {
    constructor(props) {
        super(props);
        const user = this.props.store.user;
        console.log(user);
        this.state = {
            isSaving: false,
            serverError: null,
            isBeta: user.isBeta,
            isPushEnabled: user.isPushEnabled
        };
    }

    validate() {
        if (!this.state.firstName) {
            this.setState({ isInvalid: 'firstName' });
            return false;
        } else if (!this.state.email) {
            this.setState({ isInvalid: 'email' });
            return false;
        }
        return true;
    }

    async onSubmit() {
        if (this.state.isSaving) {
            return;
        }
        this.setState({
            isSaving: true,
            serverError: null
        });
        const store = this.props.store;
        try {
            await store.updateUser({
                isBeta: this.state.isBeta,
                isPushEnabled: this.state.isPushEnabled
            });
        } catch (err) {
            this.setState({
                isSaving: false,
                serverError: err.formattedMessage
            });
            return;
        }
        this.setState({ isSaving: false });
    }

    logout() {
        if (window) {
            window.location.href = `${process.env.ROOT_APP_DIR}auth/logout`;
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.serverError && (
                    <Error>{this.state.serverError}</Error>
                )}
                <OptionGroup>
                    <div>
                        <Label>Notifications</Label>
                        <Description>
                            These are used to notify you when a task is due and
                            when a friend updates a shared list.
                        </Description>
                    </div>
                    <Toggle
                        onChange={(e, bool) => {
                            this.setState(
                                {
                                    isPushEnabled: bool
                                },
                                this.onSubmit
                            );
                        }}
                        checked={this.state.isPushEnabled}
                    />
                </OptionGroup>
                <OptionGroup>
                    <div>
                        <Label>Beta Program</Label>
                        <Description>
                            Join the beta program to help test exclusive
                            features before anyone else.{' '}
                            <strong>Beta program currently full.</strong>
                        </Description>
                    </div>
                    <Toggle
                        disabled
                        onChange={(e, bool) => {
                            this.setState({ isBeta: bool }, this.onSubmit);
                        }}
                        checked={this.state.isBeta}
                    />
                </OptionGroup>
                {/* <OptionGroup>
                    <div>
                        <Label>Timezone</Label>
                        <Description>
                            Update your current timezone. This will affect when
                            items appear in your custom lists as well as
                            notification times.
                        </Description>
                    </div>
                    <Dropdown
                        values={[
                            { key: 1, label: 'two' },
                            { key: 1, label: 'three' },
                            { key: 1, label: 'fifteen' }
                        ]}
                    />
                </OptionGroup> */}
                <OptionGroup>
                    <div>
                        <Label>Logout</Label>
                        <Description>
                            Clear your current session and return to login
                            screen.
                        </Description>
                    </div>
                    <Button onClick={() => this.logout()} color={COLORS.red}>
                        Logout
                    </Button>
                </OptionGroup>
            </Fragment>
        );
    }
}

export default ListMembers;
