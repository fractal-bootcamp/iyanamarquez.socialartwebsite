"use client"
import ArtBox from "./components/ArtBox";

const Home = () => {
  const artBoxData = [
    { scale: 1, width: 1, height: 1, zVal: 1 },
    { scale: 1.2, width: 1.1, height: 1.1, zVal: 1.1 },
    { scale: 0.8, width: 0.9, height: 0.9, zVal: 0.9 },
    { scale: 1.5, width: 1.2, height: 1.2, zVal: 1.2 },
    { scale: 1.1, width: 1.3, height: 1.3, zVal: 1.3 },
    { scale: 0.9, width: 1.4, height: 1.4, zVal: 1.4 },
    { scale: 1.3, width: 1.5, height: 1.5, zVal: 1.5 },
    { scale: 1.4, width: 1.6, height: 1.6, zVal: 1.6 },
  ];

  const artBoxes = artBoxData.slice(0, 8).map((details, index) => (
    <div className="w-full px-4 md:w-1/2 lg:w-1/4" key={index}>
      <div className="mb-9 py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9 border">
        <ArtBox details={details} />
      </div>
    </div>
  ));

  return (
    <div>
      <h1 className='text-black text-4xl font-bold my-4 flex justify-center'>Sign in to create your own art</h1>
      <div>
        <div className="-mx-4 flex flex-wrap p-8">
          {/* {posts.map((post: any, idx: number) => (
            <div className="w-full px-4 md:w-1/2 lg:w-1/4" key={idx}>
              <div className="mb-9 py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9 border">
                <h2 className="text-lg font-bold text-gray-800 mb-4" key={post.id}>{post.title}</h2>
                <h4>Posted by: {post?.author?.username || 'Unknown'}</h4>
                <ArtBox details={JSON.parse(post?.postData)} />
              </div>
            </div>
          ))} */}
          {artBoxes}
        </div>
      </div>
    </div>
  );
}

export default Home;