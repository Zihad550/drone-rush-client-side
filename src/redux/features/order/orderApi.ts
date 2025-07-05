import { baseApi } from "@/redux/api/baseApi";
import type { IResponseRedux, TOrderStatus } from "@/types";
import type IOrder from "@/types/order.type";
import type IShippingInfo from "@/types/shippingInfo.type";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserOrders: build.query({
      query: ({ page, status }: { status?: TOrderStatus; page?: number }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (status) params.append("status", status);
        return {
          url: "/orders/user",
          method: "GET",
          params,
        };
      },
      providesTags: ["user-orders"],
      transformResponse: (res: IResponseRedux<IOrder[]>) => ({
        data: res.data,
        meta: res.meta,
      }),
    }),
    getOrders: build.query<
      IResponseRedux<IOrder[]>,
      Record<string, string | number | undefined | any>
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (Object.keys(args)?.length) {
          Object.entries(args).forEach(([key, value]) => {
            if (value) params.append(key, String(value));
          });
        }
        return {
          url: "/orders",
          method: "GET",
          params,
        };
      },
      providesTags: ["user-orders"],
    }),
    updateOrderStatus: build.mutation<
      IResponseRedux<IOrder>,
      {
        payload: Pick<IOrder, "status" | "cancelReason">;
        id: string;
      }
    >({
      query: ({ payload, id }) => {
        return {
          url: `/orders/status/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["user-orders"],
    }),
    createOrder: build.mutation<
      IResponseRedux<IOrder>,
      {
        shippingInformation: Partial<IShippingInfo>;
        paymentMethod: string;
        products: string[];
      }
    >({
      query: (orderDetails) => {
        return {
          url: "/orders",
          method: "POST",
          body: orderDetails,
        };
      },
      invalidatesTags: ["user-orders"],
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
} = orderApi;
