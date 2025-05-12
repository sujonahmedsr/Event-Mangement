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
    getEventById: builder.query({
      query: (id) => `/event/${id}`,
      providesTags: [tagTypes.event],
    }),
    joinEvent: builder.mutation({
      query: ({ eventId }) => ({
        url: `/events/${eventId}/join`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useJoinEventMutation,
  useGetEventByIdQuery,
} = eventApi;
