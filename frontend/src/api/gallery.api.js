import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const GalleryApi = createApi({
    reducerPath: "galleryApi",
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem('_at') || null
            if(token){
                headers.set("Authorization", "Bearer "+token)
            }
        }
    }),
    endpoints:(builder)=>({
        create:builder.mutation({
            query:(args)=>({
                url:'/gallery',
                method:"POST",
                body:args,
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        listAllGallery:builder.query({
            query:({ page = 1, limit = 20,})=>`/gallery?page=${page}&limit=${limit}`,
            method:'GET'
        }),
        deleteGallery:builder.mutation({
            query:({ imageUrl})=>({
                url:`/gallery/delete-by-url/${encodeURIComponent(imageUrl)}`,
                method:"DELETE",
            })
        })       

    })

})

export const  {useCreateMutation, useListAllGalleryQuery, useDeleteGalleryMutation} =  GalleryApi