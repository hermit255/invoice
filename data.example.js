const pages = [
  {
    title: "yyyy年x月度",
    date: "2021/1/1",
    sales_tax_rate: 10,
    message: "test message",
    rows: [
      {
        label: "請求科目1",
        quantity: 1,
        price: 10000,
      },
      {
        label: "請求科目2",
        quantity: 1,
        price: 100000,
      },
    ],
  },
];

const page = pages[pages.length - 1];
/* to set specific page */
// const page = pages.find((p) => p.date == "2021/2/1");
