import { createContext, useContext, useRef } from "react";

const ScrollContext = createContext({});

const scrollOptions = {
  behavior: "smooth",
  block: "start",
  inline: "nearest",
};

const ScrollProvider = ({ children }) => {
  const state = useRef({});

  const addRef = (name, ref, options = {}) => {
    state.current = {
      ...state.current,
      [name]: { ref, options: { ...scrollOptions, ...options } },
    };
  };

  const scrollTo = (name) => {
    if (name in state.current) state.current[name].ref.current.scrollIntoView(state.current[name].options);
    else console.error(`${name} is invalid`, `${Object.keys(state.current)} are available`);
  };

  return <ScrollContext.Provider value={{ scrollTo, addRef }}>{children}</ScrollContext.Provider>;
};

const useScroll = () => useContext(ScrollContext);

export { useScroll, ScrollProvider };
