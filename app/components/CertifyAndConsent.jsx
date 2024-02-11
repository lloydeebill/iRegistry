import React from 'react';
import CustomButton from './CustomButton';

const CertifyAndConsent = ({ title, link }) => {
  return (
    <div className='text-center'>
      <h2 className="text-primary-blue text-4xl font-semibold italic">{title}</h2>
      <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold py-6 sm:pb-2 mt-2 mb-2">CERTIFY & CONSENT</h1>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-3xl shadow-2xl mb-5">
        <p className="text-base sm:text-sm md:text-xl lg:text-2xl text-left leading-relaxed">
          By clicking the “I Consent and Certify” button, I fully understand that I am voluntarily providing personal and sensitive information to the Local Civil Registrar of Buenavista, Agusan del Norte which will exclusively use the information to process the Civil Registry document.
          <br />
          <br />
          I am giving the Office consent to communicate with me via voice call, text message, e-mail, or any online communication through the contact information that I will supply, provided that the communication will comply with the privacy laws and regulations.
          <br />
          <br />
          Further, I hereby certify that all information supplied is true and correct to my own knowledge and belief.
        </p>
      </div>
      <a href={link}>
        <CustomButton buttonText="I Consent and Certify"/>
      </a>
    </div>
  );
};

export default CertifyAndConsent;
