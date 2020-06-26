import React from 'react';
import './Promo.scss';
import data from './data.json'
import Service from './components/service/Service'
import Feature from './components/feature/Feature'
import Faq from './components/faq/Faq'

export const Promo = () => {
  function openFaq(e) {
    const faqArr = Array.from(e.target.parentElement.parentElement.childNodes)
    const faqItem = e.target.parentElement;

    if (faqItem.classList.contains('isActive')) {
      faqItem.classList.remove('isActive')
    } else {
      for (let i = 0; i < faqArr.length; i += 1) {
        faqArr[i].classList.remove('isActive')
      }
      faqItem.classList.add('isActive');
    }
  }

  return (
    <div className='Promo'>

      <section className='hero'>
        <div className='container hero-section'>
          <div className='hero-description'>
            <h1>The Best App in the Universe</h1>
            <p>
              RS Lang - это эффективный сервис для нескучного изучения
              английского языка. Более 6 человек во всем мире
              выбрали RS Lang.
            </p>
          </div>
          <div className='hero-image'>
            <img src='./assets/images/promo/hero-mobile.png' alt='mobile' />
          </div>
        </div>
      </section>

      <section className='services-section'>
        <div className='services container'>
          {data.service.map((item) => (
            <Service
              icon={item.icon}
              title={item.title}
              description={item.description}
              key={item.id}
            />
          ))}
        </div>
      </section>

      <section className='features container'>
        <h2 className='title'>ОСОБЫЕ ВОЗМОЖНОСТИ</h2>
        <p className='features-description'>
          Наша команда разработчиков провела опросы и постаралась сделать для Вам максимально удобное приложение для изучения языка.
        </p>
        <div className='features-items'>
          {data.feature.map((item) => (
            <Feature
              icon={item.icon}
              title={item.title}
              description={item.description}
              key={item.id}
            />
          ))}
        </div>
      </section>

      <section className='faq'>
        <div className='faq-content container'>
          <h2 className='faq-title'>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
          <div
            className='faq-items'
            onClick={(e) => {
              openFaq(e)
            }}
          >
            {data.faq.map((item) => (
              <Faq question={item.question} answer={item.answer} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promo;
