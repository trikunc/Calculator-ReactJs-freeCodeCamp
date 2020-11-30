import React, { useState } from "react";
import "./styles.css";

// const BACKGROUND_COLOR = "#06121B";
// const BUTTON_PRIMARY_COLOR = "#0C3540";
// const BUTTON_SECONDARY_COLOR = "#3F4F5B";
// const BUTTON_EQUALS_COLOR = "#F27030";
const GREY_FONT = "#848A8F";

const App = () => {
  const [history, setHistory] = useState([]);
  const [primaryDisplay, setPrimaryDisplay] = useState("0");
  const [secondaryDisplay, setSecondaryDisplay] = useState("");
  const [memory, setMemory] = useState("0");
  const [mode, setMode] = useState(false);
  const [num, setNum] = useState(true);
  const [modeDisplay, setModeDisplay] = useState(false);
  const [percent, setPercent] = useState(false);
  const [dot, setDot] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);

  const onClickHandler = (value) => {
    let newValue;
    if (value === 0 && primaryDisplay === "0") {
      return;
    } else if (value === "." && primaryDisplay === "0") {
      setPrimaryDisplay(`0.`);
      setDot(true);
    } else if (value !== 0 && primaryDisplay === "0") {
      setPrimaryDisplay(value);
      setModeDisplay(false);
    } else if (
      value === "×" ||
      value === "÷" ||
      value === "+" ||
      value === "-" ||
      value === "="
    ) {
      const result = secondaryDisplay[secondaryDisplay.length - 1];
      if (
        !num &&
        (result === "×" || result === "÷" || result === "+" || result === "-")
      ) {
        if (value !== "-") {
          if (value === "+") {
            setPrimaryDisplay("+");
          }
          let newSecondaryDisplay = secondaryDisplay.split("");
          newSecondaryDisplay.pop();
          newSecondaryDisplay = newSecondaryDisplay.join("");
          setSecondaryDisplay(`${newSecondaryDisplay}${value}`);
        } else if (value === "-") {
          setPrimaryDisplay("-");
          setModeDisplay(false);
        }
      } else {
        arithmatic(value);
      }
      setNum(false);
    } else if (value === ".") {
      console.log("dot");
      dot
        ? setPrimaryDisplay(primaryDisplay)
        : setPrimaryDisplay(`${primaryDisplay}${value}`);
      setDot(true);
      console.log("dot:", dot);
    } else if (
      value !== "×" ||
      value !== "÷" ||
      value !== "+" ||
      value !== "-" ||
      value !== "="
    ) {
      newValue = modeDisplay ? `${value}` : `${primaryDisplay}${value}`;
      setPrimaryDisplay(newValue);
      setModeDisplay(false);
      setNum(true);
    }
  };

  const arithmatic = (value) => {
    setDot(false);
    mode
      ? setSecondaryDisplay(`${secondaryDisplay}${primaryDisplay}${value}`)
      : setSecondaryDisplay(`${primaryDisplay}${value}`);
    setMemory(primaryDisplay);
    if (value !== "=") {
      mode ? getResult(value) : setMode(true);
    } else if (value === "=") {
      getResult(value);
      setMode(false);
    }
    setModeDisplay(true);
  };

  const clearScreen = () => {
    setSecondaryDisplay("");
    setPrimaryDisplay("0");
    setMemory("0");
    setMode(false);
    setDot(false);
  };

  const changeMod = () => {
    let result = "";
    const isNegMod = primaryDisplay[0];
    if (isNegMod === "-") {
      result = primaryDisplay.replace("-", "");
    } else {
      result = primaryDisplay === "0" ? primaryDisplay : `-${primaryDisplay}`;
    }
    setPrimaryDisplay(result);
  };

  const percentMod = () => {
    if (percent) {
      setPrimaryDisplay(parseFloat(primaryDisplay) * 100);
      setPercent(false);
    } else if (!percent) {
      setPrimaryDisplay(parseFloat(primaryDisplay) / 100);
      setPercent(true);
    }
  };

  const backClick = () => {
    if (primaryDisplay.length > 1) {
      let newPrimaryDisplay = primaryDisplay.split("");
      newPrimaryDisplay.pop();
      newPrimaryDisplay = newPrimaryDisplay.join("");
      setPrimaryDisplay(newPrimaryDisplay);
    } else if (primaryDisplay.toString().length === 1) {
      setPrimaryDisplay("0");
    }
  };

  const getResult = (value) => {
    setDot(false);
    if (
      mode &&
      (value === "×" ||
        value === "÷" ||
        value === "+" ||
        value === "-" ||
        value === "=")
    ) {
      let popIndex = secondaryDisplay.length;
      let popMod = secondaryDisplay[popIndex - 1];
      let mem = 0;
      let dis = 0;

      if (popMod === "×") {
        mem = parseFloat(memory) * parseFloat(primaryDisplay);
        dis = memory * parseFloat(primaryDisplay);
      }
      if (popMod === "÷") {
        mem = parseFloat(memory) / parseFloat(primaryDisplay);
        dis = parseFloat(memory) / parseFloat(primaryDisplay);
      } else if (popMod === "+") {
        mem = parseFloat(memory) + parseFloat(primaryDisplay);
        dis = parseFloat(memory) + parseFloat(primaryDisplay);
      } else if (popMod === "-") {
        mem = parseFloat(memory) - parseFloat(primaryDisplay);
        dis = parseFloat(memory) - parseFloat(primaryDisplay);
      }

      setMemory(mem);
      setPrimaryDisplay(dis);
    }
  };

  const toogleModal = () => {
    setHistoryModal(!historyModal);
  };

  const PrimaryButton = (value, id, functionCall = null) => {
    return (
      <div className="calculatorCell">
        <button
          className="primaryButton"
          id={id}
          onClick={() =>
            functionCall ? functionCall(value) : onClickHandler(value)
          }
        >
          <p className="primaryButtonText">{value}</p>
        </button>
      </div>
    );
  };

  const SecondaryButton = (value, id) => {
    return (
      <div className="calculatorCell">
        <button
          className="secondaryButton"
          id={id}
          onClick={() => onClickHandler(value)}
        >
          <p className="secondaryButtonText">{value}</p>
        </button>
      </div>
    );
  };

  const SecondaryButtonDouble = (value, id) => {
    return (
      <div className="calculatorCellDouble">
        <button
          className="secondaryButton"
          id={id}
          style={{ width: "99%" }}
          onClick={() => onClickHandler(value)}
        >
          <p className="secondaryButtonText">{value}</p>
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="display">
        {/* <div className="displayContainer"> */}
        <div
          style={{ width: "100%", flexDirection: "row-reverse", marginTop: 30 }}
        >
          <p style={{ fontSize: 20, color: GREY_FONT }}>{secondaryDisplay}</p>
        </div>
        <div
          style={{
            flexDirection: "row-reverse",
            width: "100%",
            marginTop: 25,
            marginBottom: 30
          }}
        >
          <p id="display" style={{ fontSize: 28, color: "white" }}>
            {primaryDisplay}
          </p>
        </div>

        {/* </div> */}
      </div>
      <div className="bodyCal">
        <div className="symbol">
          <button onClick={() => toogleModal()}>
            <p className="symbolButton Hist">
              {historyModal ? "KEYPAD" : "HISTORY"}
            </p>
          </button>
          <button onClick={() => backClick()}>
            <p className="symbolButton Back">
              <i className="fas fa-backspace fa-2x" />
            </p>
          </button>
        </div>
        <div className="topRow">
          {PrimaryButton("C", "clear", clearScreen)}
          {PrimaryButton("+/-", "chengeMod", changeMod)}
          {PrimaryButton("%", "percentage", percentMod)}
          {PrimaryButton("÷", "divide")}
        </div>
        <div className="botRow">
          {SecondaryButton(7, "seven")}
          {SecondaryButton(8, "eight")}
          {SecondaryButton(9, "nine")}
          {PrimaryButton("×", "multiply")}
        </div>

        <div className="botRow">
          {SecondaryButton(4, "four")}
          {SecondaryButton(5, "five")}
          {SecondaryButton(6, "six")}
          {PrimaryButton("-", "subtract")}
        </div>
        <div className="botRow">
          {SecondaryButton(1, "one")}
          {SecondaryButton(2, "two")}
          {SecondaryButton(3, "three")}
          {PrimaryButton("+", "add")}
        </div>
        <div className="botRow">
          {SecondaryButtonDouble(0, "zero")}
          {SecondaryButton(".", "decimal")}
          {PrimaryButton("=", "equals")}
          {/* {SubmitButton()} */}
        </div>
      </div>
    </div>
  );
};

export default App;
