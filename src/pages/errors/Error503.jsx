import { Link } from "react-router-dom";

export default function Error503() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <p className="text-[120px] font-bold leading-none tracking-tight text-foreground">503</p>
      <h1 className="text-xl font-semibold mt-2">Website is under maintenance!</h1>
      <p className="text-sm text-muted-foreground mt-1 text-center max-w-xs">
        The site is not available at the moment. We'll be back online shortly.
      </p>
      <div className="flex items-center gap-2 mt-6">
        <Link to="/" className="px-4 py-2 border border-border rounded-md text-sm hover:bg-muted transition-colors">Learn more</Link>
      </div>
    </div>
  );
}