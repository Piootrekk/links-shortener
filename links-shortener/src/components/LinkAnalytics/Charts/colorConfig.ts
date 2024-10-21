const configColorsChart = {
  colorChart1: "hsl(var(--chart-1))",
  colorChart2: "hsl(var(--chart-2))",
  colorChart3: "hsl(var(--chart-3))",
  colorChart4: "hsl(var(--chart-4))",
  colorChart5: "hsl(var(--chart-5))",
};

const getRandomChartColor = () => {
  const colors = Object.values(configColorsChart);
  return colors[Math.floor(Math.random() * colors.length)];
};

export { configColorsChart, getRandomChartColor };
