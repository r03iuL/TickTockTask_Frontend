import { Link } from "react-router-dom";
import auth from "../Firebase/firebase.config";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userinfo = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handlesignin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(email, password);

    console.log(email, password);
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userinfo?.[0]) {
      console.log(userinfo);
      navigate("/");
    }
  }, [userinfo, navigate]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="hero min-h-[400px] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className=" my-10 card shrink-0 w-[400px] max-w-xl shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handlesignin}>
            <div className="font-bold text-center text-xl">Log In!</div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary  text-white">
                Log In
              </button>
              {error && <p className="text-red-600" >{error?.message}</p>}
              <button
                onClick={handleGoogle}
                className="btn btn-primary  my-4  text-white"
              >
                Google LogIn
              </button>
              <Link
                to={`/signup`}
                className="my-2 text-m label-text-alt link link-hover"
              >
                Don&apos;t have an account?{" "}
                <span className="text-blue-500">SignUp.</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
