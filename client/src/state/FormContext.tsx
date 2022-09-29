import { createContext, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

interface AppContextInterface {
  setSelectedCrypto: Dispatch<SetStateAction<string | undefined>>;
  selectedCrypto: string | undefined;
  transactionType: string | undefined;
  setTransactionType: Dispatch<SetStateAction<string | undefined>>;
  formShowed: boolean;
  setFormShowed: Dispatch<SetStateAction<boolean>>;
}

const FormContext = createContext<AppContextInterface | null>(null);

export const FormContextProvider: React.FC<{
  children: any;
}> = ({ children }) => {
  const [formShowed, setFormShowed] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<string>();
  const [transactionType, setTransactionType] = useState<string>();

  return (
    <FormContext.Provider
      value={{
        selectedCrypto,
        setSelectedCrypto,
        transactionType,
        setTransactionType,
        setFormShowed,
        formShowed,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
export default FormContext;
