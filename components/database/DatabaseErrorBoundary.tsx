'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class DatabaseErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
    errorInfo: undefined
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Database error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  private handleReset = () => {
    this.setState({ 
      hasError: false,
      error: undefined,
      errorInfo: undefined
    })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="rounded-lg p-4 bg-red-500/10 border border-red-500/50">
          <div className="flex items-center gap-2 text-red-500">
            <span>❌</span>
            <h2 className="font-semibold">Database Error</h2>
          </div>
          
          <p className="mt-2 text-red-500/90 text-sm">
            {this.state.error?.message}
          </p>

          {this.state.errorInfo && (
            <pre className="mt-4 p-3 bg-red-500/5 rounded text-xs text-red-500/80 overflow-auto">
              {this.state.errorInfo.componentStack}
            </pre>
          )}

          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            onClick={this.handleReset}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
