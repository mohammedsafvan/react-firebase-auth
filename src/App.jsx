import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import "./App.css";
import Form from "./components/common/Form";
import Home from "./components/common/Home";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    let authtoken = sessionStorage.getItem("auth-token");
    authtoken ? navigate("/home") : null;
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAction = (id) => {
    console.log(id);
    const authentication = getAuth();
    if (id === 1) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((res) => {
          sessionStorage.setItem("auth-token", res._tokenResponse.refreshToken);
          navigate("/home");
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            toast.error("Email already in use!");
          }
        });
    } else if (id === 0) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((res) => {
          sessionStorage.setItem("auth-token", res._tokenResponse.refreshToken);
          navigate("/home");
        })
        .catch((err) => {
          if (err.code === "auth/wrong-password") {
            toast.error("Provide your password correctly");
          }
          if (err.code === "auth/user-not-found") {
            toast.error("Check your mail");
          }
        });
    }
  };

  return (
    <div className="App">
      <>
        <ToastContainer />
        <Routes>
          <Route
            path="/login"
            element={
              <Form
                title="Login"
                setPassword={setPassword}
                setEmail={setEmail}
                handleAction={() => handleAction(0)}
              />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route
            path="/register"
            element={
              <Form
                title="Register"
                setPassword={setPassword}
                setEmail={setEmail}
                handleAction={() => handleAction(1)}
              />
            }
          />
        </Routes>
      </>
    </div>
  );
}

export default App;
