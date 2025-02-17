import React, { ReactNode } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right";
  delay?: number;
  className?: string;
  threshold?: number;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  threshold = 0.1,
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold });

  const baseStyles = "transition-all duration-1000 opacity-0";
  const visibleStyles = "opacity-100 transform-none";

  const getInitialTransform = () => {
    switch (animation) {
      case "fade-up":
        return "translate-y-10";
      case "fade-down":
        return "-translate-y-10";
      case "fade-left":
        return "translate-x-10";
      case "fade-right":
        return "-translate-x-10";
      default:
        return "translate-y-10";
    }
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`
        ${baseStyles}
        ${isVisible ? visibleStyles : getInitialTransform()}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
