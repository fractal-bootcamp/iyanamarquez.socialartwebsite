"use client";

import ArtBox from "@/app/components/ArtBox"
const NewPost = () => {
    return (

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">

            <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Create new art</h5>
            </a>
            <div className="w-4">
                <ArtBox />

            </div>

            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">need to add configs</p>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Post
            </button>

        </div>)

}

export default NewPost