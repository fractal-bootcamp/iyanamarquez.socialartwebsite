"use client";

import { useRef, useState } from "react";
import ArtBox from "@/app/components/ArtBox"
import { Canvas } from "@react-three/fiber";
const NewPost = () => {

    const [canvasDetails, setCanvasDetails] = useState({ width: 2, height: 2, scale: 1, zVal: 2 });
    const [data, setData] = useState(null);
    const [title, setTitle] = useState('new post');
    const labelStyle = 'block mb-2 text-sm font-small text-gray-900'
    const inputStyle = 'bg-gray-50 border border-gray-300 text-gray-9000 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 mr-2 mb-2 '

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCanvasDetails(prevDetails => ({
            ...prevDetails,
            [name]: Number(value)
        }));
    }
    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);

    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title, postData: canvasDetails }),
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    }

    return (
        <div className="flex justify-center items-center p-2 bg-red-200 h-full">
            <div className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Create new art</h5>
                </a>
                <form onSubmit={handleSubmit}>
                    <div className="bg-red-200 rounded-xl mb-4" >
                        <ArtBox details={canvasDetails} />
                    </div>
                    <div className="mb-3 font-normal text-gray-500 dark:text-gray-4000 flex flex-row flex-wrap">
                        <div>

                            <label className={labelStyle}>Title</label>
                            <input onChange={changeTitle} name="title" type="text" className={inputStyle}></input>
                        </div>
                        <div>
                            <label className={labelStyle}>Scale val</label>
                            <input onChange={handleChange} name="scale" type="number" step="0.01" className={inputStyle}></input>
                        </div>
                        <div>
                            <label className={labelStyle}>Width val</label>
                            <input onChange={handleChange} name="width" type="number" step="0.01" className={inputStyle}></input>
                        </div>
                        <div>
                            <label className={labelStyle}>Height val</label>
                            <input onChange={handleChange} name="height" type="number" step="0.01" className={inputStyle}></input>
                        </div>
                        <div>
                            <label className={labelStyle}>Z val</label>
                            <input onChange={handleChange} name="zVal" type="number" step="0.01" className={inputStyle}></input>
                        </div>
                    </div>
                    <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Post
                    </button>
                </form>
                <div>
                </div>
            </div>
        </div>)
}

export default NewPost

