import React from 'react'

export default function ButtonsGame({
    setIsRunning,
    isRunning,
    resetGame
}: any) {
    return (
        <>
            <h1>Conway's Game of Life</h1>
            <button
                className='bg-gray-200 text-black p-2'
                onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'Pausar' : 'Iniciar'}
            </button>
            <button onClick={resetGame}>Reiniciar</button>

        </>
    )
}
