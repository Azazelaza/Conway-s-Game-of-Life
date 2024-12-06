import { ReactNode, useState, useEffect } from 'react';
import { numRows, numCols, initialState } from '../utils/global';
import { GameContext } from '../hooks/useGame';

export function GameProvider({ children }: { children: ReactNode }) {
  const [gridContext, setGridContext] = useState(initialState);
  const [isRunning, setIsRunning] = useState(false);
  const [speedRun, setSpeedRun] = useState<number>(100);

  const nextGeneration = () => {
    const newGrid = gridContext.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const neighbors = [
          [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
        ];

        const liveNeighbors = neighbors.reduce((acc, [dx, dy]) => {
          const x = rowIndex + dx;
          const y = colIndex + dy;
          if (x >= 0 && x < numRows && y >= 0 && y < numCols && gridContext[x][y]) {
            acc++;
          }
          return acc;
        }, 0);

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

  const runGame = () => {
    if (isRunning) {
      setGridContext(nextGeneration());
    }
  }

  useEffect(() => {
    const interval = setInterval(runGame, speedRun); // Actualiza cada 100ms
    return () => clearInterval(interval);
  }, [isRunning, gridContext, speedRun]);

  return (
    <GameContext.Provider
      value={{
        gridContext,
        setGridContext,
        isRunning,
        setIsRunning,
        setSpeedRun,
        speedRun,
        nextGeneration,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}