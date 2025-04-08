import Lottie from "lottie-react";
import { useState } from "react";
import registerLottieData from "../../assets/lottie/register.json";

const Register = () => {
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Reset error
    setError("");

    // Email Validation
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailValidation.test(email)) {
      setError("Please enter a valid email address.");
      return; // Add this to stop further validation
    }

    // Password Validation
    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordValidation.test(password)) {
      setError(
        "Password must be at least 6 characters long, contain at least one uppercase letter and one number."
      );
      return;
    }

    // handle register logic here
    console.log("Registering with email:", email, "and password:", password);
  };


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96 lg:w-1/3">
          <Lottie animationData={registerLottieData}> </Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-4xl font-bold text-center">
            Register now!
          </h1>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
