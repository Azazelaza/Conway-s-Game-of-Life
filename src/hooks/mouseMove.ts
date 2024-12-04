import { useEffect } from "react";

export default function useMouseMove(setGrid: any, grid: any) {
    useEffect(() => {
        const handleMouseUp = (e) => {
            window.removeEventListener('mousemove', handleMouseMove);
        };

        const handleMouseMove = (e) => {
            const col = e.target.dataset.column;
            const row = e.target.dataset.row;
            console.log(col,row)
            const newGrid = grid.map((r, i) => r.map((cell, j) => (i === row && j === col ? !cell : cell)));
            setGrid(newGrid);
        };

        const detectAllSquared = () => window.addEventListener('mousemove', handleMouseMove)

        window.addEventListener('mousedown', detectAllSquared);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', detectAllSquared);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
}

