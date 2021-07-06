class Page {
  constructor(obj, from, to, bank) {
    console.log(obj);
    this.title = {
      class: "title",
      value: obj.title,
    };
    this.date = {
      class: "date",
      value: obj.date,
    };
    this.sales_tax_rate = {
      class: "sales_tax_rate",
      value: obj.sales_tax_rate,
    };
    this.message = {
      class: "message",
      value: obj.message,
    };
    this.from = new From(from);
    this.to = new To(to);
    this.bank = new Bank(bank);
    this.rows = obj.rows.map((r, i) => new Row(r, i));
    this.subtotal = {
      class: "subtotal",
      value: this.rows.reduce((sum, r) => {
        return sum + r.total.value;
      }, 0),
    };
    this.sales_tax_amount = {
      class: "sales_tax_amount",
      value: Math.floor(
        this.subtotal.value * (this.sales_tax_rate.value / 100)
      ),
    };
    this.withholding_tax_rate = {
      class: "withholding_tax_rate",
      value: this.subtotal.value < 1000000 ? 10.21 : 20.42,
    };
    this.withholding_tax_amount = {
      class: "withholding_tax_amount",
      value: Math.floor(
        this.subtotal.value * (this.withholding_tax_rate.value / 100)
      ),
    };
    this.total = {
      class: "total",
      value:
        this.subtotal.value +
        this.sales_tax_amount.value -
        this.withholding_tax_amount.value,
    };
    this.amount = {
      class: "amount",
      value: this.total.value,
    };
    if (this.sales_tax_rate.value != 10)
      alert("警告: 消費税率が10%以外に設定されています");
  }
  embed(instance, d) {
    for (const [name, v] of Object.entries(instance)) {
      if (v.class) {
        const node = d.querySelector("." + v.class);
        // console.log(name + ": " + v.value);
        if (node) {
          node.innerHTML = v.value.toLocaleString();
        }
      }
    }
  }
  embed_all(d) {
    this.embed(this, d);
    this.embed(this.from, d);
    this.embed(this.to, d);
    this.embed(this.bank, d);
    const node = d.querySelector(".rows");
    this.rows.forEach((r) => {
      r.embed(d, node);
    });
  }
}
