import React, { useState } from "react";

const PinInput: React.FC = () => {
  const pinLength = 4;
  const [pin, setPin] = useState<string[]>(Array(pinLength).fill(""));

  const resetValue = (i: number) => {
    setPin((prevPin) =>
      prevPin.map((_, index) => (index >= i ? "" : prevPin[index]))
    );
  };

  const stepForward = (i: number) => {
    if (pin[i] && i !== pinLength - 1) {
      document.getElementById(`codefield_${i + 1}`)?.focus();
      resetValue(i + 1);
    }
    checkPin();
  };

  const stepBack = (i: number) => {
    if (pin[i - 1] && i !== 0) {
      document.getElementById(`codefield_${i - 1}`)?.focus();
      resetValue(i - 1);
    }
  };

  const checkPin = () => {
    const code = pin.join("");
    if (code.length === pinLength) {
      validatePin(code);
    }
  };

  const validatePin = (code: string) => {
    // 서버에서 실제로 PIN 코드를 확인하는 로직을 구현해야 합니다.
    if (code === "1234") {
      alert("성공");
    } else {
      alert("땡");
      setPin(Array(pinLength).fill(""));

      const firstInputField = document.getElementById("codefield_0");
      if (firstInputField) {
        firstInputField.focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="px-2 pb-4 text-lg">비밀번호를 입력하세요</div>
        <div className="flex">
          {Array.from({ length: pinLength }, (_, i) => (
            <input
              key={`codefield_${i}`}
              autoFocus={i === 0}
              id={`codefield_${i}`}
              className="h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl"
              value={pin[i]}
              maxLength={1}
              max="9"
              min="0"
              inputMode="decimal"
              type="password"
              onChange={(e) => {
                const updatedPin = [...pin];
                updatedPin[i] = e.target.value;
                setPin(updatedPin);
              }}
              onKeyUp={() => stepForward(i)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  stepBack(i);
                }
              }}
              onFocus={() => resetValue(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinInput;
