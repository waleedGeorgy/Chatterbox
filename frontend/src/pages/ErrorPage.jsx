import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      switch (error.status) {
        case 404:
          return "Page not found";
        case 401:
          return "Unauthorized access";
        case 500:
          return "Server error";
        default:
          return error.statusText;
      }
    }
    return error.message || "Unknown error occurred";
  };

  return (
    <div className="min-h-screen p-5 flex flex-col items-center justify-center gap-3 font-inter text-center">
      <h1 className="text-2xl sm:text-5xl font-roboto">
        Oops! Something went wrong
      </h1>
      <p className="text-base sm:text-xl font-bold">
        {error.status ? error.status : ""} — {getErrorMessage()}
      </p>
      <span className="text-sm sm:text-base opacity-75">
        Please try refreshing the page, or{" "}
        <Link to="/" className="link link-primary">
          go back home
        </Link>
      </span>
    </div>
  );
}
