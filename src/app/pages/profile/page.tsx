"use client"
import { useEffect, useState } from 'react';
import ArtBox from '@/app/components/ArtBox';

const
    Profile = () => {
        const [posts, setPosts] = useState<any>([]);

        useEffect(() => {
            const fetchPosts = async () => {
                try {
                    const response = await fetch('/api/users_posts');
                    const data = await response.json();
                    console.log("data is ", data.data)
                    setPosts(data.data);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            };

            fetchPosts();
        }, []);
        return (
            <div className='mt-4'>
                <h1 className='text-black text-4xl font-bold my-4 mx-4'>My Art</h1>
                <div>
                    <div className="-mx-4 flex flex-wrap p-8 bg-gray-100">
                        {posts.map((post: any) => (

                            <div className="w-full px-4 md:w-1/2 lg:w-1/4 ">
                                <div className="mb-9 py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9 border bg-white">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4" key={post.id}>{post.title}</h2>
                                    {/* <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac volutpat est.
                                        Praesent id purus a nunc pharetra facilisis.
                                    </p> */}

                                    <ArtBox details={JSON.parse(post.postData)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

export default Profile;
