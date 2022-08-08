import { useState } from 'react'
import { useGetTodo } from 'api/chat-app/post';
import { useScrollForFetching } from "Hooks/useScrollPosition";

const ScrollPage = () => {
    const [status, setStatus] = useState('all')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetTodo({ status, location, price });
    useScrollForFetching(hasNextPage, fetchNextPage, isFetchingNextPage);
    const statusOptions = ['all', 'completed', 'not completed']



    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setLocation('all');
        setPrice('all')
    }





    const FilterContainer = () => {
        return (
            <div className='flex items-center space-x-8 p-2 justify-cente'>
                <h3 className="font-mono font-bold text-slate-700">
                    filter by
                </h3>
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-48 form-select form-select-sm  appearance-none block  px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-noneß"
                    aria-label=".form-select-lg example"
                >
                    <option defaultValue>select...</option>
                    {statusOptions?.map((status, index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
    const Loader = () => {
        return (
            <div className='flex justify-center items-center mt-20'>
                <h2 className='text-2xl'>fetching todo...</h2>
            </div>
        )
    }

    const LoadMoreMessage = () => {
        return (
            <div className={`flex justify-center items-center mt-20 ${!hasNextPage ? "hidden" : ""}`}>
                <h2 className='text-2xl'>fetching more todo...</h2>
            </div>
        )
    }


    const EndOfScrollMessage = () => {
        return (
            <div className="flex justify-center items-center mt-10 mb-5">
                <h2 className='text-2xl'>Congrats! You have scrolled to the end of the list.</h2>
            </div>
        )
    }


    const Todos = ({ todo, num }) => {
        return (
            <div className='flex  items-center mb-2'>
                <div
                    className={`flex flex-col ring-1 p-2  bg-slate-200 hover:bg-slate-300 mb-1 cursor-pointer w-full`}

                >
                    <div className="flex flex-col space-y-2">
                        <strong>{num}</strong>
                        <h3>{todo?.title}</h3>
                        <div className="flex  gap-3 items-center">status  <span><input type='checkbox' checked={todo?.completed} readOnly /></span></div>
                    </div>
                </div>

            </div>

        )
    }
    return (
        <div className='max-w-5xl flex flex-col ring-1 ring-grey mx-auto mt-5  p-3 pt-10 '>
            <FilterContainer />

            {
                isLoading ? <Loader /> : isSuccess &&
                    data?.pages?.map((page) =>
                        page?.data?.todos?.map((todo, i) => (
                            <Todos key={todo.id} todo={todo} num={i + 1} />
                        ))
                    )


            }

            {!hasNextPage && !isLoading && <EndOfScrollMessage />}
            {isFetchingNextPage && <LoadMoreMessage />}
        </div>
    )
}

export default ScrollPage


