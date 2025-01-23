import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of the context
interface CommentToggleContextProps {
  isCommentOpen: boolean;
  toggleComment: () => void;
  closeComment: () => void;
}

// Create the context with a default value of undefined
const CommentToggleContext = createContext<
  CommentToggleContextProps | undefined
>(undefined);

// Create the provider props type
interface CommentToggleProviderProps {
  children: ReactNode;
}

// Provider component
export const CommentToggleProvider: React.FC<CommentToggleProviderProps> = ({
  children,
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const toggleComment = () => setIsCommentOpen((prev) => !prev);
  const closeComment = () => setIsCommentOpen(false);

  return (
    <CommentToggleContext.Provider
      value={{ isCommentOpen, toggleComment, closeComment }}
    >
      {children}
    </CommentToggleContext.Provider>
  );
};

export const useCommentToggle = () => {
  const context = useContext(CommentToggleContext);
  if (!context) {
    throw new Error(
      "useCommentToggle must be used within a CommentToggleProvider"
    );
  }
  return context;
};
