import { io } from "socket.io-client"

const socket = io("ws://0.0.0.0:5000")
// const socket = io("ws://192.168.43.246:5000")

export default socket