import { useGame } from '../../context/GameContext';

export default function ButtonsGame() {
    const { isRunning, setIsRunning, resetGame, setSpeedRun, speedRun } = useGame();
    const Running = ["Iniciar", "Pausar"];

    return (
        <div className='absolute bg-gray-900 right-0 p-6 w-1/3'>
            <h1 className='text-xl mb-4'>Conway's Game of Life</h1>

            <div className='border rounded p-4 mb-4'>
                <p className='text-xl'>Tiempo</p>
                <b>
                    1 Movimiento cada {speedRun} ms
                </b>
                <input id="default-range" type="range" min={1} max={5000} onChange={e => setSpeedRun(Number(e.target.value))} value={speedRun} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            </div>
            <button
                className='bg-gray-200 w-full text-black p-2 rounded-lg mb-4'
                onClick={() => setIsRunning(!isRunning)}>
                {Running[Number(isRunning)]}
            </button>
            <button className='bg-gray-200 w-full text-black p-2 rounded-lg' onClick={resetGame}>
                Reiniciar
            </button>
        </div>
    )
}
