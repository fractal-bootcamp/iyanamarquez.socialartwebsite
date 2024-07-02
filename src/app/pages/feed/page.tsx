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
                console.log(data)
                console.log("data is ", data)
                setPosts(data.data);
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
            <div>
                <h1>This is feed</h1>
                <ul>
                    {posts.map(post => (
                        <div className="flex justify-center items-center p-2 bg-red-200 h-full">
                            {console.log('post is ', post)}

                            <div className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow">
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
        );
    }

export default Feed;
