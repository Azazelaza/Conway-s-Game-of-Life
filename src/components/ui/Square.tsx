
type SquareProps = {
    row: number
    col: number
    cell: any
    toggleCell: any
}

export default function Square({ row, col, cell, toggleCell }: SquareProps) {
    const color = ["white", "black"]
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
