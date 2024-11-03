import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col justify-center align-middle">
        <a href="https://vitejs.dev" target="_blank" className="flex align-middle justify-center">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="flex align-middle justify-center">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl underline font-bold decoration-[#00d8ff]">Vite + React</h1>
      <div>
        <h1 className="text-4xl font-bold underline decoration-[#00d8ff]">
          Hello world with Tailwind CSS!
        </h1>
      </div>
    </>
  );
}

export default App;
