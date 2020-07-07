import React, { useState } from 'react';
import './Promo.scss';
import data from '../../constants/promoData';
import Service from './components/service/Service';
import Feature from './components/feature/Feature';
import Faq from './components/faq/Faq';
import image from '../../assets/images/promo/hero-mobile.png';

export const Promo = () => {
  const [activeId, setActiveId] = useState(false);

  return (
    <div className='Promo'>
      <section className='hero'>
        <div className='container hero-section'>
          <div className='hero-description'>
            <h1>The Best App in the Universe</h1>
            <p>
              RS Lang - это эффективный сервис для нескучного изучения
              английского языка. Более 6 человек во всем мире выбрали RS Lang.
            </p>
          </div>
          <div className='hero-image'>
            <img src={image} alt='mobile' />
          </div>
        </div>
      </section>

      <section className='services-section'>
        <div className='services container'>
          {data.service.map((item) => (
            <Service key={item.id} {...item} />
          ))}
        </div>
      </section>

      <section className='features container'>
        <h2 className='title'>ОСОБЫЕ ВОЗМОЖНОСТИ</h2>
        <p className='features-description'>
          Наша команда разработчиков провела опросы и постаралась сделать для
          Ваc максимально удобное приложение для изучения языка.
        </p>
        <div className='features-items'>
          {data.feature.map((item) => (
            <Feature key={item.id} {...item} />
          ))}
        </div>
      </section>

      <section className='faq'>
        <div className='faq-content container'>
          <h2 className='faq-title'>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
          <div className='faq-items'>
            {data.faq.map((item) => (
              <Faq
                {...item}
                activeId={activeId}
                setActiveId={setActiveId}
                key={item.id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promo;
