const randomTitles = ["Potensi Ekonomi", "Pinjaman", "Kredit UMKM", "Investasi", "Pendapatan", "Pengeluaran"];

export const generateRandomTitle = () => {
  const index = Math.floor(Math.random() * randomTitles.length);
  return randomTitles[index];
};

export const generateRandomData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month) => ({
    name: month,
    value: Math.floor(Math.random() * 10000),
  }));
};

export const generateRandomChartData = () => {
  const title = generateRandomTitle();
  const value = `Rp. ${(Math.random() * 100000).toFixed(2)}`;
  const improvement = `${(Math.random() * 100).toFixed(1)}% from last month`;
  return {
    title,
    value,
    improvement,
    data: generateRandomData(),
  };
};
