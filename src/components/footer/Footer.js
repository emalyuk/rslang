import React from 'react';
import './Footer.scss';
import { useLocation, useHistory } from 'react-router-dom';
import routes from '../../routes';
import { rsSchoolLink } from '../../constants'

const Footer = () => {
  const { pathname: currentLocation } = useLocation();
  const isTeamPage = currentLocation === routes.team;
  const history = useHistory();

  return (
    <footer className='footer'>
      <div className='footer__container'>
        <a href={rsSchoolLink} className='footer__link'>Rs school</a>
        {!isTeamPage && (
          <button
            className='footer__button'
            type='button'
            onClick={() => history.push(routes.team)}
          >
            Team №48
          </button>
        )}
        {isTeamPage && <span className='footer__owner'> Team №48 </span>}
        <div className='footer__copyright'>
          <span className='footer__copyright-symbol'>{'\u00A9'}</span>
          <span className='footer__year'>2020</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
