// components/DisclosureButton.jsx
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const DisclosureButton = ({ question, answer }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 text-left sm:text-lg md:text-xl lg:text-2xl font-medium hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 mb-2 mt-2">
            <span>{question}</span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pb-2 pt-4 text-xl">
            {answer}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default DisclosureButton;
