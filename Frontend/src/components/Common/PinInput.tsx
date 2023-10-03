import React, { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface PinInputProps {
  method?: string;
  url?: string;
  headers?: { [key: string]: string };
  data?: { [key: string]: any };
  onclose: () => void;
}

const PinInput: React.FC<PinInputProps> = ({
  method,
  url,
  headers,
  data,
  onclose,
}) => {
  const pinLength = 4;
  const [pin, setPin] = useState<string[]>(Array(pinLength).fill(""));
  const [errorMessage, setErrorMessage] = useState("");

  const resetValue = (i: number) => {
    setPin((prevPin) =>
      prevPin.map((_, index) => (index >= i ? "" : prevPin[index]))
    );
  };

  const stepForward = (i: number) => {
    setErrorMessage("");
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

  const validatePin = async (code: string) => {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method,
        url,
        data: { password: code, ...data },
        headers,
      };
      const response = await axios(axiosConfig);
      console.log("RESPONSE", response.data);
      if (response.status === 200) {
        onclose();
      } else {
        setErrorMessage("비밀번호를 확인해주세요.");
        setPin(Array(pinLength).fill(""));

        const firstInputField = document.getElementById("codefield_0");
        if (firstInputField) {
          firstInputField.focus();
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("비밀번호 확인에 실패했습니다.");
      setPin(Array(pinLength).fill(""));

      const firstInputField = document.getElementById("codefield_0");
      if (firstInputField) {
        firstInputField.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="px-2 pb-4 text-2xl text-center">비밀번호를 입력하세요.</div>
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
      {errorMessage && <div className="text-red-600 text-lg">{errorMessage}</div>}
    </div>
  );
};

export default PinInput;
