import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Main.css";
import api from "../services/api";
import Cookies from "js-cookie";

export default function Main({ match, history }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: { user: match.params.id }
      });

      setUsers(response.data);
    }
    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io("http://localhost:3333/", {
      query: {
        user: match.params.id
      }
    });

    socket.on("match", dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => user._id !== id));
  }
  function logout() {
    Cookies.remove("token");
    history.push("/");
  }

  return (
    <div className="main-container">
      <h1>Twinder</h1>
      <button
        className="logout"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt="" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleLike(user._id)}>
                  Like
                </button>
                <button type="button" onClick={() => handleDislike(user._id)}>
                  Dislike
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2> Acabou</h2>
      )}

      {matchDev && (
        <div className="match-container">
          <h1>Its a Match!</h1>

          <img className="avatar" src={matchDev.avatar} alt="" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setMatchDev(false)}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
