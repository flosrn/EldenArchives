"use client";

import { logger } from "@/lib/logger";
import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  children?: ReactNode;
  fallback?: ReactNode | ((error: string) => ReactNode);
  title?: string;
  description?: string;
};

type State = {
  hasError: boolean;
  error: string;
};

/**
 * ErrorBoundary is a component that catches errors in its children and renders a fallback UI.
 * It's useful for handling errors in the UI and preventing the entire app from crashing.
 * It use class component because it uses componentDidCatch lifecycle method.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: "",
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    logger.error("ErrorBoundary: ", error.message);
    return { hasError: true, error: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      if (typeof this.props.fallback === "function")
        return this.props.fallback(this.state.error);

      return this.props.fallback;
    }

    const {
      title = "Something went wrong",
      description = "Please try again later",
    } = this.props;

    return (
      <Card variant="error">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            Retry
          </Button>
        </CardFooter>
      </Card>
    );
  }
}
