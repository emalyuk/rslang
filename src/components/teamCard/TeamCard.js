import React from 'react';
import PropTypes from 'prop-types';
import './TeamCard.scss';
import { imgPath, githubUserLink } from '../../constants';

const TeamCard = (props) => {
  const
    {
      cssClass, data: {
        avatar, city, github, name, duties,
      },
    } = props;
  return (
    <>
      <li className={`${cssClass} teamCard`}>
        <div className='teamCard__front'>
          <div className='teamCard__avatar'>
            <img className='teamCard__avatar-img' src={`${imgPath}${avatar}`} alt={name} />
          </div>
          <div className='teamCard__name'>{name}</div>
          <div className='teamCard__location'>{city}</div>
        </div>
        <div className='teamCard__back'>
          <div className='teamCard__github'>
            <div className='teamCard__github-icon' />
            <a href={`${githubUserLink}${github}`} className='teamCard__github-link'>{github}</a>
          </div>
          <ul className='teamCard__description'>
            {duties.map((duty, id) => {
              return (
                <li
                  className='teamCard__description-item'
                  key={id.toString()}
                >
                  {duty}
                </li>
              )
            })}
          </ul>
        </div>
      </li>
    </>
  );
}

export default TeamCard;

TeamCard.propTypes = {
  cssClass: PropTypes.string,
  data: PropTypes.shape({
    github: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    city: PropTypes.string,
    avatar: PropTypes.string,
    duties: PropTypes.array,
  }),
};

TeamCard.defaultProps = {
  cssClass: '',
  data: {
    github: 'johnDoe',
    name: 'John Doe',
    position: 'Frontend Developer',
    city: 'Minsk',
    avatar: 'none.jpg',
    duties: ['FrontEnd Developer', 'Game developer', 'Main Page Developer'],
  },
};
