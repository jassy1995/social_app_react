import {
  useMutation,
  useQuery,
  // useQueryClient,
  useInfiniteQuery,
} from "react-query";
import http from "lib/http";
import https from "lib/https";

export const useGetPropertyQuery = (param = {}) => {
  console.log(param);
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    "properties",
    ({ pageParam = 1 }) =>
      http.post(
        `http://localhost:4000/api/properties?pageNumber=${pageParam}&pageSize=${6}`,
        param
      ),
    {
      cacheTime: 0,
      getNextPageParam: (lastPage, pages) => {
        const maxPage = lastPage.data.total_count / 6;
        const nextPage = pages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;
      },
    }
  );
  return { data, isLoading, hasNextPage, fetchNextPage };
};

export const useGetPropertyQueryById = (id) => {
  const { data, isLoading } = useQuery("property", () =>
    http.get(`http://localhost:4000/api/properties/${id}`)
  );
  return { data, isLoading };
};

export const useLoginMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post("http://localhost:4000/api/properties/login", payload);
  });
  return { mutate, mutateAsync, isLoading };
};

export const useSignUpMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post("http://localhost:4000/api/properties/signUp", payload);
  });
  return { mutate, mutateAsync, isLoading };
};

export const useCreateOrderMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post(
      `http://localhost:4000/api/properties/create-order/${payload?.id}`,
      {
        name: payload?.name,
        email: payload?.email,
        phone: payload?.phone,
        message: payload?.message,
      }
    );
  });
  return { mutate, mutateAsync, isLoading };
};

const fetchOrders = (pageNumber) =>
  https.get(`/orders?pageNumber=${pageNumber}&pageSize=${2}`);
export const useGetOrder = (pageNumber) => {
  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
    isPreviousData,
  } = useQuery(["orders", pageNumber], () => fetchOrders(pageNumber), {
    enabled: !!pageNumber,
    staleTime: 30000,
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
    isPreviousData,
  };
};

export const useAddPropertyMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post(
      `http://localhost:4000/api/properties/create-property`,
      payload
    );
  });
  return { mutate, mutateAsync, isLoading };
};

export const useGetPropertyQueryOption = () => {
  const { data, isLoading } = useQuery("options", () =>
    http.get(`http://localhost:4000/api/properties/option`)
  );
  return { data, isLoading };
};
