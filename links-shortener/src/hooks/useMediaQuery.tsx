import { useEffect, useState } from "react";

type MediaQueryBreakpoints = {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
};

const breakpoints: MediaQueryBreakpoints = {
  small: "(min-width: 640px)",
  medium: "(min-width: 768px)",
  large: "(min-width: 1024px)",
  xlarge: "(min-width: 1280px)",
};

const useMediaQuery = (size: keyof MediaQueryBreakpoints) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches);
    };
    const mediaQuery = breakpoints[size];
    const result = matchMedia(mediaQuery);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [size]);

  return value;
};

export default useMediaQuery;
