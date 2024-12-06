import { ReactNode, useEffect, useState } from "react";
import { numCols, numRows } from "../utils/global";
import { useGame } from "../hooks/useGame";
import { ControlContext } from "../hooks/useControl";

export function ControlProvider({ children }: { children: ReactNode }) {
    const { setGridContext, gridContext, setIsRunning } = useGame();
    const [multipleSelect, setMultipleSelect] = useState([]);

    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const resetGame = () => {
        setIsRunning(false);
        setGridContext(Array.from({ length: numRows }, () => Array(numCols).fill(false)));
    };

    useEffect(() => {
        if (!mouseDown && multipleSelect.length > 0) {
            const newGrid = gridContext
            multipleSelect.forEach((m) => {
                const cell = newGrid[Number(Object.values(m)[0])][Number(Object.keys(m)[0])]
                newGrid[Number(Object.keys(m)[0])][Number(Object.values(m)[0])] = !cell
            })
            setMultipleSelect([])
        }
    }, [mouseDown])

    useEffect(() => {
        window.addEventListener('mousedown', () => setMouseDown(true))
        window.addEventListener('mouseup', () => setMouseDown(false))
    }, [])

    return (
        <ControlContext.Provider
            value={{
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