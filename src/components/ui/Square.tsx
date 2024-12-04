import { useGame } from "../../hooks/useGame"

type SquareProps = {
    row: number
    col: number
    cell: number
}

export default function Square({ row, col, cell }: SquareProps) {
    const color = ["white", "black"]
    const { toggleCell } = useGame();
    
    return (
        <div
            draggable="false"
            key={`${row}-${col}`}
            data-column={col}
            onClick={() => toggleCell(row, col)}
            data-row={row}
            className="w-5 h-5 border"
            style={{
                backgroundColor: color[cell]
            }}
        />
    )
}
