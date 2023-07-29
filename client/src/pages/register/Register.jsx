import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  const [Success, setSuccess] = useState('')

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };

  const handleClick = async (e) => {
    e.preventDefault(); // 提交表单默认刷新，阻止

    try {
      let data = await axios.post("http://localhost:8800/api/auth/register", inputs);
      setSuccess(data.status)
    } catch (err) {
      setErr(err.response.data);
    }
  };



  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>已有账号去登录</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="账号"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="邮箱"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="密码"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="用户名"
              name="name"
              onChange={handleChange}
            />
            <div style={{color:"red",fontSize:'12px'}}>{Success === '200'? '注册成功' : err}</div>
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
