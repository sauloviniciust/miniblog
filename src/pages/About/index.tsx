import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="h-screen">
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        MiniBlog Este miniblog foi criado com Vite+React+TypeScript, estilizado
        em TailwindCss. a fim de estudo das ferramentas, e pratica com
        Router-Dom,Hooks, Props, Map, Params, entre outras ferramentas. 
        O foco de estudo para este projeto foi o Firebase, em especifico o uso
        do authentication e firestore. O usuario pode se registrar com e-mail e
        senha, e assim logar, postar e ver os posts de outros usuarios que estão
        registrados na plataforma.
      </p>
      <Link to="/post/create">criar post </Link>
    </div>
  );
};

export { About };
