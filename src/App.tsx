import { useState, useEffect } from 'react';
import Square from './components/ui/Square';
import ButtonsGame from './components/layout/ButtonsGame';
import { numCols } from './utils/global';
import { useGame } from './hooks/useGame';

const GameOfLife = () => {
  //* Se utiliza un estado adicional para el rendereo de los contextos 
  const [grid, setGrid] = useState<boolean[][]>();
  const { gridContext } = useGame();

  //* Se agrega el useEffect para poder utilizar las propiedades actualizadas del contexto
  useEffect(() => {
    setGrid(gridContext)
  }, [gridContext])

  return (
    <div>
      <ButtonsGame />
      <div className="grid" style={{gridTemplateColumns: `repeat(${numCols}, 20px)`}}>
        {grid?.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Square
              key={rowIndex + colIndex}
              row={rowIndex}
              col={colIndex}
              cell={cell}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLife;
