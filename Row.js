class Row {
  constructor(obj, i) {
    const prefix = "row_";
    this.index = i;
    this.label = {
      class: prefix + i + "_label",
      value: obj.label,
    };
    this.quantity = {
      class: prefix + i + "_quantity",
      value: obj.quantity,
    };
    this.price = {
      class: prefix + i + "_price",
      value: obj.price,
    };
    this.total = {
      class: prefix + i + "_total",
      value: this.price.value * this.quantity.value,
    };
  }
  getTd(className, value, d) {
    const td = d.createElement("td");
    if (!value) alert(`Error: Got empty value at ${className}`);
    td.classList.add(className);
    td.append(value.toLocaleString());
    return td;
  }
  embed(d, node) {
    const label = this.getTd(this.label.class, this.label.value, d);
    const quantity = this.getTd(this.quantity.class, this.quantity.value, d);
    const price = this.getTd(this.price.class, this.price.value, d);
    const total = this.getTd(this.total.class, this.total.value, d);
    const tr = d.createElement("tr");
    tr.append(label, quantity, price, total);
    node.append(tr);
  }
}
