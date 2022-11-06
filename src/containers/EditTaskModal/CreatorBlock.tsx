import { Block, CreatorBlock, ProfilePic } from './EditTask.styles';
import RelativeTime from './RelativeTime';

import User from '@customTypes/user';

interface Props {
    createdBy: User;
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
