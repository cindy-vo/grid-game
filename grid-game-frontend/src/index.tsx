import ReactDOM from "react-dom/client";
import "./index.css";
import GridGame from "./GridGame";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<GridGame />);
