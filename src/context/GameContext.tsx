import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { numRows, numCols, initialState } from '../utils/global';

interface GameContextType {
  gridContext: boolean[][];
  isRunning: boolean;
  setGridContext: (grid: boolean[][]) => void;
  setIsRunning: (isRunning: boolean) => void;
  toggleCell: (row: number, col: number) => void;
  nextGeneration: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gridContext, setGridContext] = useState(initialState);
  const [isRunning, setIsRunning] = useState(false);

  const toggleCell = (row: number, col: number) => {
    const newGrid = gridContext.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? !cell : cell))
    );
    setGridContext(newGrid);
  };

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

  const resetGame = () => {
    setGridContext(initialState);
    setIsRunning(false);
  };

  const runGame = () => {
    if (isRunning) {
      setGridContext(nextGeneration());
    }
  }

  useEffect(() => {
    const interval = setInterval(runGame, 100); // Actualiza cada 100ms
    return () => clearInterval(interval);
  }, [isRunning, gridContext]);

  return (
    <GameContext.Provider
      value={{
        gridContext,
        setGridContext,
        isRunning,
        setIsRunning,
        toggleCell,
        nextGeneration,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}