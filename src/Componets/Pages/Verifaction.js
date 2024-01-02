import React, { useContext, useState } from "react";
import classes from './Verfication.module.css'
import Input from "../UI/Input";
import AuthContext from "../Store/AuthContext";
import { useNavigate } from "react-router-dom";

const Verification = () => {
    const authCtx = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const switchHandler = () => {
        // Toggle between verification and non-verification mode
        setEmail(""); // Clear the email input when switching
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-xCnBCx20ES2d4gAANKdQF_REddQ--dI', {
                method: 'POST',
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: authCtx.token,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming the server sends a success message on successful verification
                if(data.email===email)
                {
                console.log("Email verification successful");

                history('/');
                } // Navigate to the home page
            } else {
                throw new Error("Verification failed");
            }
        } catch (error) {
            console.error("Verification failed:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={classes.main}>
            <form onSubmit={submitHandler} className={classes.form}>
                {loading && <p>Verifying...</p>}
                {!loading && (
                    <>
                        <div className={classes.int}>
                            <Input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className={classes.input}
                                placeholder="Enter your email"
                            />
                        </div>
                        <button type="submit" className={classes.btns}>
                            Verify
                        </button>
                    </>
                )}
            </form>
            <button onClick={switchHandler} className={classes.verifybtn}>
                Switch to {loading ? "Verification" : "Non-Verification"} Mode
            </button>
        </div>
    );
}

export default Verification;
