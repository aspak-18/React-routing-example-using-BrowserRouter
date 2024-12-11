import React, { useEffect, useState } from "react";
import style from "./profile.module.css";
import axios from "axios";

const Profile = () => {
  let userID = localStorage.getItem("userID");

  let [profileUser, setProfileUser] = useState(null);

  let [APIUsers, setAPIUsers] = useState(null);

  useEffect(() => {
    async function fetchAuthUser() {
      let { data } = await axios.get(`http://localhost:5000/users/${userID}`);
      // console.log(data);
      setProfileUser(data);
    }
    fetchAuthUser();
  }, []);

  useEffect(() => {
    async function fetchAPIUsers() {
      let { data } = await axios.get("https://api.github.com/users");
      console.log(data);
      setAPIUsers(data);
    }
    fetchAPIUsers();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>Welcome {profileUser?.name} 😊</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis harum
          in soluta aliquam, animi illo. Eveniet facilis rem nisi odit, ratione
          tempore quod quaerat rerum! Odit vero illum beatae soluta.
        </p>
      </div>
      <div className={style.apis}>
        {APIUsers?.map((user) => {
          let { login, avatar_url, html_url, type, id } = user;
          return (
            <section key={id}>
              <h1>{login}</h1>
              <img src={avatar_url} height={200} width={200} />
              <p>
                <a href={html_url}>view more</a>
              </p>
              <h3>{type}</h3>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
