import React from 'react';

interface SelectButtonProps {
    children: React.ReactNode;
    selected: boolean;
    onClick: () => void; // Adjust the type based on the specific function signature you need
  }

const SelectButton = ({ children, selected, onClick }: SelectButtonProps) => {
    // Applying conditional classes based on the `selected` prop
    const buttonClass = `
      border border-gold 
      rounded-md 
      py-2 px-4 
      font-montserrat 
      cursor-pointer 
      transition-colors duration-300 
      ${selected ? 'bg-gold text-black font-bold' : 'bg-transparent text-white font-medium'} 
      hover:bg-gold hover:text-black 
      w-1/5 md:w-1/4 lg:w-1/5
    `;
  
    return (
      <span onClick={onClick} className={buttonClass}>
        {children}
      </span>
    );
  };
  
  export default SelectButton;
  