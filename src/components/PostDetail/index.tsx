import { Link } from 'react-router-dom'
import { Document } from "./../../Interface/Document";


export const PostDetail = ({ post }: { post: Document }) => {
  return (
    <section className="grid grid-cols-2 shadow-2xl 
    hover:shadow-green-700 bg-gradient-to-b from-black to-slate-900 flex-col md:flex-col gap-4 lg:items-center lg:justify-center lg:flex-row" id="caminhada">
		
    <img className="w-96 shadow-2xl shadow-black rounded-md mx-4 " src={post.image} alt={post.title}/>

  <div className="font-lighter lg:w-1/2 mt-4">
    <h3 className="text-2xl lg text-center md:text-3xl lg:mb-3 lg:text-4xl mb-8">{post.title}</h3>
      <p>{post.createdBy}</p>
    <p className="text-xl lg:text-3xl md:text-2xl p-5  mb-8">
      {post.body}
    </p>
    <div className="animate-pulse md:text-3xl lg:text-4xl text-2xl font-lighter hover:text-red-600 text-center mb-10">
     
        <Link to={`/posts/${post.id}`} >
            Ler
        </Link>
    </div>
  </div>

        <div className='flex gap-3'>
        {post.tagsArray.map((tag: string) => (
            <p key={tag}>
                <span>#</span>
                {tag}
            </p>
        ))}
            
        </div>
</section>
   
  )
}
