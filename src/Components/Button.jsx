/* eslint-disable no-console */
import React from 'react';

const Button = ({
  title,
  onClick,
  capitalizeTitle,
  disabled,
  altClassName,
  isBusy,
}) => {
  return (
    <div className={disabled ? 'opacity-75 ' : ''}>
      <button
        className={
          altClassName ||
          `py-3 lg:text-lg w-full btn-primary uppercase fw-500 ${
            disabled ? 'cursor-not-allowed btn-disabled' : ''
          }`
        }
        onClick={onClick ? onClick : undefined}
        disabled={disabled}
      >
        {isBusy ? 'loading' : capitalizeTitle ? title : title}
      </button>
    </div>
  );
};

export default Button;