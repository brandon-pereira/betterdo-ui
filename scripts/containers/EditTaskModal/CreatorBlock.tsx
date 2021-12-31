import React from 'react';

import { Block, CreatorBlock, ProfilePic } from './EditTask.styles.js';
import RelativeTime from './RelativeTime';

interface Props {
    createdBy: {
        firstName: string;
        lastName: string;
    };
    creationDate: string;
}

function _CreatorBlock({ createdBy, creationDate }: Props) {
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
