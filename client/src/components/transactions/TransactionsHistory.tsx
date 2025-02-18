import { StyledTransactionHistory } from "./styled";
import TransactionsTable from "./TransactionsTable";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { RootState } from "../..";
import MyButton from "../layout/MyButton";
import { useContext, useEffect, FC } from "react";
import { useHistory } from "react-router-dom";
import FormContext from "../../state/FormContext";
import DashboardContext from "../../state/DashboardContext";
import { getTransactions } from "../../state/actions/transactions";
import { lsUserId } from "../../utils/ls-userId";
import LoadingSpinner from "../layout/LoadingSpinner";

const TransactionsHistory: FC = () => {
  const transactions = useAppSelector((state: RootState) => state.transactions);

  const loadingState = useAppSelector(
    (state: RootState) => state.errorAndLoading
  );
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { setFormShown, setSelectedCrypto, setTransactionType } =
    useContext(FormContext);
  const { getDashboardData } = useContext(DashboardContext);
  const userId = lsUserId();

  useEffect(() => {
    dispatch(getTransactions(userId));
    getDashboardData();
  }, [dispatch]);

  const onClickButton = () => {
    history.push("/holdings");
    setFormShown(true);
    setSelectedCrypto("Bitcoin");
    setTransactionType("buy");
  };

  return (
    <StyledTransactionHistory>
      {loadingState["loading"] ? (
        <LoadingSpinner />
      ) : transactions.length > 0 ? (
        <div className="transactions-container">
          <TransactionsTable />
        </div>
      ) : (
        <div className="no-transaction-found">
          <h1>No transactions found. Please add one.</h1>
          <MyButton
            text="Add transaction"
            onClick={onClickButton}
            variant="contained"
            purple
          />
        </div>
      )}
    </StyledTransactionHistory>
  );
};
export default TransactionsHistory;
