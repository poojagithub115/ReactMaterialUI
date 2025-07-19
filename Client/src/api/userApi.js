import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const userApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users'
        }),
        getUserById: builder.query({ query: (id) => `users/${id}` }),
        postUserByID: builder.mutation({
            query: ({ id, data }) => ({
                url: `users/${id}`,
                method: 'POST',
                body: data,
            }),
        }),
        postUser: builder.mutation({
            query: ({ data }) => ({
                url: `users/`,
                method: 'POST',
                body: data,
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
              url: `/users/${id}`,
              method: 'DELETE',
            }),
            // invalidatesTags: ['Job'],
          }),
    })

})
// console.log(userApi)
export const { useGetUsersQuery, useGetUserByIdQuery, usePostUserByIDMutation, usePostUserMutation, useDeleteUserMutation } = userApi;
