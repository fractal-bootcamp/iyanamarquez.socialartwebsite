"use client"
import { useEffect, useState } from 'react';
import ArtBox from '@/app/components/ArtBox';

const Feed = () => {
    const [posts, setPosts] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 8;

    const fetchPosts = async (page: number) => {
        try {
            const response = await fetch(`/api/allposts?page=${page}&limit=${postsPerPage}`);
            const data = await response.json();
            setPosts(data.data);
            setTotalPosts(data.total);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

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
        fetchPosts(currentPage);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <h1 className='text-black text-4xl font-bold my-4 flex justify-center'>This is feed</h1>
            <div>
                <div className="-mx-4 flex flex-wrap p-8">
                    {posts.map((post: any, idx: number) => (
                        <div className="w-full px-4 md:w-1/2 lg:w-1/4" key={idx}>
                            <div className="mb-9 py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9 border">
                                <h2 className="text-lg font-bold text-gray-800 mb-4" key={post.id}>{post.title}</h2>
                                <h4>Posted by: {post?.author?.username || 'Unknown'}</h4>

                                <ArtBox details={JSON.parse(post?.postData)} />

                                <button onClick={() => handleLikes(post?.id)}>
                                    Likes: {post._count.likedBy}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center my-4">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1} className="mx-2 px-4 py-2 bg-gray-300 rounded disabled:hidden">
                        Previous
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage * postsPerPage >= totalPosts} className="mx-2 px-4 py-2 bg-gray-300 rounded disabled:hidden">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Feed;
