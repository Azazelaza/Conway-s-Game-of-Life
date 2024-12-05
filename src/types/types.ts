export interface GameContextType {
    /* gridContext: boolean[][];
    isRunning: boolean;
    setGridContext: (grid: boolean[][]) => void;
    setIsRunning: (isRunning: boolean) => void;
    nextGeneration: () => void;
    setSpeedRun: (speedRun: number) => void;
    speedRun: number; */
    [key:string]: any
}

export interface ControlContextType {
    //Provitional
    [key: string]: any
}

export type SquareProps = {
    row: number
    col: number
    cell: boolean
}
