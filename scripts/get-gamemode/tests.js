// Script examples for ScriptAPI
// Author: Jayly#1397 <Jayly Discord>
import { world } from "@minecraft/server";
import { getGamemode } from "get-gamemode";

world.events.beforeChat.subscribe((event) => {
  if (event.message !== 'gamemode') return;
  const gamemode = getGamemode(event.sender);
  event.sender.tell('GameMode' + gamemode);
})