<template>
  <div>
    <div class="back" @click="goBack">
      <img src="../../assets/arrow.png" width="30px" alt="back" />
      <span>Back</span>
    </div>
    <div class="login">
      <div class="boxx">
        <div class="roww-login">
          <div class="column-login">
            <div class="cardd greeting">
              <div class="greeting-content">
                <h1>Hello!</h1>
                <p>Start your journey with Itiner-easy, your one-stop travel companion.</p>
                <img class="vacationboy" src="../../assets/Traveling-rafiki.png" alt="">
              </div>
            </div>
          </div>
          <div class="column-login">
            <div class="cardd">
              <div class="centerr">
                <h1>Create an account</h1>
                <form @submit.prevent="register">
                  <div class="inputbox">
                    <input v-model="name" @input="checkName" type="text" required class="w-full p-3 rounded border" />
                    <span class="caption">
                      <span>Name <span style="color: red" class="warning">{{ nameWarning }}</span></span>
                    </span>
                  </div>
                  <div class="inputbox">
                    <input v-model="email" @input="checkEmail" type="text" required class="w-full p-3 rounded border" />
                    <span class="caption">
                      <span>Email <span style="color: red" class="warning">{{ emailWarning }}</span></span>
                    </span>
                  </div>
                  <div class="inputbox">
                    <input v-model="password" @input="checkPassword" type="password" required
                      class="w-full p-3 rounded border" />
                    <span class="caption">
                      <span>Password <span style="color: red" class="warning">{{ passwordWarning }}</span></span>
                    </span>

                  </div>
                  <div class="inputbox">
                    <input v-model="confirm" @input="checkConfirm" type="password" required
                      class="w-full p-3 rounded border" />
                    <span class="caption">
                      <span>Confirm Password <span style="color: red" class="warning">{{ ConfirmWarning }}</span></span>
                    </span>

                  </div>
                  <div class="inputbtn">
                    <transition name="slide-fade">
                      <button id="sign-in"
                        class="btn bg-[#4285F4] hover:bg-[#4285F4]/90 text-white font-bold py-2 px-4 rounded-full"
                        @click="register">
                        Sign up
                      </button>
                    </transition>

                  </div>
                  <div class="signup">
                    <p>
                      Have an account?
                      <router-link to="/sign-in" class="link" @click="goToLogin">Sign In</router-link>
                    </p>
                  </div>
                  <div class="flex justify-center m-4">
                    <div class="px-6 sm:px-0 max-w-sm ">
                      <button @click="signInWithGoogle"
                        class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-0.5 0 48 48" version="1.1">

                          <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Color-" transform="translate(-401.000000, -860.000000)">
                              <g id="Google" transform="translate(401.000000, 860.000000)">
                                <path
                                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                  id="Fill-1" fill="#FBBC05"> </path>
                                <path
                                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                  id="Fill-2" fill="#EB4335"> </path>
                                <path
                                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                  id="Fill-3" fill="#34A853"> </path>
                                <path
                                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                  id="Fill-4" fill="#4285F4"> </path>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>Continue with Google</span>
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useRouter } from 'vue-router'; //import router
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot } from "firebase/firestore";
const db = getFirestore();
const name = ref("");
const email = ref("");
const password = ref("");
const confirm = ref("");
const nameWarning = ref("");
const emailWarning = ref("");
const passwordWarning = ref("");
const ConfirmWarning = ref("");
const isValid = reactive({ email: false, password: false, confirm: false });
const router = useRouter() // get reference to vue router

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      setDoc(doc(db, "users", data.user.uid), {
        displayName: name.value,
        email: email.value,
        password: password.value,
        uid: data.user.uid,
        bio: "Bio",
        location: "Location",
        profilePic: "",
      });
      router.push('/feed') // redirect to feed
    })
    .catch((error) => {
      console.log(error.code);
      // alert(error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      router.push("/feed");
    })
    .catch((error) => {
      //handle error
    });
}

const goBack = () => {
  router.push('/'); // Go back to the home page
}

const goToLogin = () => {
  router.push("/sign-in");
}

const checkPassword = () => {
  if (password.value.length < 8) {
    passwordWarning.value = 'Needs to be at least 8 characters';
    isValid.password = false;
  } else {
    passwordWarning.value = '';
    isValid.password = true;
  }
  checkConfirm();
};

const checkConfirm = () => {
  if (confirm.value !== password.value && password.value.length >= 8) {
    ConfirmWarning.value = 'Password does not match';
    isValid.confirm = false;
  } else {
    ConfirmWarning.value = '';
    isValid.confirm = true;
  }
};

const checkEmail = () => {
  if (email.value.length === 0 || !email.value.includes('@')) {
    emailWarning.value = 'Invalid email';
    isValid.email = false;
  } else {
    emailWarning.value = '';
    isValid.email = true;
  }
};

const checkName = () => {
  if (name.value.length === 0) {
    nameWarning.value = 'Please enter a name';
    isValid.name = false;
  } else {
    nameWarning.value = '';
    isValid.name = true;
  }
};



</script>

<style>
.back {
  padding-left: 20px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100vw;
  position: sticky;
}

.back span {
  color: #024959;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
}

.back img {
  width: 15px;
  cursor: pointer;
}

.login {
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  padding: 0vh 10vw;
}

.boxx {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login .greeting {
  color: #024959;
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2vw;
  margin-left: 2vw;
  margin-bottom: 20px;
}

.login .greeting h1 {
  font-size: calc(3vw + 2em);
  margin-bottom: 3px;
  margin-top: 3px;
}

.login .greeting p {
  font-size: calc(0.75vw + 0.75em);
  margin: 0px;
}

.greeting-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}


.login .signup p {
  color: #EFF7FF;
  font-size: 15px;
}

.login .signup .link {
  text-decoration: none;
  color: #6EC1AF;
  margin-left: 10px;
}

.column-login {
  float: left;
  width: 50%;
}

.roww-login {
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.roww-login:after {
  content: "";
  display: table;
  clear: both;
}

.login .cardd {
  text-align: center;
}

@media screen and (max-width: 900px) {
  .roww-login {
    display: flex;
    flex-direction: column;

  }

  .column-login {
    width: 100%;
    display: block;
  }

  .vacationboy {
    width: 20vw;
  }

}

.login .centerr {
  position: relative;
  padding: 7vh 3vw;
  background: #024959;
  border-radius: 10px;
}

.login .centerr h1 {
  font-size: 2em;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
}

.login .inputbox {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  color: #fff;
  margin-right: 30px;
}

.login .inputbox input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 2px solid #fff;
  outline: none;
  background: none;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.8em;
  color: #fff;
  resize: vertical;
  margin: auto;
}

.login .inputbox input:invalid:focus {
  border-color: #CD2C2C;
}

.login .inputbox:last-child {
  margin-bottom: 0;
}

.login .inputbox .caption {
  position: absolute;
  top: 13px;
  left: 13px;
  font-size: 0.8em;
  transition: 0.6s;
  background-color: #024959;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
}

.login .inputbox input:focus~span,
.login .inputbox input:valid~span {
  transform: translateX(-14px) translateY(-20px);
  font-size: 0.8em;
}

.login .inputbtn {
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .login .warning {
    display: none;
  }

  /* .register .caption {
        color: red;
    } */
  .login .inputbox input {
    border-color: red;
  }
}

.vacationboy {
  max-width: 100%;
  /* Make the image responsive by setting its maximum width to 100% of the container */
  height: auto;
  /* Allow the image's height to adjust proportionally */
  display: block;
  /* Remove any extra spacing around the image */
}


.warning {
  margin-left: 10px;
  margin-right: 0px;
}</style>