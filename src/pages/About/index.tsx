import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="h-screen">
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>
      Este projeto consiste em um blog feito com React no front-end e firebase no back-end.
      </p>
      <Link to="/post/create">criar post </Link>
      </div>
  )
}

export { About }