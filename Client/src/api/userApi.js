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
    })

})
// console.log(userApi)
export const { useGetUsersQuery, useGetUserByIdQuery, usePostUserByIDMutation } = userApi;
