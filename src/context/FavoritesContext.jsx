import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState({
		gradients: [],
		palettes: [],
	});

	useEffect(() => {
		// Load favorites from localStorage when the component mounts
		const favGradients = JSON.parse(localStorage.getItem("favorites")) || [];
		const favPalettes =
			JSON.parse(localStorage.getItem("FAVORITE PALETTES")) || [];
		setFavorites({ gradients: favGradients, palettes: favPalettes });
	}, []);

	const addFavoriteGradient = (gradient) => {
		const updatedGradients = [...favorites.gradients, gradient];
		setFavorites((prev) => ({ ...prev, gradients: updatedGradients }));
		localStorage.setItem("favorites", JSON.stringify(updatedGradients));
	};

	const removeFavoriteGradient = (gradientId) => {
		const updatedGradients = favorites.gradients.filter(
			(gradient) => gradient.id !== gradientId
		);
		setFavorites((prev) => ({ ...prev, gradients: updatedGradients }));
		localStorage.setItem("favorites", JSON.stringify(updatedGradients));
	};

	const addFavoritePalette = (palette) => {
		const updatedPalettes = [...favorites.palettes, palette];
		setFavorites((prev) => ({ ...prev, palettes: updatedPalettes }));
		localStorage.setItem("FAVORITE PALETTES", JSON.stringify(updatedPalettes));
	};

	const removeFavoritePalette = (paletteId) => {
		const updatedPalettes = favorites.palettes.filter(
			(palette) => palette.id !== paletteId
		);
		setFavorites((prev) => ({ ...prev, palettes: updatedPalettes }));
		localStorage.setItem("FAVORITE PALETTES", JSON.stringify(updatedPalettes));
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addFavoriteGradient,
				removeFavoriteGradient,
				addFavoritePalette,
				removeFavoritePalette,
			}}>
			{children}
		</FavoritesContext.Provider>
	);
};
