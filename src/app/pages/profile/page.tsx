"use client"
import { useEffect, useState } from 'react';
import ArtBox from '@/app/components/ArtBox';

const
    Profile = () => {
        const [posts, setPosts] = useState([]);

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
            <div>
                <h1>This is feed</h1>
                <ul>
                    {posts.map(post => (
                        <div className="flex justify-center items-center p-2 bg-red-200 h-full">
                            <div className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow">
                                <li key={post.id}>{post.title}</li>
                                <ArtBox details={JSON.parse(post.postData)} />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }

export default Profile;
