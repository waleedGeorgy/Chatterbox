import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessagesSquare,
  UserRound,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signup } = useAuthStore();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] grid lg:grid-cols-2 font-inter">
      <div className="flex flex-col justify-center items-center p-5 sm:p-12">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-1 group w-fit mx-auto">
              <div
                className="size-14 rounded-xl bg-primary/20 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors animate-wiggle"
              >
                <MessagesSquare className="size-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2 font-roboto">
                Create an account
              </h1>
              <p className="text-base-content/60">Get started for free!</p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-4 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <UserRound className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  autoFocus
                  className={`input input-primary w-full pl-10 placeholder:opacity-60 rounded-lg`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type="email"
                  className={`input input-primary w-full pl-10 placeholder:opacity-60 rounded-lg`}
                  placeholder="john-doe@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 z-10 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-primary w-full pl-10 placeholder:opacity-60 rounded-lg`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="z-10 size-5 text-base-content/40" />
                  ) : (
                    <Eye className="z-10 size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="btn btn-block sm:btn-wide btn-accent rounded-lg mt-2"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Creating
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-base-content/80">
              Already have an account?{" "}
              <Link
                viewTransition
                to="/login"
                className="link link-hover link-secondary underline-offset-2"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community!"
        subtitle="Connect with family and friends, and and stay in touch with everyone."
      />
    </div>
  );
};

export default SignupPage;
