import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/sections/Navbar";

function App() {
	return (
		<div>
			<BrowserRouter>
				{/* <Navbar /> */}
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
