import { useEffect, useState } from "react";
import { SquareProps } from "../../types/types"
import { useControl } from "../../hooks/useControl";
import { useGame } from "../../hooks/useGame";

export default function Square({ row, col }: SquareProps) {
    const color = ["white", "black"];
    const [selected, setSelected] = useState(false);
    const { mouseDown, setMultipleSelect } = useControl();
    const { gridContext } = useGame();

    const detectClick = () => {
        if (mouseDown) {
            setSelected(!gridContext[row][col])
            setMultipleSelect((prev: any) => [...prev, { [row]: col }])
        }
    }

    useEffect(() => {
        setSelected(gridContext[row][col])
    }, [gridContext])

    return (
        <div
            data-column={col}
            data-row={row}
            onMouseEnter={detectClick}
            className="w-5 h-5 border border-zinc-300 select-none"
            style={{
                backgroundColor: color[Number(selected)]
            }}
        />
    )
}
