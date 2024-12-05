import { useEffect, useState } from "react";
import { SquareProps } from "../../types/types"
import { useControl } from "../../hooks/useControl";

export default function Square({ row, col, cell }: SquareProps) {
    const color = ["white", "black"];
    const [selected, setSelected] = useState(cell);
    const { mouseDown, setMultipleSelect } = useControl();

    const detectClick = () => {
        if (selected === cell && mouseDown) {
            setSelected(!cell);
            setMultipleSelect((prev) => [...prev, { [row]: col }])
        }
    }

    return (
        <div
            data-column={col}
            data-row={row}
            onMouseEnter={detectClick}
            className="w-5 h-5 border border-zinc-300 select-none"
            style={{
                backgroundColor: selected == cell ? color[Number(cell)] : color[Number(selected)]
            }}
        />
    )
}
