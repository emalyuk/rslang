import React, {Fragment} from 'react';
import './TeamCard.scss';
import teamData from "./TeamData";

const TeamCard = () => {
  const cards = teamData.map((item, index) => {
    const {github, name, position, contribution} = item;
    return (
      <Fragment key={index}>
      <div className="team-card">
        <a className="team-card-left"
           href={`https://github.com/${github}`}
           target="_blank"
           rel="noopener noreferrer">
          <img src={`https://avatars.githubusercontent.com/${github}`}
          alt="avatar"
          className="team-card-avatar"/>
          <div className="team-card-github">
            <div className="team-card-github-icon"></div>
            <p className="team-card-nickname">
              {github}
            </p>
          </div>
        </a>
        <div className="team-card-right">
          <p className="team-card-name">
            {name}
          </p>
          <p className="team-card-position">
            {position}
          </p>
          <p className="contribution">
            {contribution}
          </p>
        </div>
      </div>
      <div style={{height: '0px', flexBasis: index ? 'auto' : '100%'}}></div>
      </Fragment>
    );
  });


  return (
      <>
        {cards}
      </>
    );
}

export default TeamCard;
