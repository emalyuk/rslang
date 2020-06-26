import React from 'react';
import './Faq.scss';

export const Faq = ({ question, answer }) => {
  return (
    <div className='faqItem'>
      <div className='faqItem-title'>
        <div className='faqItem-openBtn' />
        <p className='faqItem-question'>{question}</p>
      </div>
      <div className='faqItem-answer'>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Faq;
