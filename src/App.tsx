import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//pages
import { Nav } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register/index";

//context
import { AuthProvider } from "./context/authContext";
import { useAuthentication } from "./hooks/useAuthentication";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { CreatePost } from "./pages/CreatePost";
import { Dashboard } from "./pages/Dashboard";
import { Search } from "./pages/Search";

function App() {
  const [user, setUser] = useState<User | null>(null); // Fornecendo o tipo explicitamente
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
    // Cleanup da subscrição ao desmontar o componente
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/register" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/register" />}
            />
            <Route
              path="/posts/create"
              element={user ? <CreatePost /> : <Navigate to="/register" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/register" />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
