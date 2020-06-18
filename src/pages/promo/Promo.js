import React from 'react';
import './Promo.scss';

export const Promo = () => {
  const mobile = require('./images/hero-mobile.png');
  const serviceIcon1 = require('./images/service/icon-1.png');
  const serviceIcon2 = require('./images/service/icon-2.png');
  const serviceIcon3 = require('./images/service/icon-3.png');
  const featuresIcon1 = require('./images/features/icon-1.png');
  const featuresIcon2 = require('./images/features/icon-2.png');
  const featuresIcon3 = require('./images/features/icon-3.png');
  const featuresIcon4 = require('./images/features/icon-4.png');
  const featuresIcon5 = require('./images/features/icon-5.png');
  const featuresIcon6 = require('./images/features/icon-6.png');
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
            <img src={mobile} alt='mobile' />
          </div>
        </div>
      </div>

      <section className='services-section'>
        <div className='services container'>
          <div className='services-box'>
            <img src={serviceIcon1} alt='services icon 1' />
            <p>EASY TO USE</p>
            <p>
              Lorem ipsum dolor sit amt, consectet adop adipisicing elit, sed do
              eiusmod tepo raraincididunt ugt labore.
            </p>
          </div>
          <div className='services-box'>
            <img src={serviceIcon2} alt='services icon 2' />
            <p>EASY TO USE</p>
            <p>
              Lorem ipsum dolor sit amt, consectet adop adipisicing elit, sed do
              eiusmod tepo raraincididunt ugt labore.
            </p>
          </div>
          <div className='services-box'>
            <img src={serviceIcon3} alt='services icon 3' />
            <p>EASY TO USE</p>
            <p>
              Lorem ipsum dolor sit amt, consectet adop adipisicing elit, sed do
              eiusmod tepo raraincididunt ugt labore.
            </p>
          </div>
        </div>
      </section>

      <div className='features container'>
        <h2 className='title'>SPECIAL FEATURES</h2>
        <p className='features-description'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Velit voluptates, temporibus at, facere harum fugiat!
        </p>
        <div className='features-items'>
          <div className='features-item'>
            <img src={featuresIcon1} alt='features icon 1' />
            <p className='item-title'>Creative Design</p>
            <p className='item-description'>
              Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
              Cumque quas nulla est adipisci,
            </p>
          </div>
          <div className='features-item'>
            <img src={featuresIcon2} alt='features icon 2' />
            <p className='item-title'>Unlimited Features</p>
            <p className='item-description'>
              Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
              Cumque quas nulla est adipisci,
            </p>
          </div>
          <div className='features-item'>
            <img src={featuresIcon3} alt='features icon 3' />
            <p className='item-title'>Full Free Chat</p>
            <p className='item-description'>
              Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
              Cumque quas nulla est adipisci,
            </p>
          </div>
          <div className='features-item'>
            <img src={featuresIcon4} alt='features icon 4' />
            <p className='item-title'>Retina ready</p>
            <p className='item-description'>
              Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
              Cumque quas nulla est adipisci,
            </p>
          </div>
          <div className='features-item'>
            <img src={featuresIcon5} alt='features icon 5' />
            <p className='item-title'>High Resolution</p>
            <p className='item-description'>
              Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
              Cumque quas nulla est adipisci,
            </p>
          </div>
          <div className='features-item'>
            <img src={featuresIcon6} alt='features icon 6' />
            <p className='item-title'>Clean Codes</p>
            <p className='item-description'>
              Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
              Cumque quas nulla est adipisci,
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Promo;
