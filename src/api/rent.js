import { useMutation, useQuery, queryCache } from "react-query";
import http from "lib/http";
// import { parseJsonString } from "lib/utils.js";

export const useAddTaskMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post("http://localhost:5001/tasks", payload);
  });
  return { mutate, mutateAsync, isLoading };
};

export const useToggleRemainderMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation(
    ({ id, ...payload }) => {
      return http.put(`http://localhost:5001/tasks/${id}`, payload);
    }
  );
  return { mutate, mutateAsync, isLoading };
};

export const useDeleteTask = () => {
  const { mutate, mutateAsync, isLoading } = useMutation(
    (id) => {
      return http.delete(`http://localhost:5001/tasks/${id}`);
    }
    // {
    //   onMutate: (id) => {
    //     const previousTask = queryCache.getQueryData("tasks");
    //     queryCache.setQueryData("tasks", (old) => [
    //       ...old.filter((x) => +x.id !== +id),
    //     ]);
    //     return () => queryCache.setQueryData("tasks", previousTask);
    //   },
    //   onError: (error, values, rollback) => rollback(),
    //   onSuccess: () => queryCache.setQueryData("tasks"),
    // }
  );
  return { mutate, mutateAsync, isLoading };
};

export const useGetTaskQuery = () => {
  const { data, isLoading, refetch, isFetching } = useQuery(
    "tasks",
    () => {
      return http.get("http://localhost:5001/tasks");
    },
    { enabled: true, cacheTime: 0, refetchOnWindowFocus: false }
  );

  return { data, isLoading, refetch, isFetching };
};

// export const useCancelRequestMutation = () => {
//   const { mutate, mutateAsync, isLoading } = useMutation((phone) => {
//     return http.post("https://wema.creditclan.com/rent/cancel/request", {
//       phone,
//     });
//   });
//   return { mutate, mutateAsync, isLoading };
// };

// export const useCancelCcRequestMutation = () => {
//   const { mutate, mutateAsync, isLoading } = useMutation((request_id) => {
//     return http.post(
//       "https://mobile.creditclan.com/api/v3/cancel/loan_request",
//       { request_id },
//       {
//         headers: {
//           "x-api-key":
//             "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
//         },
//       }
//     );
//   });
//   return { mutate, mutateAsync, isLoading };
// };

// export const useUploadImageMutation = () => {
//   const { mutate, mutateAsync, isLoading } = useMutation((file) => {
//     const fd = new FormData();
//     fd.append("file", file);
//     return http.post("https://mobile.creditclan.com/api/v3/upload/image", fd, {
//       headers: {
//         "x-api-key":
//           "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
//       },
//     });
//   });
//   return { mutate, mutateAsync, isLoading };
// };

// export const useGetLoanDetailsQuery = ({ email, phone, request_id }) => {
//   const { data, isLoading, refetch, isFetching } = useQuery(
//     ["loan", request_id],
//     async () => {
//       const { data } = await http.post(
//         "https://mobile.creditclan.com/api/v3/customer/check/details",
//         { email, phone },
//         {
//           headers: {
//             "x-api-key":
//               "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
//           },
//         }
//       );
//       const { token } = data;
//       const res = await http.post(
//         "https://mobile.creditclan.com/api/v3/loan/details",
//         { token, request_id },
//         {
//           headers: {
//             "x-api-key":
//               "WE4mwadGYqf0jv1ZkdFv1LNPMpZHuuzoDDiJpQQqaes3PzB7xlYhe8oHbxm6J228",
//           },
//         }
//       );
//       return res.data.data;
//     },
//     { enabled: !!request_id }
//   );
//   return { data, isLoading, refetch, isFetching };
// };
