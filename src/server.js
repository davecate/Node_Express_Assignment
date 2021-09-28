const { PORT = 5000 } = process.env
const app = require("./app")

const listener = () => console.log(`Now serving hot reloads on Port ${PORT}!`)
app.listen(PORT, listener)