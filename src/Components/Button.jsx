/* eslint-disable no-console */
import React from "react";

const Button = ({
  title,
  onClick,
  capitalizeTitle,
  disabled,
  altClassName,
  isBusy,
}) => {
  return (
    <div className={disabled ? "opacity-75 " : ""}>
      <button
        className={
          altClassName ||
          `w-full py-3 uppercase font-medium rounded text-white shadow-[1.95px_1.95px_2.6px_rgba(0,0,0,0.15)] bg-red-500 transition duration-500 lg:text-lg ${
            disabled
              ? "cursor-not-allowed bg-gray-900/60"
              : "bg-red-900 hover:scale-x-[1.02] hover:bg-[#181f2c]/75"
          }`
        }
        onClick={onClick ? onClick : undefined}
        disabled={disabled}
      >
        {isBusy ? "loading" : capitalizeTitle ? title : title}
      </button>
      {/* <button className="">
        {isBusy ? "loading" : capitalizeTitle ? title : title}
      </button>*/}
    </div>
  );
};

export default Button;
