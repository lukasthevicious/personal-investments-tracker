import { StyledHomePage } from "./styled";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import MyButton from "../layout/MyButton";

const HomePage: React.FC = () => {
  return (
    <StyledHomePage>
      <div className="home-container">
        <div>
          <h1>Welcome to Crypto Tracker ☄️</h1>
          <div className="buttons-container">
            <MyButton
              text="My holdings"
              purple
              component={Link}
              to="/holdings"
              variant="contained"
            />
            <MyButton
              text="Transaction history"
              purple
              component={Link}
              to="/transactions"
              variant="contained"
            />
          </div>
        </div>
        <div className="home-dashboard"></div>
      </div>
    </StyledHomePage>
  );
};
export default HomePage;
