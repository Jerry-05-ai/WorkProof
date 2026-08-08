import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({ title = 'Something went wrong', message, onRetry }) => {
  const handleHome = () => { window.location.href = '/'; };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-16 h-16 bg-red-50 border border-danger/15 rounded-2xl flex items-center justify-center mb-5">
        <AlertTriangle className="h-7 w-7 text-danger" />
      </div>
      <h3 className="text-base font-semibold text-text mb-1.5">{title}</h3>
      {message && <p className="text-muted text-sm max-w-sm mb-6 leading-relaxed">{message}</p>}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        )}
        <Button variant="outline" onClick={handleHome}>
          <Home className="h-4 w-4" />
          Go home
        </Button>
      </div>
    </motion.div>
  );
};

// Error Boundary
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <ErrorState
            title="Something went wrong"
            message={this.state.error?.message || 'An unexpected error occurred. Try reloading the page.'}
            onRetry={() => this.setState({ hasError: false, error: null })}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
