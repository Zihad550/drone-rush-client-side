import { baseApi } from '@/redux/api/baseApi';
import type { IResponseRedux } from '@/types';
import type IShippingInfo from '@/types/shippingInfo.type';

const shippingInformationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getShippingInformations: build.query<
      IResponseRedux<IShippingInfo[]>,
      Record<string, string | number | undefined>
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (Object.keys(args)?.length) {
          Object.entries(args).forEach(([key, value]) => {
            if (value) params.append(key, String(value));
          });
        }
        return {
          url: '/shipping-information',
          method: 'GET',
          params,
        };
      },
      providesTags: ['shipping-informations'],
    }),

    getUserShippingInformations: build.query<
      IResponseRedux<IShippingInfo[]>,
      void
    >({
      query: () => ({
        url: '/shipping-information/user',
        method: 'GET',
      }),
      providesTags: ['shipping-informations'],
    }),
    getShippingInformationById: build.query<
      IResponseRedux<IShippingInfo>,
      string
    >({
      query: (id) => ({
        url: `/shipping-information/${id}`,
        method: 'GET',
      }),
      providesTags: ['shipping-informations'],
    }),

    createShippingInformation: build.mutation<
      IResponseRedux<IShippingInfo>,
      Partial<IShippingInfo>
    >({
      query: (payload) => ({
        url: '/shipping-information',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['shipping-informations'],
    }),

    updateShippingInformation: build.mutation<
      IResponseRedux<IShippingInfo>,
      {
        id: string;
        payload: Partial<IShippingInfo>;
      }
    >({
      query: ({ id, payload }) => ({
        url: `/shipping-information/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['shipping-informations'],
    }),

    deleteShippingInformation: build.mutation<
      IResponseRedux<IShippingInfo>,
      string
    >({
      query: (id) => ({
        url: `/shipping-information/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['shipping-informations'],
    }),
  }),
});

export const {
  useGetShippingInformationsQuery,
  useGetUserShippingInformationsQuery,
  useCreateShippingInformationMutation,
  useUpdateShippingInformationMutation,
  useDeleteShippingInformationMutation,
  useGetShippingInformationByIdQuery,
} = shippingInformationApi;
