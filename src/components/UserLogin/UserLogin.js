import React, { useState, useRef } from "react";
import styles from "./UserLogin.module.css";
import { useNavigate } from "react-router-dom";
import { ref, set, onValue } from "firebase/database";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import useInput from "../../hooks/useInput";
import { alertUser } from "../../features/userAlertSlice";
function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggingIn, setloggingIn] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const inputName = useRef("");
  const userLastName = useRef("");

  //New User form Validation
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);
  const [googleAgree, setGoogleAgree] = useState(false);
  const googleTerms = useRef();
  const {
    isValid: enteredFirstNameIsValid,
    hasError: firstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    isValid: enteredLastNameIsValid,
    hasError: lastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: LastNameBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));
  const {
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.length >= 6);
  const googleTermsHandler = () => {
    if (googleTerms.current.checked) {
      setGoogleAgree(true);
    } else if (!googleTerms.current.checked) {
      setGoogleAgree(false);
    }
  };

  //Push new user to Firebase
  const sendUserInfo = (name, userId, lastName, email) => {
    set(ref(db, "users/" + userId), {
      username: name,
      lastName: lastName,
      email: email,
      favorites: 0,
      cart: 0,
    });
  };

  // Sign in current user
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        if (auth) {
          const userId = auth.currentUser.uid;
          return onValue(
            ref(db, "/users/" + userId),
            (snapshot) => {
              const username =
                (snapshot.val() && snapshot.val().username) || "Anonymous";
              dispatch(login(username));
              navigate(-1);
            },
            {
              onlyOnce: true,
            }
          );
        }
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/invalid-email" || error.code === 'auth/user-not-found'){
          dispatch(alertUser({ message: 'invalid-email', type: "error" }));
        }else if(error.code === 'auth/wrong-password' || error.code === 'auth/internal-error'){
          dispatch(alertUser({message: 'invalid password', type: 'error'}))
        }
      });
  };
  //Register new user
  const register = (e) => {
    e.preventDefault();
    setFormIsSubmitting(true);
    if (enteredLastNameIsValid && enteredFirstNameIsValid && googleAgree) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          if (auth) {
            dispatch(
              login({
                userName: inputName.current.value,
                lastName: userLastName.current.value,
                email: email.current.value,
              })
            );
            sendUserInfo(
              inputName.current.value,
              auth.currentUser.uid,
              userLastName.current.value,
              email.current.value
            );
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const loginTypeHandler = () => {
    setloggingIn(() => !loggingIn);
  };
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <div className={styles.login__main}>
      <div className={styles.login__backBTN}>
        <div className={styles.SVG__holder}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 20.243 13.501"
          >
            <path
              id="Icon_ionic-ios-arrow-round-back"
              data-name="Icon ionic-ios-arrow-round-back"
              d="M15.216,11.51a.919.919,0,0,1,.007,1.294l-4.268,4.282H27.218a.914.914,0,0,1,0,1.828H10.955L15.23,23.2a.925.925,0,0,1-.007,1.294.91.91,0,0,1-1.287-.007L8.142,18.647h0a1.026,1.026,0,0,1-.19-.288.872.872,0,0,1-.07-.352.916.916,0,0,1,.26-.64l5.794-5.836A.9.9,0,0,1,15.216,11.51Z"
              transform="translate(-7.882 -11.252)"
            />
          </svg>
        </div>
        <div onClick={backHandler} className={styles["back-button"]}>
          back
        </div>
      </div>

      {/* Login Form */}
      {loggingIn && (
        <div className={styles.form__contentContainer}>
          <div className={styles.form__title__holder}>
            <span className={styles["login-title"]}>Log in</span>
            <p>Login to view your favorites and many more benefits.</p>
          </div>
          <form className={styles.form__info__container}>
            <input ref={email} type="email" name="email" placeholder="E-mail" />
            <input
              ref={password}
              type="password"
              name="password"
              placeholder="Password"
            />
            <div className={styles.forgot__password__holder}>
              <span className={styles.forgotPassword__link}>
                forgot password?
              </span>
            </div>
            <div className={styles.logIn__links__holder}>
              <div className={styles.login__link}>
                <div className={styles.linkSVG}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 10.916 20.381"
                  >
                    <path
                      id="Icon_awesome-facebook-f"
                      data-name="Icon awesome-facebook-f"
                      d="M11.81,11.465l.566-3.689H8.837V5.382a1.844,1.844,0,0,1,2.08-1.993h1.609V.249A19.622,19.622,0,0,0,9.669,0c-2.915,0-4.82,1.767-4.82,4.965V7.776H1.609v3.689h3.24v8.917H8.837V11.465Z"
                      transform="translate(-1.609)"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <span>Facebook</span>
              </div>
              <div className={`${styles.login__link} ${styles.gmail__link}`}>
                <div className={styles.linkSVG}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 19.253 14.667"
                  >
                    <g id="gmail" transform="translate(0 -60.983)">
                      <g
                        id="Group_11"
                        data-name="Group 11"
                        transform="translate(1.255 60.983)"
                      >
                        <path
                          id="Path_11"
                          data-name="Path 11"
                          d="M50.36,122.808,49.131,135.15H34.369l-.99-12.1,8.371,4.687Z"
                          transform="translate(-33.379 -120.483)"
                          fill="#f2f2f2"
                        />
                        <path
                          id="Path_12"
                          data-name="Path 12"
                          d="M54.5,60.983l-8.193,7.7-8.193-7.7H54.5Z"
                          transform="translate(-37.936 -60.983)"
                          fill="#f2f2f2"
                        />
                      </g>
                      <path
                        id="Path_13"
                        data-name="Path 13"
                        d="M2.245,113.6v11.113H.908A.908.908,0,0,1,0,123.809V111.967l1.467.04Z"
                        transform="translate(0 -49.067)"
                        fill="#f14336"
                      />
                      <path
                        id="Path_14"
                        data-name="Path 14"
                        d="M454.533,109.081v11.842a.908.908,0,0,1-.908.908h-1.337V110.717l.74-1.749Z"
                        transform="translate(-435.28 -46.181)"
                        fill="#d32e2a"
                      />
                      <path
                        id="Path_15"
                        data-name="Path 15"
                        d="M19.253,61.891V62.9l-2.245,1.637-7.381,5.38-7.381-5.38L0,62.9V61.891a.908.908,0,0,1,.908-.908h.526l8.193,5.972,8.193-5.972h.525A.908.908,0,0,1,19.253,61.891Z"
                        fill="#f14336"
                      />
                      <path
                        id="Path_16"
                        data-name="Path 16"
                        d="M2.245,113.6,0,113.256v-1.289Z"
                        transform="translate(0 -49.067)"
                        fill="#d32e2a"
                      />
                    </g>
                  </svg>
                </div>
                <span>Gmail</span>
              </div>
            </div>
            <button onClick={signIn}>Sign in</button>
            <div className={styles.signUp__holder} onClick={loginTypeHandler}>
              <span>
                not a member yet? <b>Sign-Up</b>
              </span>
            </div>
          </form>
        </div>
      )}

      {/* Signup Form */}
      {!loggingIn && (
        <form className={styles.form__info__container}>
          <div className={styles.form__contentContainer}>
            <div className={styles.form__title__holder}>
              <span className={styles.signUp__title}>
                Create an account and discover the benefits
              </span>
              <p>Create an account for free shipping and more!</p>
            </div>
            <div className={styles.signUp__formInputs}>
              <div className={styles.input__}>
                {((formIsSubmitting && firstNameHasError) ||
                  enteredFirstNameIsValid === false) && (
                  <span>Please enter your name</span>
                )}
                <input
                  style={{
                    borderColor:
                      formIsSubmitting && firstNameHasError ? "#FF3636" : "",
                  }}
                  ref={inputName}
                  type="text"
                  placeholder="First Name"
                  onChange={firstNameChangeHandler}
                  onBlur={firstNameBlurHandler}
                />
              </div>
              <div className={styles.input__}>
                {((formIsSubmitting && lastNameHasError) ||
                  enteredLastNameIsValid === false) && (
                  <span>Please enter your last name</span>
                )}
                <input
                  style={{
                    borderColor:
                      formIsSubmitting && lastNameHasError ? "#FF3636" : "",
                  }}
                  ref={userLastName}
                  type="text"
                  placeholder="Last Name"
                  onChange={lastNameChangeHandler}
                  onBlur={LastNameBlurHandler}
                />
              </div>
              <div className={styles.input__}>
                {((formIsSubmitting && emailHasError) ||
                  enteredEmailIsValid === false) && (
                  <span>Please enter a valid email</span>
                )}
                <input
                  style={{
                    borderColor:
                      formIsSubmitting && emailHasError ? "#FF3636" : "",
                  }}
                  ref={email}
                  type="email"
                  placeholder="E-mail"
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
              </div>
              <div className={styles.input__}>
                {((formIsSubmitting && passwordHasError) ||
                  enteredPasswordIsValid === false) && (
                  <span>Password should have at least 6 characters</span>
                )}
                <input
                  style={{
                    borderColor:
                      formIsSubmitting && passwordHasError ? "#FF3636" : "",
                  }}
                  ref={password}
                  type="password"
                  placeholder="Password"
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
              </div>
            </div>
            <div className={styles.signUp__checkBox__holder}>
              <input
                ref={googleTerms}
                type="checkbox"
                name="stayLoggedIn"
                id="stayLoggedIn"
                onChange={googleTermsHandler}
              />
              <span
                style={{
                  color: formIsSubmitting && !googleAgree ? "#FF3636" : "",
                }}
              >
                I agree to the google Terms of Service and Privacy Policy
              </span>
            </div>
            <div className={styles.signUp__button__container}>
              <button onClick={register}>Sign up</button>
            </div>
            <div
              className={styles.currentMember__container}
              onClick={loginTypeHandler}
            >
              Already a member? <b>Sign-in</b>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserLogin;
