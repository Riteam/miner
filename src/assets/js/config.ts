
import redstone from '../img/redstone.png'
// import copper from '../img/copper.png'
import gold from '../img/gold.png'
import emerald from '../img/emerald.png'
import diamond from '../img/diamond.png'
import lazuli from "../img/lazuli.png"
import amethyst from "../img/amethyst.png"
// import quartz from "../img/quartz.png"
import NetherStar from "../img/nether_star.png"


import TNT from "../img/TNT.png"

const Ores = [redstone, gold, emerald, diamond, lazuli, amethyst]

const Wonders = [
  TNT, NetherStar
]
const Size = 8

const Variety = Ores.length

export default { Size, Ores, Variety, Wonders }