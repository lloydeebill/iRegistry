// components/StepSection.jsx
import React from 'react';

const stepTitles = [
  'Choose your service',
  'Certify and Consent',
  'Fill-in Google Form',
  'Message Us After',
  'Payment Process',
  'Fulfillment',
];

const stepDescriptions = [
  'Click on the service you want to have by clicking Request PSA button or Register and choose which one you’d like to get.',
  'Click the Certify and Consent button to acknowledge the collection and use of your personal data for civil registry needs.',
  'Provide the details that is asked in the form you’re applying.',
  'Chat us in our Facebook Page, to confirm your application.',
  'After we’ve confirmed your application, instructions for online payment will be given according to your convenience.',
  'You’ll be receiving a message from us when your request is fulfilled and ready for you to  pick-up at our office.',
];

const StepSection = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-8 ">HOW DOES IT WORK?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-3xl text-center shadow-2xl">
            <div className="flex items-center justify-center w-20 h-20 border-2 border-[#3790d7] text-[#3790d7] font-bold text-4xl rounded-full mb-4 mx-auto">
              {index + 1}
            </div>
            <h2 className="text-xl font-bold mb-2">{stepTitles[index]}</h2>
            <p>{stepDescriptions[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepSection;
