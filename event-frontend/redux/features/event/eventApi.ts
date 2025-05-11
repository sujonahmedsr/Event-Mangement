import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (params) => ({
        url: "/event",
        params,
      }),
      providesTags: [tagTypes.event],
    }),
    getFeaturedEvent: builder.query({
      query: () => "/events/featured",
      providesTags: [tagTypes.event],
    }),
    getEventById: builder.query({
      query: (id) => `/event/${id}`,
      providesTags: [tagTypes.event],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetFeaturedEventQuery,
  useGetEventByIdQuery,
} = eventApi;
