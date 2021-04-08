
import React,{useContext, useState} from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


// firebase.initializeApp(firebaseConfig)


function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState( 
    {
    isSignIn: false,
    
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

//   for connecting context user we used useContext
  const [loggedInUser,setLoggedInUser ] = useContext(UserContext); 

  const history = useHistory();
  const location = useLocation();
  
  let {from} = location.state || {form: {pathname: "/"}};




  // console.log(user)

  
  const GoogleSignIn=() => {
    handleGoogleSignIn()
  .then(res =>{
     handleResponse(res,true);
    // setUser(res);
    // setLoggedInUser(res);
    // history.replace(from);
  })
  }

  
   const SignOut=() => {
     handleSignOut()
     .then(res =>{
       handleResponse(res,false);
     })
   }

   const fbSignIn = () => {
     handleFbSignIn()
     .then(res =>{
      
      handleResponse(res,true);
      //  setUser(res);
      //  setLoggedInUser(res);
      //  history.replace(from);
     })
   }
  const handleChange = (e) => {
    console.log(e.target.name,e.target.value);
    

  }

  const handleSubmit = (e) => {
    // console.log(user.email,user.password);
    if(newUser && user.name && user.password){
      createUserWithEmailAndPassword(user.name,user.email, user.password)
      .then(res =>{
        handleResponse(res,true);
        
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
      })
     
    }


    if(!newUser && user.email && user.password){

       signInWithEmailAndPassword(user.email, user.password)
       .then(res =>{
        handleResponse(res,true);
        //  setUser(res);
        //  setLoggedInUser(res);
        //  history.replace(from);
       })
     
    }
    e.preventDefault();
  }
  
  const handleResponse =(res, redirect)=> {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur=(e)=> {
    let isFileValid = true;
    if(e.target.name=== 'email'){
         isFileValid = /\S+@\S+\.\S+/.test(e.target.value);
         
    }
    if (e.target.name=== 'password'){ 
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFileValid = isPasswordValid && passwordHasNumber

    }
    if(isFileValid){
      //  [...cart,newItem]
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }

 

  return (
    <div style={{textAlign: 'center'}}>
    {
      user.isSignIn ? <button onClick={SignOut}>Sign Out</button> :
      <button onClick={GoogleSignIn}>Sign In</button>
      
    }
    <br/>
    <button onClick={fbSignIn}>Sign in using Facebook</button>
     {
       user.isSignIn && 
       <div>
         <p> Welcome, {user.name}</p>
         <p>Your email: {user.email}</p>
         
         <img src={user.photo} alt=""/>
       </div>

     }

     <h1>Our own Authentication</h1>
     <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
     <label htmlFor="newUser">New User Sign up</label>
     
     <form onSubmit={handleSubmit}>
      {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="your name"/>}
       <br/>
     <input type="text" onBlur={handleBlur} name="email" placeholder="Your Email address" required/>
     <br/>
     <input type="password" onBlur={handleBlur} name="password" placeholder="your password" required/>
     <br/>
     <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
     </form>
     <p style={{color: 'red'}}>{user.error}</p>
     {user.success && <p style={{color: 'green'}}>User {newUser ?'created': "Logged In"} successfully</p>}
    </div>
  );
}

export default Login;
