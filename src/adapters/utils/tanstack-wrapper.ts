import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  MutationCallBackArgs,
  QueryCallBackArgs,
} from "../types/TanstackUtilTypes";

export const TanstackWrapper = {
  mutation: <TData, TVariables, TError = unknown, TContext = unknown>({
    mutationCallback,
    params,
    onMutate,
    onError,
    onSettled,
    onSuccess,
  }: {
    mutationCallback: ({
      payload,
      params,
    }: MutationCallBackArgs<TVariables>) => Promise<TData>;
    params?: string;
    onMutate?: (variables: TVariables) => Promise<TContext> | TContext;
    onError?: (
      error: TError,
      variables: TVariables,
      context: TContext | undefined
    ) => void | Promise<unknown>;
    onSettled?: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
      context: TContext | undefined
    ) => void | Promise<unknown>;
    onSuccess?: (
      data: TData,
      variables: TVariables,
      context: TContext | undefined
    ) => void | Promise<unknown>;
  }): UseMutationResult<TData, TError, TVariables, TContext> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation<TData, TError, TVariables, TContext>({
      mutationFn: (payload: TVariables) =>
        mutationCallback({ payload, params }),
      onMutate,
      onError,
      onSettled,
      onSuccess,
    });
  },
  query: <B>({
    queryCallback,
    queryKey,
    slug,
    enabled,
  }: QueryCallBackArgs<B>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: queryKey,
      queryFn: () => queryCallback(slug),
      enabled: enabled,
    });
  },
};

export default TanstackWrapper;
