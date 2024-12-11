import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  let [allRegisterdUser,setRegisterdUser]= useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    async function fetchRegisterUser() {
      let {data}=await axios.get("http://localhost:5000/users") 
      console.log(data)
      setRegisterdUser(data);
    }
    fetchRegisterUser();
  },[])

  let navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    let authUser=allRegisterdUser.find((user)=>{
      return(
        user.email === loginData.email &&
        user.password === loginData.password
      )
    })

    console.log(authUser)
    if(authUser.email==="admin@gmail.com" && authUser.password === "admin123"){
      toast.success(`Welcome ${authUser.name}`)
      localStorage.setItem("userID", authUser.id)
      navigate("/admin")
    }
    else if(authUser){
      toast.success(`Welcome ${authUser.name}`)
      localStorage.setItem("userID", authUser.id)
      localStorage.setItem('user',JSON.stringify(authUser))
      navigate("/profile")
    }
    else{
      toast.error("Access denied")
      navigate("/register")
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
