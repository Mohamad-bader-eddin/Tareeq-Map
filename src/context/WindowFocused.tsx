import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const WindowFocusedContext = createContext({} as createContextType);

export const WindowFocusedProvider = ({
  children,
}: WindowFocusedProviderProps) => {
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  return (
    <WindowFocusedContext.Provider
      value={{ isWindowFocused, setIsWindowFocused }}
    >
      {children}
    </WindowFocusedContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWindowFocused = () => {
  return useContext(WindowFocusedContext);
};

type createContextType = {
  isWindowFocused: boolean;
  setIsWindowFocused: Dispatch<SetStateAction<boolean>>;
};

type WindowFocusedProviderProps = {
  children: React.ReactNode;
};
