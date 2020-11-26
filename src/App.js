import React from "react";
import "./styles.css";

const BACKGROUND_COLOR = "#06121B";
const BUTTON_PRIMARY_COLOR = "#0C3540";
const BUTTON_SECONDARY_COLOR = "#3F4F5B";
const BUTTON_EQUALS_COLOR = "#F27030";
const GREY_FONT = "#848A8F";

const App = () => {
  const SubmitButton = () => {
    return (
      <div className="calculatorCell">
        <div className="primaryButton">
          <p className="primaryButtonText">=</p>
        </div>
      </div>
    );
  };

  const PrimaryButton = (value) => {
    return (
      <div className="calculatorCell">
        <button className="primaryButton">
          <p className="primaryButtonText">{value}</p>
        </button>
      </div>
    );
  };

  const SecondaryButton = (value) => {
    return (
      <div className="calculatorCell">
        <button className="secondaryButton">
          <p className="secondaryButtonText">{value}</p>
        </button>
      </div>
    );
  };

  const SecondaryButtonDouble = (value) => {
    return (
      <div className="calculatorCellDouble">
        <div className="secondaryButton" style={{ width: "99%" }}>
          <p className="secondaryButtonText">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div id="display" className="display">
        {/* <div className="displayContainer"> */}
        <div
          style={{ width: "100%", flexDirection: "row-reverse", marginTop: 30 }}
        >
          <p style={{ fontSize: 20, color: GREY_FONT }}>Test secondary</p>
        </div>
        <div
          style={{
            flexDirection: "row-reverse",
            width: "100%",
            marginTop: 25,
            marginBottom: 30
          }}
        >
          <p style={{ fontSize: 28, color: "white" }}>Test primary</p>
        </div>

        {/* </div> */}
      </div>
      <div className="bodyCal">
        <div className="symbol">
          <button>
            <p className="symbolButton Hist">HISTORY</p>
          </button>
          <button>
            <p className="symbolButton Back">
              <i className="fas fa-backspace fa-2x" />
            </p>
          </button>
        </div>
        <div className="topRow">
          {PrimaryButton("C")}
          {PrimaryButton("+/-")}
          {PrimaryButton("%")}
          {PrimaryButton("÷")}
        </div>
        <div className="botRow">
          {SecondaryButton(7)}
          {SecondaryButton(8)}
          {SecondaryButton(9)}
          {PrimaryButton("x")}
        </div>

        <div className="botRow">
          {SecondaryButton(4)}
          {SecondaryButton(5)}
          {SecondaryButton(6)}
          {PrimaryButton("-")}
        </div>
        <div className="botRow">
          {SecondaryButton(1)}
          {SecondaryButton(2)}
          {SecondaryButton(3)}
          {PrimaryButton("+")}
        </div>
        <div className="botRow">
          {SecondaryButtonDouble(0)}
          {SecondaryButton(".")}
          {SubmitButton()}
        </div>
      </div>
    </div>
  );
};

export default App;
