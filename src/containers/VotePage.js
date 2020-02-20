import React from "react";

import Voted from "../components/Voted";

const VotePage = props => {
  return (
    <>
      {props.couple && (
        <Voted
          tabPerson={props.tabPerson}
          couple={props.couple}
          onVoted={props.handleVoted}
        />
      )}
    </>
  );
};

export default VotePage;
