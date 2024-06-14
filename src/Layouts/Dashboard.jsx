import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "./../Firebase/firebase.config";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged Out!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-50 min-h-full bg-base-200 text-base-content flex-col justify-between">
          {/* Sidebar content here */}
          <div>
            <li>
              <Link
                to={"/dashboard/NewTask"}
                className="mb-2 btn border-4 border-orange-600 bg-orange-200"
              >
                Create a task{" "}
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/AllTask"}
                className="mb-2 btn border-4 border-orange-600 bg-orange-200"
              >
                All Tasks
              </Link>
            </li>
          </div>
          <div className="">
            <li>
              <Link
                to="/"
                className="mb-2 btn border-4 border-orange-600 bg-orange-200"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="mb-2 btn border-4 border-orange-600 bg-orange-200"
              >
                Log Out
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
