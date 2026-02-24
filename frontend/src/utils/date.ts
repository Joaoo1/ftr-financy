export const generatePeriodOptions = () => {
  const options = [];
  const now = new Date();

  for (let i = 0; i <= 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const value = `${month}-${year}`;

    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const label = `${monthNames[date.getMonth()]} / ${year}`;

    options.push({ value, label });
  }

  return options;
};

export const getDefaultPeriod = () => {
  const currentMonth = new Date();
  return `${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${currentMonth.getFullYear()}`;
};
