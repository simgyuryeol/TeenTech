import React, { useState, useEffect, useRef } from "react";
import styles from "./LottoChange.module.css";

import { CreateTypes } from "canvas-confetti";
import ReactCanvasConfetti from "./ReactCanvasConfetti";

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
  const [isWinning,setIsWinning] = useState<boolean>(false);

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
        console.log("finalRandomIndex");
        console.log(finalRandomIndex);
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
        handlerFire();
        setIsWinning(true);
        alert("당첨!");
      } else {
        alert("아쉽다.");
      }
    }, 2000 * 3 + 500);
  };

  /*여기부터*/
  
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);
  const animationInstance = useRef<CreateTypes | null>(null);

  const makeShot = (particleRatio: number, opts: object) => {
    animationInstance.current &&
      animationInstance.current({
        ...opts,
        origin: { y: 0.8 },
        particleCount: Math.floor(200 * particleRatio),
      });
  };

  // 이 부분에서 사용하고 싶은 설정을 하면 된다.
  const fire = () => {
    console.log("fire함수 안" + isAnimationEnabled)
      if (!isAnimationEnabled) {
    return;
  }
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
      startVelocity:25 ,
       decay : .92 ,
       scalar :1.2
     });
  
     makeShot(.1 ,{
       spread :120 ,
       startVelocity :45 
     });
  }

  const handlerFire = () => {
    console.log("handlerFire" + isAnimationEnabled);
     if (!isAnimationEnabled) {
       setIsAnimationEnabled(true);

     }
    console.log("handlerFire 2번째" + isAnimationEnabled);
            requestAnimationFrame(fire);
     fire();
   };
  
  const getInstance = (instance : CreateTypes | null) => { 
     animationInstance.current= instance;
   };

  return (
    <div className="pt-16">
      <div>
        <div>
          {displayNumbers.map((num, index) => (
            <div key={index}>{num}</div>
          ))}
        </div>
        {selectedNumbers.length === 3 ? (
          <button onClick={startLottery} disabled={isLotteryRunning}>
            응모하기
          </button>
        ) : (
          <div>번호골라</div>
        )}

        {winningNumbers[2] !== null && (
          <button
            onClick={() => {
              setWinningNumbers([null, null, null]);
              setDisplayNumbers(["?", "?", "?"]);
              setIsLotteryRunning(false);

              intervalsRef.current.forEach((intervalId) =>
                clearInterval(intervalId)
              );
              intervalsRef.current = [];
            }}
          >
            다시 시작
          </button>
        )}

        <div>숫자가 뭘까</div>
      </div>
      <div>선택한 숫자</div>
      {selectedNumbers.length === 0 ? (
        <div>x</div>
      ) : (
        <div className="flex justify-center items-center">
          {selectedNumbers.map((number) => (
            <div
              key={number}
              className={`${styles.selectedcircle} m-1 rounded-full`}
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </div>
          ))}
        </div>
      )}

      <div>
        {availableNumbers.map((number) => (
          <div
            key={number}
            className="m-1 rounded-full inline-block text-center"
            onClick={() => handleNumberClick(number)}
            style={{
              backgroundColor: selectedNumbers.includes(number)
                ? "lightblue"
                : "white",
              border: "1px solid #ccc",
              width: "30px",
              height: "30px",
            }}
          >
            {number}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => resetClick()}>초기화</button>
        <button onClick={() => rendomClick()}>rendom</button>
      </div>
      <div>
        {/* <div onClick={handlerFire}>
         클릭하시오
       </div> */}
        <ReactCanvasConfetti
        refConfetti={getInstance}
          className="canvas"/>
      </div>
      
    </div>
  );
};

export default LottoChange;
