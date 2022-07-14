import { GlobeIcon, UserGroupIcon } from '@heroicons/react/outline';
import { Close, Content, Root, Trigger } from '@radix-ui/react-popover';
import type { ReplyPermission } from '@twitter-clone/prisma';
import clsx from 'clsx';

const FOLLOWERS = 'FOLLOWERS';
const EVERYONE = 'EVERYONE';

interface PermissionsPopupProps {
  setReplyPermissions: (replyPermission: ReplyPermission) => void;
  replyPermissions: 'EVERYONE' | 'FOLLOWERS';
}

export default function PermissionsPopup({
  setReplyPermissions,
  replyPermissions,
}: PermissionsPopupProps) {
  const isEveryone = replyPermissions === EVERYONE;
  const isFollowers = replyPermissions === FOLLOWERS;
  const ActiveIcon = isEveryone ? GlobeIcon : UserGroupIcon;

  return (
    <Root>
      <Trigger>
        <div className="flex justify-between">
          <div className="flex items-center group">
            <ActiveIcon className="inline mr-2 cursor-pointer h-7 text-twitterBlue group-hover:text-blue-800" />
            <span className="hidden text-twitterBlue group-hover:text-blue-800 md:block">
              {isEveryone ? 'Everyone can reply' : 'Followers can only reply'}
            </span>
          </div>
        </div>
      </Trigger>

      <Content className="p-3 mt-10 bg-white border-2 shadow-sm rounded-xl border-grayHover animate-slideUpAndFade">
        <p className="font-medium font-poppins">Who can reply?</p>
        <p className="font-light text text-gray3">Choose who can reply to this Tweet.</p>

        <div className="flex flex-col mt-2">
          <CloseButton
            type={isEveryone}
            Icon={GlobeIcon}
            label="Everyone"
            onClick={() => setReplyPermissions(EVERYONE)}
          />

          <CloseButton
            type={isFollowers}
            Icon={UserGroupIcon}
            label="People You Follow"
            onClick={() => setReplyPermissions(FOLLOWERS)}
          />
        </div>
      </Content>
    </Root>
  );
}

const CloseButton = ({
  type,
  Icon,
  label,
  onClick,
}: {
  type: boolean;
  Icon: React.ComponentType;
  label: string;
  onClick: () => void;
}) => {
  return (
    <Close
      aria-pressed={type}
      className={clsx(
        'flex px-2 py-4 mb-1 rounded-lg hover:bg-grayHover item-center',
        type && 'bg-gray4 hover:bg-gray4',
      )}
      onClick={onClick}
    >
      <Icon className="w-6 h-6 mr-2" />
      {label}
    </Close>
  );
};
