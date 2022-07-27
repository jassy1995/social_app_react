import {
  useMutation,
  useQuery,
  // useQueryClient,
  useInfiniteQuery,
} from "react-query";
import https from "lib/https";

const page_size = 20


const fetchPosts = ({ pageParam = 1, queryKey }) =>
  https.get(`/post/time-line-post?pageNumber=${pageParam}&pageSize=${2}&username=${queryKey[1]}`);

export const useGetPosts = ({ username }) => {
  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["posts", username], fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_count) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
    enabled: !!username,
  });

  return {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};



export const useLikeDisLikeMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return https.put(
      `/post/like-dislike/${payload}`,
    );
  });
  return { mutate, mutateAsync, isLoading };
};

export const useCreatePostMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return https.post(
      `/post/create`,
      payload
    );
  });
  return { mutate, mutateAsync, isLoading };
};




//testing infinityQuery and filter
const getTodo = ({ pageParam = 1, queryKey }) => {
  const status = queryKey[1]?.status || null
  const location = queryKey[2]?.location || null
  const price = queryKey[3]?.price || null
  if (!!location && !!status && !!price) {
    return https.get(
      `/post/todo?pageNumber=${pageParam}&pageSize=${page_size}&location=${location}&status=${status}&price=${price}`,
    )
  } else {
    return https.get(
      `/post/todo?pageNumber=${pageParam}&pageSize=${page_size}`,
    )
  }


}
export const useGetTodo = ({ status, location, price }) => {
  const { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['todos', { status }, { location }, { price }],
    getTodo,
    {
      getNextPageParam: (lastPage, pages) => {
        const maxPage = lastPage.data.total_count / page_size;
        const nextPage = pages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;

      },
    }
  );
  return { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
};