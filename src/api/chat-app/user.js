import {
  useMutation,
  useQuery,
  useInfiniteQuery,
} from "react-query";
import https from "lib/https";
const page_size = 6


export const useGetFriendQuery = ({ userName }) => {
  const { data, isLoading, isError, error } = useQuery(["friends", userName], () =>
    https.get(`/user/friends?username=${userName}`),
    { enabled: !!userName, }
  );
  return { data, isLoading, isError, error };
};

export const useGetUser = ({ username }) => {
  const { data, isLoading, isError, error } = useQuery(["user", username], () =>
    https.get(`/user/${username}`),
    { enabled: !!username, }
  );
  return { data, isLoading, isError, error };
};

const fetchUsers = ({ pageParam = 1 }) =>
  https.get(`/user/users?pageNumber=${pageParam}&pageSize=${page_size}`);

export const useGetUsers = () => {
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
  } = useInfiniteQuery(["users"], fetchUsers, {
    getNextPageParam: (lastPage, pages) => {
      const maxPage = lastPage.data.total_count / page_size;
      const nextPage = pages.length + 1;
      return nextPage <= maxPage ? nextPage : undefined;
    },
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


export const useGetUserById = ({ id }) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery(["userById", id], () =>
    https.get(`/user/by-id/${id}`),
    { enabled: !!id, }
  );
  return { data, isLoading, isError, error, isSuccess };
};

export const useGetUserConversation = ({ id }) => {
  const { data, isLoading, isError, error } = useQuery(["conversations", id], () =>
    https.get(`/conversation/${id}`),
    { enabled: !!id, }
  );
  return { data, isLoading, isError, error };
};

export const useGetUserMessage = ({ id }) => {
  const { data, isLoading, isError, error } = useQuery(["messages", id], () =>
    https.get(`/message/${id}`),
    { enabled: !!id, }
  );
  return { data, isLoading, isError, error };
};

export const useCreateUserMessage = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((message) => {
    return https.post("message/create", message);
  },
  );
  return { mutate, mutateAsync, isLoading };
};


export const useFollowMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((id) => {
    return https.put(`user/follow/${id}`);
  });
  return { mutate, mutateAsync, isLoading };
};

export const useUnFollowMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((id) => {
    return https.put(`user/unfollow/${id}`);
  });
  return { mutate, mutateAsync, isLoading };
};




