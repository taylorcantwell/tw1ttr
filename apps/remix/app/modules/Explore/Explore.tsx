import { SearchIcon } from '@heroicons/react/solid';
import TextareaAutosize from 'react-textarea-autosize';
import { AsideMenu, PrimaryButton } from '~/modules/shared';
import { PrimaryLayoutContainer } from '~/modules/shared/Layouts/PrimaryLayoutContainer';

export function Explore() {
  return (
    <PrimaryLayoutContainer>
      <AsideMenu
        ariaLabel="filter tweets by categories"
        items={asideMenuItems}
      />
      <main className="self-start order-1 md:order-2">
        <div className="flex justify-between px-3 py-2 bg-white rounded-lg shadow-sm">
          <div className="flex items-center w-full">
            <SearchIcon className="w-5 h-5 text-gray3" />

            <TextareaAutosize
              className="w-full p-2 mx-3 resize-none"
              placeholder="Search"
            />
          </div>

          <PrimaryButton>Search</PrimaryButton>
        </div>
        <div className="flex justify-center mt-5 text-twitterBlue">
          This feature hasn't been built yet.
        </div>
      </main>
    </PrimaryLayoutContainer>
  );
}

const asideMenuItems = [
  { description: 'Tweet', url: 'test' },
  { description: 'Tweets & replies', url: 'test' },
  { description: 'Media', url: 'test' },
  { description: 'Likes', url: 'test' },
];
