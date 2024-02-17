import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//components
import { PostDetail } from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  
  
  const { documents: posts, loading } = useFetchDocuments("posts", query);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`)
    } 
  };

  return (
    <>
      <div className="flex gap-5 justify-center my-10 ">
        <h1 className="text-xl">Veja os posts mais recentes.</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ou busque por tags..."
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 bg-zinc-800 border border-black"
          />
          <button className="px-3 bg-zinc-500 border border-black">
            Pesquisar</button>
        </form>
      </div>
      <div>
        <div >
          {loading && <p>Carregando...</p>}
          {posts &&
            posts.map((post) => {
              return <PostDetail key={post.id} post={post} />;
            })}
          {posts && posts.length === 0 && (
            <div>
              <p>Não foram encontrados posts</p>
              <Link to="posts/create">Criar primeiro post</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { Home };
