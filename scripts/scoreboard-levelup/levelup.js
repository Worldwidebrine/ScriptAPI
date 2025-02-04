// https://discord.com/channels/523663022053392405/854033525546942464/995831911039647824
import { Player, world } from "@minecraft/server"

/**
 * Get score
 * @param {string} objective 
 * @param {Player | string} target 
 * @param {boolean} useZero 
 * @returns 
 */
function getScore(objective, target, useZero = false) {
  try {
    const obj = world.scoreboard.getObjective(objective);
    if (typeof target == 'string') {
      return obj.getScore(obj.getParticipants().find(v => v.displayName === target));
    }
    return obj.getScore(target.scoreboard);
  } catch {
    return useZero ? 0 : NaN;
  }
}

function levelup() {
  for (let player of world.getPlayers()) {
    let xp = getScore('xp', player, true);
    let xpmax = getScore('xpmax', player, true);
    let level = getScore('level', player, true);
    if (xp == xpmax && level <= 100) {
      player.runCommandAsync(`scoreboard players add @s level 1`)
      player.runCommandAsync(`scoreboard players set @s xp 0`)
      xpmax += xpmax + (xpmax * 0.03)
      player.runCommandAsync(`scoreboard players set @s xpmax ${xpmax}`)
    }
  }
}
export { levelup }
