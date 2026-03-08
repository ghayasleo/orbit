import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

/**
 * Hook to warm the user about unsaved changes before leaving the page.
 * Uses react-router-dom `useBlocker` for soft navigation
 * and `window.beforeunload` for hard reloads/tab closing.
 */
export function useUnsavedChanges(hasUnsavedChanges: boolean) {
  // Hard reload / close tab handling
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        // Standard message for most modern browsers
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // React Router soft navigation handling
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
  );

  return { blocker };
}
