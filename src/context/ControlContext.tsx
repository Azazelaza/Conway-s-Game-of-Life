import { ReactNode, useEffect, useState } from "react";
import { initialState } from "../utils/global";
import { useGame } from "../hooks/useGame";
import { ControlContext } from "../hooks/useControl";

export function ControlProvider({ children }: { children: ReactNode }) {
    const { setGrid, gridContext, setIsRunning } = useGame();
    const [multipleSelect, setMultipleSelect] = useState([]);

    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const resetGame = () => {
        setGrid(initialState);
        setIsRunning(false);
    };

    /* const toggleCell = (row: number, col: number) => {
        const newGrid = gridContext.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? !cell : cell))
        );
        console.log('nueva grid', newGrid)
        setGrid(newGrid)
    } */

    const toggleCells = () => {
        const newGrid = gridContext 
        multipleSelect.forEach((m) => {
            const cell = newGrid[Number(Object.values(m)[0])][Number(Object.keys(m)[0])]
            newGrid[Number(Object.values(m)[0])][Number(Object.keys(m)[0])] = !cell
        })
        console.log('nuevo',newGrid)
        setMultipleSelect([])
        /* setMultipleSelect([]);
        setGrid(newGrid) */
    };

    useEffect(() => {
        if (!mouseDown && multipleSelect.length > 0) {
            toggleCells()
        }
    }, [mouseDown])

    useEffect(() => {
        window.addEventListener('mousedown', () => setMouseDown(true))
        window.addEventListener('mouseup', () => setMouseDown(false))
    }, [])

    return (
        <ControlContext.Provider
            value={{
                toggleCells,
                resetGame,
                mouseDown,
                multipleSelect,
                setMultipleSelect
            }}
        >
            {children}
        </ControlContext.Provider>
    );
}