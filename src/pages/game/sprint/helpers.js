// import React, { useEffect, useState } from 'react';

// const useKeyPress = (targetKey) => {
//   const [keyPressed] = useState();

//   const upHandler = ({ key }) => {
//     if (key === targetKey) {
//       // что делаем
//       console.log('нажали на < или >');
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keyup', upHandler);
//     return () => {
//       window.removeEventListener('keyup', upHandler);
//     };
//   }, [upHandler]);

//   return keyPressed;
// }

export function getRandom(arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export default { getRandom };
