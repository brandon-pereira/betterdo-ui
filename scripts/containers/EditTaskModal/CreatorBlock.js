import React from 'react';
import loadable from '@loadable/component';
import { Block, CreatorBlock, ProfilePic } from './EditTask.styles';

function _CreatorBlock({ createdBy, creationDate }) {
    if (!createdBy) {
        return null;
    }
    return (
        <CreatorBlock>
            <ProfilePic user={createdBy} />
            <Block>
                Created by {createdBy.firstName} {createdBy.lastName}
                <br />
                Created <RelativeTime date={new Date(creationDate)} />
            </Block>
        </CreatorBlock>
    );
}

function RelativeTime({ date }) {
    return <div>{date}</div>;
}

export default _CreatorBlock;
