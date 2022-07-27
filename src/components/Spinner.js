import { ImSpinner2 } from "react-icons/im";
import { TiRefreshOutline } from "react-icons/ti";
function Spinner({ text, refetch, message }) {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="mx-auto mt-[300px]">
        {text !== "error" ? (
          <>
            <ImSpinner2 className="mx-auto animate-spin text-blue-700 text-4xl mt-[300px]" />
            <div className="text-4xl">{text}</div>
          </>
        ) : (
          <>
            <div className="text-4xl text-red-400">{message}</div>
            <button onClick={refetch} className="">
              <TiRefreshOutline className="text-green-400" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Spinner;
