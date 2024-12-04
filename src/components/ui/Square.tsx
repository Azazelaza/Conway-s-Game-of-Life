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
            data-column={col}
            data-row={row}
            onClick={() => toggleCell(row, col)}
            className="w-5 h-5 border border-zinc-300"
            style={{
                backgroundColor: color[cell]
            }}
        />
    )
}
