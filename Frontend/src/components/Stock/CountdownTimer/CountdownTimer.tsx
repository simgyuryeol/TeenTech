import React, { useEffect, useState } from "react";
import TimeDisplay from "./TimeDisplay";
import { calculateCountdown } from "./calculateCountdown";

interface CountdownTimerProps {
  targetHour: number;
  onCountdownZero: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetHour,
  onCountdownZero,
}) => {
  const [countdown, setCountdown] = useState(
    calculateCountdown(targetHour, onCountdownZero)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetHour, onCountdownZero));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetHour]);

  return (
    <div className="flex justify-center">
      <TimeDisplay value={countdown.hours} type="시간" isDanger={false} />
      <p>:</p>
      <TimeDisplay value={countdown.minutes} type="분" isDanger={false} />
      <p>:</p>
      <TimeDisplay value={countdown.seconds} type="초" isDanger={false} />
    </div>
  );
};

export default CountdownTimer;
