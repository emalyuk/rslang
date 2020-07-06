import React, { useEffect, useState } from 'react';

const useKeyPress = (targetKey) => {
  const [keyPressed] = useState();

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      // что делаем
      console.log('нажали на < или >');
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
}

export default useKeyPress;
