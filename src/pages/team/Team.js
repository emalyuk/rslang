import React from 'react';
import './Team.scss';
import { TeamCard } from '../../components';
import { teamData } from '../../constants';

const Team = () => {
  return (
    <>
      <div className='container team'>
        <h1 className='team__header'>Our team</h1>
        <ul className='team__members'>
          {teamData.map((obj, id) => {
            return (
              <TeamCard
                key={id.toString()}
                cssClass='team__member'
                data={obj}
              />
            )
          })}
        </ul>
      </div>
    </>
  )
};

export default Team;
