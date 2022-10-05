import React from "react";

const Button = ({ customClass, text, clickAct }) => {
  return (
    <button
      className={`${customClass} bg-primary hover:bg-hoverPrimary text-white linear duration-300`}
      onClick={clickAct}
    >
      {text}
    </button>
  );
};

export default Button;
