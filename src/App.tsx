import { useState, useEffect } from 'react';
import Square from './components/ui/Square';
import useMouseMove from './hooks/mouseMove';
import ButtonsGame from './components/layout/ButtonsGame';

const numRows = 30;
const numCols = 50;

const GameOfLife = () => {

  //Nuevo codigo


  //codigo aparte
  const [grid, setGrid] = useState(Array.from({ length: numRows }, () => Array(numCols).fill(false)));
  const [isRunning, setIsRunning] = useState(true);

  //const mouse = useMouseMove(setGrid, grid);
  const toggleCell = (row, col) => {
    const newGrid = grid.map((r, i) => r.map((cell, j) => (i === row && j === col ? !cell : cell)));
    console.log(newGrid)
    setGrid(newGrid);
  }
  // Función para calcular el siguiente estado del juego
  const nextGeneration = () => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const neighbors = [
          [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
        ];

        const liveNeighbors = neighbors.reduce((acc, [dx, dy]) => {
          const x = rowIndex + dx;
          const y = colIndex + dy;
          if (x >= 0 && x < numRows && y >= 0 && y < numCols && grid[x][y]) {
            acc++;
          }
          return acc;
        }, 0);

        // Regla de Conway: cualquier célula con exactamente 3 vecinos vivos se vuelve viva, 
        // cualquier célula viva con 2 o 3 vecinos vivos permanece viva.
        if (cell && (liveNeighbors < 2 || liveNeighbors > 3)) {
          return false;
        }
        if (!cell && liveNeighbors === 3) {
          return true;
        }
        return cell;
      })
    );
    return newGrid;
  };

  // Función para ejecutar el ciclo del juego
  const runGame = () => {
    if (isRunning) {
      setGrid(nextGeneration());
    }
  };

  useEffect(() => {
    const interval = setInterval(runGame, 100); // Actualiza cada 100ms
    return () => clearInterval(interval);
  }, [isRunning, grid]);

  // Función para reiniciar el juego
  const resetGame = () => {
    //setGrid(createEmptyGrid());
    setIsRunning(false);
  };


  return (
    <div>
      <ButtonsGame
        isRunning={isRunning}
        resetGame={resetGame}
        setIsRunning={setIsRunning}
      />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 20px)` }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Square
              key={rowIndex + colIndex}
              row={rowIndex}
              col={colIndex}
              toggleCell={toggleCell}
              cell={Number(cell)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLife;
