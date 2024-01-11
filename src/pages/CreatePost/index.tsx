import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useAuthValue } from "../../context/authContext";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");


  const {insertDocument, response} = useInsertDocument("posts");

  const navigate = useNavigate()

  const {user} = useAuthValue();


  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormError("")

    //validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }


    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => 
    tag.trim().toLowerCase());

    //checar todos valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor preencha todos os campos!")
      
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      iud: user.uid,
      createdBy: user.displayName,
    })

    navigate("/");
  };

  return (
    <div
      className="my-10 w-2/3 text-cyan-100 bg-gray-600 p-2 mx-auto
                  shadow-2xl shadow-black border border-gray-500"
    >
      <h2 className="text-xl mb-2">Criar post</h2>
      <p>
        escreva sobre o que quiser e compartilhe seu conhecimento e experiencia
      </p>
      <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
        <label>
          <span>Titulo: </span>
          <input
            type="text"
            name="title"
            required
            className="px-2 text-black bg-gray-300"
            placeholder="Escreva um titulo..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Url da imagem: </span>
          <input
            type="text"
            name="image"
            required
            className="px-2 text-black bg-gray-300"
            placeholder="Insira o link da imagem..."
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Body: </span>
          <textarea
            name="body"
            required
            className="px-2 text-black bg-gray-300"
            placeholder="Escreva o conteudo do post..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>

        <label>
          <span>Tags: </span>
          <input
            type="text"
            name="tags"
            required
            className="px-2 text-black bg-gray-300"
            placeholder="Insira as tags separadas por virgula..."
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>


        {!response.loading && (
        <button
          className="border hover:text-gray-100 hover:border-gray-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-black 
          text-xl mx-auto w-28 border-gray-500 bg-gray-800"
        >
          Postar
        </button>
          )}
          {response.loading && (
            <button
              disabled
              className="border hover:text-gray-100 hover:border-gray-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-black 
          text-xl mx-auto w-28 border-gray-500 bg-gray-800"
            >
              Aguarde
            </button>
          )}

          {response.error && <p>{response.error}</p>}
          {formError && <p>{formError}</p>}
      </form>
    </div>
  );
};
