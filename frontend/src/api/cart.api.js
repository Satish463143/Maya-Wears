import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
          const token = localStorage.getItem('_at') || null; // Check for token    
          if (token) {
            headers.set("Authorization", "Bearer " + token); // If logged in, add token to headers
          }    
          return headers;
        },
      }),
    endpoints:(builder)=>({
        listAllCart : builder.query({
            query:(cartId)=> `/cart/${cartId}`,
            method:"GET"
        }),
        createCart :builder.mutation({
            query:(args)=>({
                url:'/cart',
                body:args,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        deleteCart:builder.mutation({
            query:(id)=>({
                url:`/cart/${id}`,
                method:"DELETE"
            })
        }),
        updateCart:builder.mutation({
            query:({productId, quantity })=>({
                url:`/cart/${productId}`,
                method:"PUT",
                body:{quantity}
            })
        })
    })
})
export const {useListAllCartQuery, useCreateCartMutation, useDeleteCartMutation, useUpdateCartMutation} = cartApi