import React, { useState, useEffect, useRef } from "react";
import styles from "./LottoChange.module.css";

import { CreateTypes } from "canvas-confetti";
import ReactCanvasConfetti from "./ReactCanvasConfetti";

import { FaRedo, FaRandom } from "react-icons/fa"; // 추가된 아이콘 패키지

const LottoChange: React.FC = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  // 1~6까지 숫자배열
  const availableNumbers: number[] = Array.from(
    { length: 6 },
    (_, index) => index + 1
  );

  const resetClick = () => {
    setSelectedNumbers([]);
  };

  const rendomClick = () => {
    setSelectedNumbers([]);

    const rendomNumbers: number[] = [];

    while (rendomNumbers.length < 3) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      if (!rendomNumbers.includes(randomNum)) {
        rendomNumbers.push(randomNum);
      }
    }
    setSelectedNumbers(rendomNumbers);
  };

  const handleNumberClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      // 이미 선택된 숫자인 경우 선택 해제
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 3) {
      // 아직 3개 이하의 숫자를 선택한 경우에만 추가
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const [winningNumbers, setWinningNumbers] = useState<Array<number | null>>([
    null,
    null,
    null,
  ]);
  const [displayNumbers, setDisplayNumbers] = useState<Array<number | "?">>([
    "?",
    "?",
    "?",
  ]);
  const [isLotteryRunning, setIsLotteryRunning] = useState<boolean>(false);
  const [isWinning, setIsWinning] = useState<boolean>(false);

  // Interval ID들을 저장하기 위한 ref
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      // 컴포넌트가 unmount될 때 interval clear
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  const startLottery = () => {
    setIsLotteryRunning(true);
    let numbers: number[] = Array.from({ length: 6 }, (_, i) => i + 1);
    let winningNums: number[] = [];

    for (let i = 0; i < 3; i++) {
      // 각 공마다 새로운 interval 시작
      intervalsRef.current[i] = setInterval(() => {
        let randomIndex: number;
        randomIndex = Math.floor(Math.random() * numbers.length);
        setDisplayNumbers((prevState) => {
          const newState = [...prevState];
          newState[i] = numbers[randomIndex];
          return newState;
        });
      }, 50);

      setTimeout(() => {
        clearInterval(intervalsRef.current[i]); // 해당 공의 interval 종료

        let finalRandomIndex: number = 1;
        //finalRandomIndex = Math.floor(Math.random() * numbers.length);
        if (i == 0) {
          finalRandomIndex = 2;
        }
        if (i == 1) {
          finalRandomIndex = 3;
        }
        if (i == 2) {
          finalRandomIndex = 4;
        }
        console.log("finalRandomIndex " + finalRandomIndex);
        winningNums.push(numbers[finalRandomIndex]);

        //numbers.splice(finalRandomIndex, 1);

        setWinningNumbers([...winningNums]);

        setDisplayNumbers((prevState) => {
          const newState = [...prevState];
          newState[i] = winningNums[i];
          return newState;
        });
      }, (i + 1) * 2000);
    }

    setTimeout(() => {
      let same = 0;

      console.log("당첨번호");
      for (let num of winningNums) {
        console.log(num);
      }

      console.log("내꺼");
      for (let num of selectedNumbers) {
        console.log(num);
      }

      for (let num of winningNums) {
        if (selectedNumbers.includes(num)) {
          same++;
        }
      }

      if (same === selectedNumbers.length) {
        // 번호뽑는중에는 응모하기 버튼 못눌리게
        setIsLotteryRunning(false);
        setIsWinning(true);
        handlerFire();
        alert("당첨!");
      } else {
        setIsLotteryRunning(false);
        setIsWinning(false);
        alert("아쉽다.");
      }
    }, 2000 * 3 + 150);
  };

  /*여기부터*/

  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const animationInstance = useRef<CreateTypes | null>(null);

  const makeShot = (particleRatio: number, opts: object) => {
    animationInstance.current &&
      animationInstance.current({
        ...opts,
        origin: { y: 0.8 },
        particleCount: Math.floor(200 * particleRatio),
      });
  };

  // 이 부분에서 사용하고 싶은 설정을 하면 됨.
  const fire = () => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 20,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handlerFire = () => {
    fire();
  };

  const getInstance = (instance: CreateTypes | null) => {
    animationInstance.current = instance;
  };

  return (
    <div className="pt-16  font-sans">
      <div>
        <h1 className="text-center text-4xl font-bold py-5 text-purple-700">
          당첨번호
        </h1>
        <div className="flex justify-center">
          {displayNumbers.map((num, index) => (
            <div
              key={index}
              className="mx-4 text-xl font-bold text-purple-800 rounded-full bg-white w-10 h-10 flex items-center justify-center"
            >
              {num}
            </div>
          ))}
        </div>
        <p className="text-center text-lg m-3">원하는 번호 3개 골라주세요</p>
      </div>

      <div className="h-32 bg-blue-500 rounded-lg my-5">
        <div className="h-full flex items-center justify-center">
          {selectedNumbers.length === 0 ? (
            <div>선택한 숫자가 없어요!</div>
          ) : (
            selectedNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick(number)}
                className={`${styles.selectedcircle} m-3 rounded-full border-none bg-white text-blue-dark`}
                style={{ width: "50px", height: "50px" }}
              >
                {number}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-around">
        {availableNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className="rounded-full"
            style={{
              backgroundColor: selectedNumbers.includes(number)
                ? "lightblue"
                : "white",
              border: "none",
              width: "50px",
              height: "50px",
            }}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="flex space-x4 justify-evenly my-5 ">
        <button
          className="bg-transparent hover:bg-blue-dark p2 border border-blue-dark hover:text-white rounded transition ease-in-out duration200"
          onClick={() => resetClick()}
        >
          초기화
        </button>

        <button
          className="bg-transparent hover:bg-blue-dark p2 border border-blue-dark hover:text-white rounded transition ease-in-out duration200"
          onClick={() => rendomClick()}
        >
          rendom
        </button>
      </div>
      {selectedNumbers.length === 3 && (
        <button
          className={`font-semibold py2 px4 rounded ${
            isLotteryRunning ? "opacity50 cursor-notallowed" : ""
          }`}
          disabled={isLotteryRunning}
          onClick={startLottery}
        >
          응모하기
        </button>
      )}
      <div>
        <ReactCanvasConfetti refConfetti={getInstance} className="canvas" />
      </div>
    </div>
  );
};

export default LottoChange;