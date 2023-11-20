import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import styles from "./styles/Verified.module.css";
import { toast } from "react-toastify";

const Verified = () => {
  const [verified, setVerified] = useState(false);
  const { userId, token } = useParams();
  function Verify() {
    axios
      .get(`http://localhost:3001/users/verify/${userId}/${token}`)
      .then((res) => {
        toast.success("Email verified succesfully!");

        setVerified(true);
      })
      .catch((err) => {
        toast.error("An error ocurred while verifying your email!");
        console.log(err);
      });
  }
  useEffect(() => {
    Verify();
    // setTimeout(() => {

    // }, 2000);
  }, []);

  if (!verified) {
    return (
      <div className={styles.verifier}>
        <h1 className={styles.verifier_text}> Verifying...</h1>
        <div className={styles.b1}></div>
        <div className={styles.b2}></div>
        <div className={styles.b3}></div>
      </div>
    );
  }

  return <Navigate to="/login" />;
};

export default Verified;
