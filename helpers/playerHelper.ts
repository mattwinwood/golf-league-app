import playerData from "../data/players.json"

const playerHelper = {
    getPlayerRecord: (userName) => {
        return playerData.data.players.find((player) => {
            return player.userName.trim().toLowerCase() === userName.trim().toLowerCase()
        })
    }
}
export default playerHelper;
