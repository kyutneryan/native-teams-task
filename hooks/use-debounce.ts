import { useEffect, useState } from "react";

export default (text: string, delay: number) => {
  const [debounceText, setDebounceText] = useState<string>(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceText(text);
    }, delay);

    return () => clearTimeout(handler);
  }, [delay, text]);

  return debounceText;
};
