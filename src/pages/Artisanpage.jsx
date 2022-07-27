import React, { useEffect, useContext } from "react";
// import ArtisanList from "../components/artisanTable";
import { Store } from "../store";
import axios from "axios";
import { toast } from "react-toastify";

function ArtisanPage() {
  const {
    state: { artisans, start_artisan, loading },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    async function getArtisanList() {
      dispatch({ type: "START_FETCHING" });
      try {
        const sp = start_artisan >= 0 ? start_artisan : 0;
        const { data } = await axios.get(
          `https://artisanservice.herokuapp.com/api/artisan/${sp}`
        );
        dispatch({ type: "SET_ARTISAN", payload: data.artisans });
      } catch (error) {
        dispatch({ type: "END_FETCHING" });
        let msg = error?.message
          ? error.message
          : "no or poor internet connection, try it again";
        toast.error(msg);
        console.log(error);
      }
    }
    getArtisanList();
  }, [start_artisan, dispatch]);

  const next_function = async () => {
    dispatch({ type: "INCREASE_START_ARTISAN", payload: start_artisan + 20 });
  };

  const pre_function = async () => {
    dispatch({ type: "REDUCE_START_ARTISAN", payload: start_artisan - 20 });
  };

  return (
    <>
      <main className="overflow-y-auto mt-5 h-[580px] md:h-[694px]  md:pb-4">
        <div className="max-w-8xl mx-auto py-2 sm:px-6 lg:px-8">
          <div className="px-4 py-2 sm:px-0">
            {/* <ArtisanList />

            {!loading && artisans.length > 0 && (
              <div className="flex justify-end  mb-2 pr-5 ">
                <button
                  onClick={pre_function}
                  className="border text-blue-500 font-bold py-2 px-2 mr-3 disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={start_artisan <= 0}
                >
                  Previous
                </button>
                <button
                  onClick={next_function}
                  className="border text-blue-500 font-bold  py-2 px-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={artisans.length < 20}
                >
                  Next
                </button>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </>
  );
}

export default ArtisanPage;
