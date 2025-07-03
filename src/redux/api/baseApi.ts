import {
  createApi,
  fetchBaseQuery,
  type DefinitionType,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { ThunkDispatch } from "@reduxjs/toolkit";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("authorization", token);
    return headers;
  },
  credentials: "include",
});

const baseQueryWithToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 500) {
    console.log("global error ->", result);
    // TODO: unauthorized logout
    return;
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithToken,
  tagTypes: ["products", "user-orders", "categories", "brands"],
  endpoints: () => ({}),
});
