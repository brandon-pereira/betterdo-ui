import React from 'react';

import { Block, CreatorBlock, ProfilePic } from './EditTask.styles.js';
import RelativeTime from './RelativeTime';

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

export default _CreatorBlock;
