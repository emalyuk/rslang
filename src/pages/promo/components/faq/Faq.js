import React from 'react';
import Collapse from '@kunukn/react-collapse';
import './Faq.scss';

export const Faq = ({
  question, answer, id, activeId, setActiveId,
}) => {
  const isActive = activeId === id;

  function checkIsActive(id) {
    activeId === id ? setActiveId('') : setActiveId(id)
  }
  return (
    <div className={['faqItem', isActive ? 'isActive' : ''].join(' ')}>
      <div className='faqItem-title' onClick={() => checkIsActive(id)}>
        <div className='faqItem-openBtn' />
        <p className='faqItem-question'>{question}</p>
      </div>
      <Collapse isOpen={isActive} className='faqItem-answer'>
        <p>{answer}</p>
      </Collapse>
    </div>
  );
};

export default Faq;
