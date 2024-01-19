


import Post from "@/models/Post";
import Link from "next/link";

export default async function Home() {

  const posts = await Post.find({})

  return (
    <div>
      <h1 className='py-10 text-2xl text-center font-bold text-slate-700'>Home</h1>
      <div className="md:grid md:gap-4 md:grid-cols-3">
        {posts.map((post) =>
          <div key={post.postId} id={post.postId} className="border border-slate-700 rounded-xl px-3 py-3">
            <p className="py-2">Posted by <strong>{post.username}</strong> on {post.date.toLocaleString()}</p>
            <h2 className="py-3 text-2xl text-slate-700 font-medium">{post.title}</h2>
            <p>{post.content.length > 425? post.content.slice(0,425) + " ...": post.content}</p>
          </div>)}
      </div>
    </div>
  )
}
