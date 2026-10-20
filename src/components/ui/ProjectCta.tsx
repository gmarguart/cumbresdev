"use client";

import type { ReactNode } from "react";
import type { ProjectType } from "@/config/content";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./Button";

export const SELECT_PROJECT_EVENT = "cumbres:select-project";

/** Enlace a una sección que, opcionalmente, preselecciona el tipo de proyecto en el formulario. */
export function ProjectCta({
  href = "#contacto",
  projectType,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href?: string;
  projectType?: ProjectType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={buttonClasses(variant, size, className)}
      onClick={() => {
        if (projectType) {
          window.dispatchEvent(new CustomEvent<ProjectType>(SELECT_PROJECT_EVENT, { detail: projectType }));
        }
      }}
    >
      {children}
    </a>
  );
}
