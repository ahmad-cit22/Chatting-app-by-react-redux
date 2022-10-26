import React from "react";

const Button = ({
  customClass,
  text,
  clickAct,
  Loader,
  loaderColor,
  loadingStatus,
  loaderMargin,
  btnDisable,
  loaderSize,
}) => {
  return (
    <button
      className={`${customClass} bg-primary hover:bg-hoverPrimary text-white linear duration-300 active:scale-95 active:bg-[#330eb7] cursor-pointer`}
      onClick={clickAct}
      disabled={btnDisable}
    >
      {text}
      <Loader
        color={loaderColor}
        loading={loadingStatus}
        margin={loaderMargin}
        size={loaderSize}
      />
    </button>
  );
};

export default Button;
