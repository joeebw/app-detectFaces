import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setRoutes } from "../../store/routes/routes.reducer";
import { useDispatch } from "react-redux";
import { createUserWithFirebase } from "../../utils/firebase/firebase.utils";
import { ROUTES } from "../../utils/routes/routes.utils";
import "./register.styles.scss";

// English validation schema with Zod
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = ({ loadUser }) => {
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleChangeRoutes = () => {
    dispatch(setRoutes(ROUTES.SIGN_IN));
  };

  const onSubmit = async (data) => {
    try {
      setAuthError("");
      await createUserWithFirebase(data.email, data.password, data.name);
    } catch (error) {
      console.error("Registration error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setAuthError("Email already in use");
          break;
        case "auth/invalid-email":
          setAuthError("Invalid email format");
          break;
        case "auth/weak-password":
          setAuthError("Password is too weak");
          break;
        case "auth/network-request-failed":
          setAuthError("Network error. Please check your connection");
          break;
        default:
          setAuthError(
            "An error occurred during registration. Please try again"
          );
      }
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit(onSubmit)}>
      <div className="login-block">
        <h1>Register</h1>
        {authError && <div className="auth-error-message">{authError}</div>}
        <input type="text" placeholder="Name" id="name" {...register("name")} />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
        <input
          type="email"
          placeholder="Email"
          id="email"
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
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}
        <button type="submit">Register</button>
        <p onClick={handleChangeRoutes}>SIGN IN?</p>
      </div>
    </form>
  );
};

export default Register;
