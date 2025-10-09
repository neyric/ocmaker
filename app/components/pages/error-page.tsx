import { isRouteErrorResponse, useNavigate } from "react-router";

export interface ErrorPageProps {
  error: unknown;
}

export function ErrorPage({ error }: ErrorPageProps) {
  const navigate = useNavigate();
  let message = "Something went wrong!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = is404 ? "404" : `${error.status}`;
    details = is404
      ? "This page was not found."
      : error.statusText || "Something went wrong.";
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  console.error("error", message);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-muted-foreground/50">
            {is404 ? "404" : "500"}
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            {is404 ? "Page Not Found" : "Internal Server Error"}
          </h2>
        </div>

        {/* Error Details */}
        <p className="text-muted-foreground leading-relaxed">{details}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Go Back
          </button>
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="btn btn-outline"
          >
            Go to Home
          </button>
        </div>

        {/* Stack Trace (Development Only) */}
        {stack && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors font-medium mb-2">
              Show Error Details
            </summary>
            <pre className="mt-2 p-4 bg-muted rounded-md text-xs overflow-x-auto border max-h-64 overflow-y-auto">
              <code className="text-muted-foreground font-mono">{stack}</code>
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
