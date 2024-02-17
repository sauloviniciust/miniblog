import { Link } from "react-router-dom";
import { PostDetail } from "../../components/PostDetail";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div>
      <h2>Search</h2>
      <div>
          {posts && posts.length === 0 && (
            <>
            <p>Não foram encontrados posts com esta tag</p>
            <Link to="/">
              voltar
            </Link>
            </>
          )}
        {posts && posts.map(
          (post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};
