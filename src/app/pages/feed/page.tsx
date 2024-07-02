"use client"
import { useEffect, useState } from 'react';
import ArtBox from '@/app/components/ArtBox';

const
    Feed = () => {
        const [posts, setPosts] = useState([]);
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/allposts');
                const data = await response.json();
                // Sort posts by most recent
                const sortedPosts = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        useEffect(() => {
            fetchPosts();
        }, []);

        const handleLikes = async (postId: number) => {
            try {
                const response = await fetch(`/api/likepost`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ postId }),
                });
                const data = await response.json();
                console.log('data')
                console.log(data);
            } catch (error) {
                console.error('Error liking post:', error);
            }
            fetchPosts();
        };

        return (
            <div className='bg-red-100 flex flex-row justify-center items-center flex-wrap'>
                <h1 className='text-black text-4xl font-bold my-4'>This is feed</h1>
                <div>
                    <ul className="flex flex-row flex-wrap justify-start content-center m-2">
                        {posts.map(post => (
                            <div className="flex justify-center items-center p-2 h-full ">
                                <div className="max-w-sm p-2 border border-black rounded-lg shadow bg-white">
                                    <h4>Posted by: {post.author.username || 'Unknown'}</h4>
                                    <li key={post.id}>{post.title}</li>
                                    <ArtBox details={JSON.parse(post.postData)} />
                                    <button onClick={() => handleLikes(post.id)}>
                                        Likes: {post._count.likedBy}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

export default Feed;
