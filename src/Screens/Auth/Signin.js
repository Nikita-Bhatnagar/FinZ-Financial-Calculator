import classes from "./Signin.module.css";
import img from "./../../assets/login.svg";
import img2 from "./../../assets/signup-illustration.svg";
import Spinner from "./../../Components/Spinner/Spinner";
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { register, login } from "../../Actions/userActions";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ApiService } from "../../ApiService";
const API_BASE_URL = 'http://127.0.0.1:8000'
const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const type = props.type;

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const login=async(data)=>{
    try{
    if(!data.name || !data.password || !data.name?.trim().length || !data.password?.trim().length){
      setError('Please enter username and password');
      return;
    }
      setLoading(true);
      const payload=JSON.stringify({
        password:data.password,
        username:data.name
      })
      const res = await fetch(API_BASE_URL+'/auth/token',{
        method:'POST',
        headers:{
          'Content-type':'Application/json'
        },
        body:payload
      });
      const response = await res.json();
      if(response.detail && typeof response.detail==='string'){
        setError(response.detail);
      }
      if(response?.tokens){
        localStorage.setItem('finz-tokens',JSON.stringify({access_token:response?.tokens?.access, refresh_token:response?.tokens?.refresh}));
        localStorage.setItem('finz-username',JSON.stringify(response?.profile?.firstName));
        navigate('/dashboard');
      }
  }catch(err){
    console.log(err);
  }
  finally{
    setLoading(false);
  }
    

  }
  const register=async(data)=>{
    try{
    if(!data.email || !data.password || !data.name){
      setError('Please fill in the required details');
      return;
    }
    const emailRegex = new RegExp(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,64}$/)
    if(!emailRegex.test(data.email)){
      setError('Please enter a valid email');
      return;
    }
    setLoading(true);
    const payload=JSON.stringify({
      username:name,
      email:email,
      password:password
    });
     setError('');
      const res = await fetch(API_BASE_URL+'/auth/create',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:payload
      });
      const response = await res?.json();
      if(response?.tokens){
        localStorage.setItem('finz-tokens',JSON.stringify({access_token:response?.tokens?.access, refresh_token:response?.tokens?.refresh}));
        localStorage.setItem('finz-username',JSON.stringify(response?.profile?.firstName));
        navigate('/dashboard');
      }
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }

  }

  const submitHandler = (e) => {
    e.preventDefault();
    setError('');
    if (props.type == "signin") {
      login({ name, password });
    } else if (props.type == "signup") {
      register({ email, password, name });
    }
    setEmail("");
    setPassword("");
    setName("");
  };

  // useEffect(() => {
  //   console.log("in useeffect");
  //   console.log(loading, error, userInfo);
  //   if (!loading && !error && userInfo) {
  //     console.log("if");
  //     navigate("/");
  //   }
  // }, [loading, error, userInfo]);

  return (
    <article
      className={classes.art}
      id="art"
      style={{ flexDirection: type === "signin" ? "row" : "row-reverse" }}
    >
      <div className={classes.div} id="div">
        <h1
          style={{ fontSize: "2.5em", marginBlockEnd: "0.65em" }}
          className={classes.inline}
        >
          {type === "signin" ? "Welcome back" : "Welcome to FinZ"}
        </h1>
        <h5
          style={{ margin: 0, fontSize: "0.947em", marginBottom:'1em' }}
          className={classes.inline}
        >
          {type === "signin"
            ? "Welcome back! Please enter your details."
            : "Enter details to create account"}
        </h5>
        <form
          style={{ marginTop: "1em", maxWidth: "55%" }}
          onSubmit={submitHandler}
        >
            <>
              <label
                htmlFor="fname"
                style={{ float: "left", fontWeight: "500" }}
                className="mb-2 mt-4"
              >
                Username
              </label>
              <input
                className={classes.input}
                type="text"
                id="fname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="pass"
                placeholder="Your name"
              />
            </>
          {props.type==='signup' && <>
         
          <label
            htmlFor="email"
            style={{ float: "left", fontWeight: "500" }}
            className="mb-2 mt-4"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
            placeholder="Enter your email"
          />
           </>}

          <label
            htmlFor="fpass"
            style={{ float: "left", fontWeight: "500" }}
            className="mb-2 mt-4"
          >
            Password
          </label>
          <input
            className={classes.input}
            type="password"
            id="fpass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="pass"
            placeholder="Your password"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className={classes.btn} type="submit">
            {type === "signin" ? "Sign in" : "Sign up"}
          </button>
          {type === "signin" && (
            <h6 style={{ textAlign: "center", fontSize: "1em" }}>
              Don't have an acount?{" "}
              <RouterLink  className={classes.link} to="/signup">Sign up for free</RouterLink>
            </h6>
          )}
          {type === "signup" && (
            <h6 style={{ textAlign: "center", fontSize: "1em" }}>
              Already have an account?{" "}
              <RouterLink className={classes.link}  to="/">Sign in</RouterLink>
            </h6>
          )}
        </form>
        {loading && <Spinner />}
      </div>
      <div
        className={classes.div}
        style={{ backgroundColor: "#00affe", flexBasis: "40%" }}
      >
        <img
          id="img1"
          className={classes.img1}
          src={type === "signin" ? img : img2}
        />
      </div>
    </article>
  );
};
export default Signin;
