import React from "react";

export const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="content">
        <h2>{data.beneficiary_name}</h2>
        <h2>{data.beneficiary_account}</h2>
        <span>{data.date_of_transaction}</span>
        <h2>{data.beneficiary_bank}</h2>
      </div>
    </div>
  );
};

export default Card;
