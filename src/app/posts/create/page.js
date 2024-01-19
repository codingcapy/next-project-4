


import { auth } from "@/auth";
import { createPost } from "@/components/controller";

export default async function CreatePostPage() {

    const session = await auth()

    return (
        <div>
            <h2 className="py-10 text-2xl text-slate-700 font-medium text-center">Create Post</h2>
            {JSON.stringify(session)}
            <form action={createPost} className="flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="title" >Title</label>
                    <input type="text" name='title' id='title' placeholder="Title" required className="px-2 border rounded-lg border-slate-700 py-1" />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name='content' id='content' placeholder='Content' required rows="10" cols="40" className="px-2 border rounded-lg border-slate-700 py-1" />
                </div>
                <input id="username" name="username" defaultValue={session?.user.username} className="hidden" />
                <input id="userid" name="userid" defaultValue={session?.user.userId} className="hidden" />
                <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Create</button>
            </form>
        </div>
    )
}