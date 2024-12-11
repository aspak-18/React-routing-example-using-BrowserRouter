import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import style from "./admin.module.css";

const Admin = () => {
  let [allUserDetails, setAllUserDetails] = useState(null);
  let [toggle, setToggle] = useState(false);
  useEffect(() => {
    async function fetchAllRegisteredUser() {
      let { data } = await axios.get("http://localhost:5000/users");
      console.log(data);
      setAllUserDetails(data);
    }
    fetchAllRegisteredUser();
  }, [toggle]);

  let deleteUser = (x) => {
    console.log("delete", x);
    let confrom = confirm("Are you sure");
    if (confrom) {
      axios
        .delete(`http://localhost:5000/users/${x}`)
        .then(() => {
          toast.success("deleted");
          setToggle(!toggle);
        })
        .catch(() => {
          toast.error("unavble to deletes");
        });
    }
  };
  return (
    <div className={style.container}>
      {allUserDetails?.map(({ id, name, email, password, phone }) => {
        return (
          <section key={id} className={style.UserSection}>
            <div className={style.userData}>
              <h1>Name: {name}</h1>
              <h1>Email: {email}</h1>
              <h1>Password: {password}</h1>
              <h1>Phone: {phone}</h1>
            </div>
            { email!== "admin@gmail.com"  &&(
                <div className={style.userButton}>
                <button onClick={() => {deleteUser(id);}}disabled={email==="admin@gmail.com"}>
                  Delete
                </button>
                <button>Update</button>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Admin;
