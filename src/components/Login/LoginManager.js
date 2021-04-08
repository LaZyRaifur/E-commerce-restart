
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.confige';



// as this function use for another place so we need to use export key word
export const initializeLoginFramework = ()=>{
    
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
}


export const handleGoogleSignIn = ()=>{

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      

      const signedInUser = {
        isSignIn:true,
        name: displayName,
        email: email,
        photo:photoURL,
        success: true
      }
      return signedInUser;
      // console.log(displayName,email,photoURL);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }


  
  export const handleFbSignIn= () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    user.success = true;
    return user;
    

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
  }

export const handleSignOut = () => {
   return firebase.auth().signOut().then(res => {

      const signOutUser = {isSignIn: false,
      name: '',
      photo:'',
      error:'',
      email: '',
      success:false
  }
  
  return signOutUser;
  
    })
    .catch(err => {
      // An error happen
    })
  }

  export const createUserWithEmailAndPassword = (name,email,password) =>{
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in 
      const newUserInfo = res.user;
      newUserInfo.error ='';
      newUserInfo.success =true;
      // setUser(newUserInfo);
      updateUserName(name);
      return newUserInfo;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;


      return newUserInfo;
      // setUser(newUserInfo);
      // ..
    });
  }

  export const signInWithEmailAndPassword =(email, password) =>{
   return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
          newUserInfo.error ='';
          newUserInfo.success =true;
          // setUser submit only local storage
          return newUserInfo;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated')
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });

  }