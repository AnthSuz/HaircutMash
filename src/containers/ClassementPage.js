import React from "react";

const ClassementPage = props => {
  // On récupère la props
  const tabPerson = props.tabPerson;
  // On copie le tableau
  let newTabPerson = [...tabPerson];
  // Et on classe en par ordre décroissant les nbPoints
  newTabPerson.sort(function(a, b) {
    return b.nbPoint - a.nbPoint;
  });
  return (
    <>
      <div className="classementPage">
        <h2>CLASSEMENT DES PLUS BELLES COUPES DE CHEVEUX </h2>
        {newTabPerson.map((item, index) => {
          return (
            <div key={index} className="listClassementPage">
              <p>
                {index + 1} - {item.name} - {item.nbPoint} Point(s)
              </p>
              <img src={item.img} alt="classement de bg" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ClassementPage;
