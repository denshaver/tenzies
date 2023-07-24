import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const createTenzies = (number) => {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push({
      number: Math.ceil(Math.random() * 6),
      id: i + 1,
      isLocked: false,
    });
  }
  return result;
};

const Tenzies = () => {
  const [tenziesNumber, setTenziesNumber] = useState(10);
  const [tenzies, setTenzies] = useState(createTenzies(tenziesNumber));
  const [win, setWin] = useState(false);

  // Functions
  const lockTenz = (tenzId) => {
    if (win) {
      return;
    }
    const newTenz = tenzies.map((tenz) => {
      if (tenz.id === tenzId) {
        return {
          ...tenz,
          isLocked: !tenz.isLocked,
        };
      } else {
        return tenz;
      }
    });
    setTenzies(newTenz);
  };

  const rollTenzies = () => {
    const newTenzies = tenzies.map((tenz) => {
      if (tenz.isLocked) {
        return tenz;
      } else {
        return {
          ...tenz,
          number: Math.ceil(Math.random() * 6),
        };
      }
    });
    setTenzies(newTenzies);
  };

  const newGame = () => {
    setWin(false);
    setTenzies(createTenzies(tenziesNumber));
  };

  const changeMode = () => {
    if (tenziesNumber === 10) {
      setTenziesNumber(20);
      setTenzies(createTenzies(20));
    } else {
      setTenziesNumber(10);
      setTenzies(createTenzies(10));
    }
  };

  console.log(tenziesNumber);

  useEffect(() => {
    const allNumbersSame = tenzies.every(
      (tenz) => tenz.number === tenzies[0].number
    );
    const allNumbersLocked = tenzies.every((tenz) => tenz.isLocked === true);

    if (allNumbersSame && allNumbersLocked) {
      setWin(true);
    }
  }, [tenzies]);

  return (
    <>
      {win && <Confetti />}
      <div className="tenzies">
        {tenzies.map((tenz) => (
          <div
            key={tenz.id}
            className={tenz.isLocked ? "tenz locked" : "tenz"}
            onClick={() => lockTenz(tenz.id)}
          >
            {tenz.number}
          </div>
        ))}
      </div>
      <button onClick={win ? newGame : rollTenzies}>
        {win ? "New Game" : "Roll"}
      </button>
      <button onClick={changeMode}>Change mode</button>
    </>
  );
};

export default Tenzies;
