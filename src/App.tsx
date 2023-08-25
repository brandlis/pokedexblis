import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { clearToasts, setUserStatus } from "./app/slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/FirebaseConfig";
import About from "./pages/About";
import Background from "./components/Background";
import Compare from "./pages/Compare";
import Footer from "./sections/Footer";
import MyList from "./pages/MyList";
import NavBar from "./sections/NavBar";
import Pokemon from "./pages/Pokemon";
import Search from "./pages/Search";

import "./scss/index.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currenUser) => {
      if (currenUser) {
        dispatch(setUserStatus({ email: currenUser.email }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <NavBar />
          <Routes>
            <Route element={<About />} path="/about" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<MyList />} path="/list" />
            <Route element={<Pokemon />} path="/pokemon/:id" />
            <Route element={<Search />} path="/search" />
            <Route element={<Navigate to="/pokemon/1" />} path="*" />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
