import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/sallad"); // Go to SalladPage
  };
  return (
    <>
      <div className="start-page">
        <Typography variant="h3">Välkommen till Leafy Delights!</Typography>
        <Typography variant="subtitle1">
          Här kan du beställa och betala någon av våra populära sallader samt
          dryck utan att behöva stå i kö till kassan.
        </Typography>
        <div className="buttons">
          <button
            className="start-order-button"
            onClick={() => handleNextClick()}
          >
            Klicka här för att påbörja din order
          </button>
          {/* <div className="hand-icon">👉</div> */}
          {/* <div className="hand-icon">👆</div> */}
        </div>
      </div>
    </>
  );
};

export default StartPage;
