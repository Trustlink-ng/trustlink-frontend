import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import LoadingPage from "../../../components/LoadingPage";
import { useNavigate } from "react-router-dom";

interface FlowContextType {
  isValidFlow: boolean;
  setFlowValid: (isValid: boolean) => void;
}

const FlowContext = createContext<FlowContextType | null>(null);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isValidFlow, setIsValidFlow] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();



    useEffect(() => {
      if (!isValidFlow) {
        setLoading(false); 
      }

    }, [isValidFlow, navigate]);

   if (loading) {
     return (
       <LoadingPage/>
     ); 
   }

  return (
    <FlowContext.Provider value={{ isValidFlow, setFlowValid: setIsValidFlow }}>
      {children}
    </FlowContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFlow = (): FlowContextType => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
};
