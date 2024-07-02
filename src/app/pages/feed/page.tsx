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
            <div className=''>
                <h1 className='text-black text-4xl font-bold my-4'>This is feed</h1>
                <div>
                    <div className="-mx-4 flex flex-wrap p-8">
                        {posts.map(post => (

                            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                                <div class="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4" key={post.id}>{post.title}</h2>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac volutpat est.
                                        Praesent id purus a nunc pharetra facilisis.
                                    </p>
                                    <h4>Posted by: {post.author.username || 'Unknown'}</h4>

                                    <ArtBox details={JSON.parse(post.postData)} />

                                    <button onClick={() => handleLikes(post.id)}>
                                        Likes: {post._count.likedBy}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* erm */}

            </div>
        );
    }

export default Feed;
