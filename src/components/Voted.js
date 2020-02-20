import React from "react";

const Voted = props => {
  const indexA = props.couple.a;
  const indexB = props.couple.b;
  const personA = props.tabPerson[indexA];
  const personB = props.tabPerson[indexB];

  return (
    <div className="wrapper">
      <div className="voted">
        <div
          className="person"
          onClick={() => {
            props.onVoted(indexA, indexB, indexA);
          }}
        >
          <h2>{personA.name}</h2>
          <img src={personA.img} alt="person one" />
          <p className="misc">{personA.misc}</p>
        </div>
        <h3>OU</h3>
        <div
          className="person"
          onClick={() => {
            props.onVoted(indexA, indexB, indexB);
          }}
        >
          <h2>{personB.name}</h2>
          <img src={personB.img} alt="person two" />
          <p className="misc">{personB.misc}</p>
        </div>
      </div>
    </div>
  );
};

export default Voted;
