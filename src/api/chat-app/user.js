import {
  useMutation,
  useQuery,
  // useQueryClient,
  useInfiniteQuery,
} from "react-query";
import https from "lib/https";


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

