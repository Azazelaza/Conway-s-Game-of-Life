export const numCols = Math.floor(document.body.offsetWidth / 20);
export const numRows = Math.floor(document.body.offsetHeight / 20);
export const initialState = Array.from({ length: numRows }, () => Array(numCols).fill(false))