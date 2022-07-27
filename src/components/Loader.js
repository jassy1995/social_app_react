import { TiRefreshOutline } from "react-icons/ti";


const Loader = ({ loading ,empty,message,error,refetch}) => {
    return (
        <div className="flex flex-col items-center justify-center m-h-[100vh] mt-[200px]">
            {loading  && (
                <div className="flex flex-col items-center justify-center space-y-0">
                    <img src="assets/img/spinner.gif" alt="Loading" className='h-28 w-28' />
                    <h1 className="text-xl font-medium text-slate-700">{message}</h1>
                </div>)
                }

                {empty && (<h1 className="text-xl font-medium text-slate-500 mt-24">{message}</h1>)}
                {error && (
                    <div className="flex flex-col items-center justify-center">
                     <div className="text-4xl text-red-400">{message}</div>
                     <button onClick={refetch} className="">
                     <TiRefreshOutline className="text-green-400" />
                    </button>
                    </div>
                )}

        </div>
    )
}

export default Loader

