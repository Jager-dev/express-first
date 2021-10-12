const express = require("express")
const fs = require("fs")

const server = express()

server.use(express.json())

const getAllUsers = () => {
  return JSON.parse(fs.readFileSync("users.json", "utf-8"))
}

server.get("/api/users", (req, res) => {
  const users = getAllUsers()
  res.json(users)
})

server.get("/api/users/:id", (req, res) => {
  const users = getAllUsers()
  const user = users.find(item => item.id === +req.params.id)
  res.json(user)
})

server.delete("/api/users/:id", (req, res) => {
  const users = getAllUsers()
  const findUser = users.find(item => item.id === +req.params.id)
  const filteredUsers = users.filter(item => item.id !== +req.params.id)
  fs.writeFileSync("users.json", JSON.stringify(filteredUsers , null, 2))
  res.json(findUser)
})

server.put("/api/users", (req, res) => {
  const users = getAllUsers()
  const updateUser = users.map(item => item.name = item.name = "www")
  fs.writeFileSync("users.json", JSON.stringify(updateUser , null, 2))
  res.json(updateUser)
})

server.post("/api/users", (req, res) => {
  const users = getAllUsers()
  const addUser = [...users, req.body]
  fs.writeFileSync("users.json", JSON.stringify(addUser , null, 2))
  res.json(addUser)
})

server.listen(8000, () => {
  console.log("Server is running")
})