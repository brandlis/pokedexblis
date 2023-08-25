import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import { userPokemonsType } from "../../utils/Types";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/getPokemonTypes";

export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }) => {
    try {
      const {
        app: { userInfo },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return;
      }
      const firestoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo.email)
      );
      const fetchPokemons = await getDocs(firestoreQuery);
      if (fetchPokemons.docs.length) {
        const userPokemons: userPokemonsType[] = [];
        fetchPokemons.forEach(async (pokemon) => {
          const pokemons = await pokemon.data().pokemon;
          // @ts-ignore
          let image = images[pokemons.id];
          if (!image) {
            // @ts-ignore
            image = defaultImages[pokemons.id];
          }
          const types = pokemons.types.map((name: string) => ({
            // @ts-ignore
            [name]: pokemonTypes[name],
          }));

          userPokemons.push({
            ...pokemons,
            firebaseId: pokemon.id,
            image,
            types,
          });
        });
        return userPokemons;
      }
      return [];
    } catch (err) {
      console.error(err);
    }
  }
);
