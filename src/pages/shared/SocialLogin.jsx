import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const SocialLogin = ({ setError }) => {
  const { signInWithGoogle, googleLoading } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Clear any previous errors
    if (setError) {
      setError("");
    }

    signInWithGoogle()
      .then((result) => {
        console.log("Google sign-in successful:", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);

        // Set the appropriate error message if setError function is provided
        if (setError) {
          if (error.code === "auth/popup-closed-by-user") {
            setError("Sign-in with Google was cancelled.");
          } else if (error.code === "auth/network-request-failed") {
            setError("Network error. Please check your connection.");
          } else {
            setError(
              "An error occurred during Google sign-in. Please try again."
            );
          }
        }
      });
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <button
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className={`relative flex items-center justify-center w-full px-4 py-3 text-sm font-medium transition-all duration-300 border rounded-md overflow-hidden group ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        } transform hover:-translate-y-0.5 hover:shadow-md ${
          isDarkMode ? "hover:shadow-blue-500/20" : "hover:shadow-blue-500/30"
        }`}
      >
        {/* Animated shine effect on hover */}
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20px"
          height="20px"
          className="mr-2 transition-transform duration-300 group-hover:scale-110"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        <span className="relative z-10">
          {googleLoading ? "Signing in..." : "Sign in with Google"}
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
