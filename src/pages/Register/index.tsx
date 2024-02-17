  import { FormEvent, useEffect, useState } from "react";
  import { useAuthentication } from "../../hooks/useAuthentication";

  const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      setError("");

      const user = {
        displayName,
        email,
        password,
      };

      if (password !== ConfirmPassword) {
        setError("As senhas precisam ser iguais.");
        return;
      }

      const res = await createUser(user);

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      console.log(res);
    };

    useEffect(() => {
      if (authError) setError(authError.toString()); 
    }, [authError]);

    return (
      <>
        <div
          className="my-10 text-cyan-100 bg-gray-600 text-center p-2
                    shadow-2xl shadow-black border border-gray-500 w-64 mx-auto"
        >
          <h1 className="text-xl mb-2">Cadastre-se para postar</h1>
          <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
            <label>
              <span>Nome:</span>
              <input
                type="text"
                name="displayName"
                required
                placeholder="Nome do usuário"
                className="px-2 text-black bg-gray-300"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
            <label>
              <span>E-mail:</span>
              <input
                type="email"
                name="email"
                required
                placeholder="E-mail do usuário"
                className="px-2 text-black bg-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span>Senha:</span>
              <input
                type="password"
                name="password"
                required
                placeholder="Senha do usuário"
                className="px-2 text-black bg-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              <span>Confirme a senha:</span>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirme sua Senha"
                className="px-2 text-black bg-gray-300"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            {!loading && (
              <button
                className="border hover:text-gray-100 hover:border-gray-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-black 
            text-xl mx-auto w-28 border-gray-500 bg-gray-800"
              >
                Cadastrar
              </button>
            )}
            {loading && (
              <button
                disabled
                className="border hover:text-gray-100 hover:border-gray-300 hover:bg-gray-700 hover:shadow-lg hover:shadow-black 
            text-xl mx-auto w-28 border-gray-500 bg-gray-800"
              >
                Aguarde
              </button>
            )}

            {error && <p>{error}</p>}
          </form>
        </div>
      </>
    );
  };

  export { Register };
