import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const userApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users'
        }),
        getUserById: builder.query({ query: (id) => `users/${id}` }),
    })

})
// console.log(userApi)
export const { useGetUsersQuery,useGetUserByIdQuery } = userApi;