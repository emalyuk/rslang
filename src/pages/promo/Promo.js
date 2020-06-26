import React from 'react';
import './Promo.scss';
import data from './data.json'
import Service from './components/service/Service'
import Feature from './components/feature/Feature'
import Faq from './components/faq/Faq'

export const Promo = () => {
  function test(e) {
    const faqArr = Array.from(e.target.parentElement.parentElement.childNodes)
    console.dir(e.target);
    if (e.target.parentElement.classList.contains('isActive')) {
      e.target.parentElement.classList.remove('isActive')
    } else {
      for (let i = 0; i < faqArr.length; i += 1) {
        faqArr[i].classList.remove('isActive')
      }
      e.target.parentElement.classList.add('isActive');
    }
  }

  return (
    <div className='Promo'>

      <div className='hero'>
        <div className='container hero-section'>
          <div className='hero-description'>
            <h1>The Best App in the Universe</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod temp or incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
            </p>
          </div>
          <div className='hero-image'>
            <img src='./assets/images/promo/hero-mobile.png' alt='mobile' />
          </div>
        </div>
      </div>

      <section className='services-section'>
        <div className='services container'>
          {data.service.map((item) => (
            <Service icon={item.icon} title={item.title} description={item.description} key={item.id} />
          ))}
        </div>
      </section>

      <div className='features container'>
        <h2 className='title'>SPECIAL FEATURES</h2>
        <p className='features-description'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Velit voluptates, temporibus at, facere harum fugiat!
        </p>
        <div className='features-items'>
          {data.feature.map((item) => (
            <Feature icon={item.icon} title={item.title} description={item.description} key={item.id} />
          ))}
        </div>
      </div>

      <section className='faq'>
        <div className='faq-content container'>
          <h2 className='faq-title'>FREQUENTLY ASKED QUESTIONS</h2>
          <p className='faq-description'>Loasdflk aksdhfkashd galshdf askdjhf jadsf</p>
          <div
            className='faq-items'
            onClick={(e) => {
              test(e)
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
