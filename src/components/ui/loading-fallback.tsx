import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingFallbackProps {
  variant?: "spinner" | "dots" | "skeleton" | "pulse" | "bars";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function LoadingFallback({
  variant = "spinner",
  size = "md",
  text = "Loading...",
  className,
}: LoadingFallbackProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const spinnerSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  if (variant === "spinner") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 space-y-4",
          className
        )}
      >
        <Loader2
          className={cn("animate-spin text-primary", spinnerSizes[size])}
        />
        <p
          className={cn(
            "text-muted-foreground animate-pulse",
            sizeClasses[size]
          )}
        >
          {text}
        </p>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 space-y-4",
          className
        )}
      >
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
        <p className={cn("text-muted-foreground", sizeClasses[size])}>{text}</p>
      </div>
    );
  }

  if (variant === "skeleton") {
    return (
      <div className={cn("p-6 space-y-4", className)}>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-3/6 animate-pulse"></div>
        </div>
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 space-y-4",
          className
        )}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-primary/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-16 h-16 bg-primary/40 rounded-full animate-pulse"></div>
          <Sparkles className="absolute inset-0 w-8 h-8 m-4 text-primary animate-pulse" />
        </div>
        <p className={cn("text-muted-foreground", sizeClasses[size])}>{text}</p>
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 space-y-4",
          className
        )}
      >
        <div className="flex space-x-1">
          <div className="w-1 h-8 bg-primary rounded animate-pulse [animation-delay:0s] [animation-duration:1.2s]"></div>
          <div className="w-1 h-8 bg-primary rounded animate-pulse [animation-delay:0.1s] [animation-duration:1.2s]"></div>
          <div className="w-1 h-8 bg-primary rounded animate-pulse [animation-delay:0.2s] [animation-duration:1.2s]"></div>
          <div className="w-1 h-8 bg-primary rounded animate-pulse [animation-delay:0.3s] [animation-duration:1.2s]"></div>
          <div className="w-1 h-8 bg-primary rounded animate-pulse [animation-delay:0.4s] [animation-duration:1.2s]"></div>
        </div>
        <p className={cn("text-muted-foreground", sizeClasses[size])}>{text}</p>
      </div>
    );
  }

  return null;
}
