import { useEffect } from "react";

export const UseTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | BookVerse`;

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "BookVerse";
    };
  }, [title]);

  return null;
};
