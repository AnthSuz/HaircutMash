import React from "react";

import Voted from "../components/Voted";

const VotePage = props => {
  return (
    <>
      {props.couple.length > 0 && (
        <Voted
          tabPerson={props.tabPerson}
          couple={props.couple[props.indexCombi]}
          onVoted={props.handleVoted}
        />
      )}
    </>
  );
};

export default VotePage;
