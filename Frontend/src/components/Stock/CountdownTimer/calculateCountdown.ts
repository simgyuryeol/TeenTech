const calculateCountdown = (targetHour: number, onCountdownZero: () => void) => {
  const now = new Date();
  const targetDate = new Date();

  if (now.getHours() >= targetHour) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  targetDate.setHours(targetHour, 0, 0, 0);

  const countDown = targetDate.getTime() - now.getTime();
  const hours = Math.floor(countDown / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  if (countDown <= 0) {
    onCountdownZero();
  }

  return { hours, minutes, seconds };
};

export { calculateCountdown };
