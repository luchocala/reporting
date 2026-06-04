import { Link } from "react-router-dom";

export default function Error403() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <p className="text-[120px] font-bold leading-none tracking-tight text-foreground">403</p>
      <h1 className="text-xl font-semibold mt-2">Access Forbidden</h1>
      <p className="text-sm text-muted-foreground mt-1 text-center max-w-xs">
        You don't have necessary permission to view this resource.
      </p>
      <div className="flex items-center gap-3 mt-6">
        <button onClick={() => window.history.back()} className="px-4 py-2 border border-border rounded-md text-sm hover:bg-muted transition-colors">Go Back</button>
        <Link to="/" className="px-4 py-2 bg-foreground text-background rounded-md text-sm hover:opacity-90 transition-opacity">Back to Home</Link>
      </div>
    </div>
  );
}