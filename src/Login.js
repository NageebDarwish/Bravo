import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios("https://test.emkanfinances.net/api/auth/login?", {
        method: "POST",
        data: {
          email: email,
          password: password,
          password_confirmation: password,
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        // storing input name
        localStorage.setItem("email", JSON.stringify(email));
        window.location.href = "/";
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      setError("invalid Password Or username");
    }
  };

  return (
    <>
      <Header />

      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2
                      className="text-uppercase text-center mb-3"
                      style={{ color: "black" }}
                    >
                      Login
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <label className="form-label" for="form3Example3cg">
                        Your Email
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          placeholder="john@gmail.com"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </div>
                      <label className="form-label" for="form3Example4cg">
                        Password
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          placeholder="password"
                          name="passowrd"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4"
                          style={{ color: "white" }}
                        >
                          Login
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Dosn't Have an account?{" "}
                        <Link to="/register" className="fw-bold">
                          <u>SignUp here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
