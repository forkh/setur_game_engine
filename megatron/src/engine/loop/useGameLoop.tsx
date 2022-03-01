import { useContext } from "react";
import { GameLoopContext } from "./GameLoopContext";

export function useGameLoop() {
    return useContext(GameLoopContext);
}