"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = new Date().getFullYear();
const noop = () => () => {};

/** Año actual: el HTML estático trae el año de compilación y el navegador lo actualiza. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <>{year}</>;
}
