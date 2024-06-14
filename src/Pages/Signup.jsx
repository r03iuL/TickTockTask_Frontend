import { Link } from "react-router-dom";
import auth from "../Firebase/firebase.config";
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const userinfo = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const[passMatch,setPassMatch] = useState(true);

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const cpassword = form.cpassword.value;
    if (password !== cpassword) {
      setPassMatch(false);
      
    } else {
      createUserWithEmailAndPassword(email, password);
    }
    

    console.log(email, password);
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
          <form className="card-body" onSubmit={handleSignup}>
            <div className="font-bold text-center text-xl">Sign Up!</div>
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
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="cpassword"
                placeholder="confirm password"
                className="input input-bordered"
                required
              />
              {!passMatch && <p className="text-red-600">Password didn&apos;t match...try again.</p>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white">
                Sign Up
              </button>
              {error && <p className="text-red-600">{error?.message}</p>}
              <button
                onClick={handleGoogle}
                className="btn btn-primary  my-4  text-white"
              >
                Google LogIn
              </button>
              <Link
                to={`/login`}
                className="my-2 text-m label-text-alt link link-hover"
              >
                Already have an account?{" "}
                <span className="text-blue-500">Log In.</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
