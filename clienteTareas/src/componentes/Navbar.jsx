import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-zinc-200 flex justify-between px-10 py-10">
      <Link to="/" className="text-black font-bold text-3xl">
        <h1>React con MySQL</h1>
      </Link>
      <ul className="flex gap-x-1">
        <li>
          <Link to="/" className="bg-zinc-400 px-2 py-1 text-center  rounded-sm">Home</Link>
        </li>
        <li>
          <Link to="/new" className="bg-zinc-400 px-2 py-1 text-center  rounded-sm">Crear</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
