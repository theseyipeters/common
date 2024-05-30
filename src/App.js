import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import GradientDetails from "./pages/gradients/GradientDetails";
import { FavoritesProvider } from "./context/FavoritesContext";
import PaletteDetails from "./pages/palettes/PaletteDetails";
import Saved from "./pages/saved/Saved";

function App() {
	return (
		<FavoritesProvider>
			<div>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/gradient/:encodedGradient"
							element={<GradientDetails />}
						/>
						<Route
							path="/palette/:encodedPalette"
							element={<PaletteDetails />}
						/>
						<Route
							path="/saved"
							element={<Saved />}
						/>{" "}
					</Routes>
				</BrowserRouter>
			</div>
		</FavoritesProvider>
	);
}

export default App;
