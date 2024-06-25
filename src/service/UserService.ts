import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../models/IUser";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchAllUser: build.query<IUser[], number>({
            query: () => ({
                url: '/users'
            }),
            providesTags: result => ['User']
        }),
        registerUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        loginUser: build.query<IUser, IUser>({
            query: (userLogining) => ({
                url: '/users',
                transformResponse: (response: IUser[]) => {
                    response.find(user => user.username === userLogining.username)
                }
            }),
            providesTags: result => ['User']
        })
    })
})