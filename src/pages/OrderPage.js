import React, { useState } from "react";
import { useGetOrder } from "api/property";
import ReviewModal from "components/ReviewModal";
import Footer from "components/Footer";

function OrderPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [request, setRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
    isPreviousData,
  } = useGetOrder(pageNumber);
  const handleRefetchPrevious = () => {
    setPageNumber((page) => page - 1);
  };

  const handleRefetchNext = () => {
    if (!isPreviousData && pageNumber < data.data.total_page) {
      setPageNumber((page) => page + 1);
    }
  };

  const Review = (request) => {
    console.log(request);
    setRequest(request);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        {isFetching || isLoading ? <span> Loading...</span> : null}{" "}
        {isError && <span> {error.message}</span>}
        {!!data && (
          <>
            <div className="container mx-auto overflow-auto">
              <ReviewModal
                open={open}
                setOpen={setOpen}
                setClose={closeModal}
                property={request}
              />
              <table className="min-w-full table-fixed mt-24 overflow-auto">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      S/n
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left  border  border-slate-300"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-center border  border-slate-300"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.orders.map((request, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900 border border-slate-300">
                        {request?.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                        {request?.email}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                        {request?.phone}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-normal border border-slate-300">
                        {request?.message}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
                        <button
                          type="button"
                          className="bg-yellow-100 px-2 py-1 text-yellow-700 text-sm font-medium rounded-full text-center"
                          onClick={() => Review(request?.property)}
                        >
                          review
                        </button>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                        {request?.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="container mx-auto">
              <div className="flex justify-between mt-6">
                <div className="md:text-lg">
                  page <strong>{pageNumber}</strong> of{" "}
                  <strong>{data.data.total_page}</strong>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleRefetchPrevious}
                    disabled={pageNumber === 1}
                    className="border text-white bg-violet-600 font-bold py-1 rounded-lg px-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    previous
                  </button>
                  <button
                    onClick={handleRefetchNext}
                    disabled={
                      isPreviousData || pageNumber === data.data.total_page
                    }
                    className="border text-white bg-violet-600 font-bold py-1 px-5 rounded-lg disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    next
                  </button>{" "}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
export default OrderPage;
