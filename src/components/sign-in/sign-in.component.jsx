import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRoutes } from "../../store/routes/routes.reducer";
import { signInWithFirebase } from "../../utils/firebase/firebase.utils";
import { ROUTES } from "../../utils/routes/routes.utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./sign-in.styles.scss";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const changeRouteHandler = () => {
    dispatch(setRoutes(ROUTES.REGISTER));
  };

  const onSubmit = async (data) => {
    try {
      setAuthError("");
      await signInWithFirebase(data.email, data.password);
    } catch (error) {
      handleError(error);
    }
  };

  const signInAsGuest = async () => {
    try {
      setAuthError("");
      await signInWithFirebase(
        process.env.REACT_APP_GUEST_EMAIL,
        process.env.REACT_APP_GUEST_PASSWORD
      );
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.error("Authentication error:", error);
    switch (error.code) {
      case "auth/user-not-found":
        setAuthError("No user found with this email");
        break;
      case "auth/wrong-password":
        setAuthError("Incorrect password");
        break;
      case "auth/invalid-login-credentials":
        setAuthError("Invalid credentials");
        break;
      case "auth/too-many-requests":
        setAuthError("Too many failed login attempts. Please try again later");
        break;
      case "auth/network-request-failed":
        setAuthError("Network error. Please check your connection");
        break;
      default:
        setAuthError("An error occurred while signing in. Please try again");
    }
  };

  return (
    <form className="sign-in" onSubmit={handleSubmit(onSubmit)}>
      <div className="login-block">
        <h1>Sign-in</h1>
        {authError && <div className="auth-error-message">{authError}</div>}
        <input
          type="email"
          placeholder="Email"
          id="username"
          {...register("email")}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          id="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        <div className="sign-in-buttons">
          <button type="submit">Sign-In?</button>
          <button type="button" onClick={() => signInAsGuest()}>
            Guest
          </button>
        </div>
        <p onClick={changeRouteHandler}>REGISTER?</p>
      </div>
    </form>
  );
};

export default SignIn;
