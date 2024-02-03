import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | true>("");

  const { login, error: authError, } = useAuthentication();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    setEmail("");
    setPassword("");

    console.log(res);
    console.log(error);
  };

  useEffect(() => {
    if (authError) {
      if (typeof authError === 'string') {
        setError(authError);
      } else {
        // Trate o erro booleano, se necessário
      }
    }
  }, [authError]);

  return (
    <div className="">
      <div
        className="my-10 text-cyan-100 bg-gray-600 text-center p-2
                    shadow-2xl shadow-black border border-gray-500 w-64 mx-auto"
      >
        <h1 className="text-xl mb-2">Entrar</h1>
        <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
          {/* Restante do código permanece inalterado */}
        </form>
      </div>
    </div>
  );
};
