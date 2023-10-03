import { useEffect, useState } from 'react';

function useStockStatistics(stockList) {
  const [totalValue, setTotalValue] = useState(0);
  const [totalGain, setTotalGain] = useState(0);
  const [averageROR, setAverageROR] = useState(0);

  useEffect(() => {
    let totalValue = 0;
    let totalGain = 0;
    let totalROR = 0;

    for (const stock of stockList) {
      totalValue += stock.value;
      totalGain += stock.gain;
      totalROR += stock.ror * stock.investment;
    }

    const averageROR = totalROR / totalValue;

    setTotalValue(totalValue);
    setTotalGain(totalGain);
    setAverageROR(averageROR);
  }, [stockList]);

  return {
    totalValue,
    totalGain,
    averageROR,
  };
}

export default useStockStatistics;
