const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./auth.routes");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const passport = require("passport");
const passportSetup = require("./config/passport-config");

// criando o servidor
const app = express();
app.use(cors());
app.use(cookieParser());
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
  console.log("Client connected:", user);
});

mongoose.connect(
  "mongodb+srv://filipez:filipez@cluster0-q5l38.mongodb.net/omnistack?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["teste"]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use(express.json());
app.use(routes);

server.listen(3333);
