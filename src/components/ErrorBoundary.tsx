import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      try {
        const parsedError = JSON.parse(this.state.error?.message || "");
        if (parsedError.error && parsedError.error.includes("insufficient permissions")) {
          errorMessage = "You do not have permission to perform this action. Please ensure you are logged in with the correct account.";
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-industrial-dark flex items-center justify-center p-6">
          <div className="glass-card p-12 max-w-xl text-center border-industrial-accent/30">
            <h2 className="text-3xl font-bold mb-6 text-industrial-accent">System Error</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-industrial-accent text-industrial-dark font-bold uppercase tracking-widest hover:bg-white transition-all"
            >
              Restart Interface
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

