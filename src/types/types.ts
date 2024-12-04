export interface GameContextType {
    gridContext: boolean[][];
    isRunning: boolean;
    setGridContext: (grid: boolean[][]) => void;
    setIsRunning: (isRunning: boolean) => void;
    toggleCell: (row: number, col: number) => void;
    nextGeneration: () => void;
    resetGame: () => void;
    setSpeedRun: (speedRun: number) => void;
    speedRun: number;
}