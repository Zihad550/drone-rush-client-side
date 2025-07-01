import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: "/login",
        body: payload,
        method: "POST",
      }),
    }),
    register: build.mutation({
      query: (payload) => ({
        url: "/register",
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
