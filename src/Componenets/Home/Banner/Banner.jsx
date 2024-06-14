import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="/src/assets/Banner.svg" className="max-w-lg" />
    <div>
      <h1 className="text-4xl font-bold">Stay on Track with TickTack Task!</h1>
      <p className="py-6 mr-0 lg:mr-6">
        Organize, prioritize, and complete your tasks with unparalleled efficiency. TickTack Task is your ultimate tool to streamline workflow, enhance productivity, and achieve your goals effortlessly. Stay ahead of deadlines, manage projects seamlessly, and experience a new level of task management ease.
      </p>
      <Link className=" rounded-lg px-6 py-3 border-4 border-orange-600 bg-orange-200 text-xl font-bold text-center" to="/login">
        Let's Explore!
      </Link>
    </div>
  </div>
</div>
  );
}

export default Banner;
