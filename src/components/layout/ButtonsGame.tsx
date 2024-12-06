import { useGame } from "../../hooks/useGame";
import { useControl } from "../../hooks/useControl";
import { classNames } from "../../utils/classNames";

export default function ButtonsGame() {
    const { isRunning, setIsRunning, setSpeedRun, speedRun } = useGame();
    const { resetGame, nextStep } = useControl();
    const Running = ["Iniciar", "Pausar"];

    return (
        <div className='absolute bg-gray-900 left-0 bottom-0 p-3 text-center w-full select-none'>
            <div className="flex gap-5">
                <div className='border rounded p-4 my-4 w-2/6'>
                    <p className='text-xl'>Tiempo</p>
                    <b>
                        1 Movimiento cada {speedRun} ms
                    </b>
                    <input id="default-range" type="range" min={1} max={5000} onChange={e => setSpeedRun(Number(e.target.value))} value={speedRun} className={classNames(
                        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700")} />
                </div>
                <div className="w-2/6 block ml-auto my-auto">
                    <button
                        className={classNames(
                            'bg-green-400 w-full h-fit text-black text-lg bold p-2 rounded-lg mb-4',
                            { "bg-red-400": isRunning })}
                        onClick={() => setIsRunning(!isRunning)}>
                        {Running[Number(isRunning)]}
                    </button>
                    <button className='bg-blue-400 text-lg bold w-full text-black p-2 rounded-lg' onClick={resetGame}>
                        Reiniciar
                    </button>
                </div>
                <div className="w-2/6 block ml-auto my-auto">
                    <button
                        className='bg-zinc-400 w-full h-fit text-black text-lg bold p-2 rounded-lg mb-4'
                        onClick={() => setIsRunning(!isRunning)}>
                        Retroceder un paso
                    </button>
                    <button
                        onClick={() => nextStep()}
                        className='bg-white text-lg bold w-full text-black p-2 rounded-lg'>
                        Siguiente paso
                    </button>
                </div>
            </div>
        </div >
    )
}
