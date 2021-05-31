const ym = "2021/5";
const page = new Page(
  pages.find((p) => p.ym == ym),
  from,
  to,
  bank
);
page.embed_all(document);
