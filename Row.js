class Row {
  constructor(obj, i) {
    const prefix = "row_";
    this.index = i;
    this.label = {
      class: prefix + i + "_label",
      value: obj.label,
      align: "left",
      width: "3/6",
    };
    this.quantity = {
      class: prefix + i + "_quantity",
      value: obj.quantity,
      align: "center",
      width: "1/6",
    };
    this.price = {
      class: prefix + i + "_price",
      value: obj.price,
      align: "right",
      width: "1/6",
    };
    this.total = {
      class: prefix + i + "_total",
      value: this.price.value * this.quantity.value,
      align: "right",
      width: "1/6",
    };
  }
  getTd(property, d) {
    if (!property.value)
      alert(`Error: Got empty value at ${property.className}`);
    const td = d.createElement("td");
    td.classList.add(
      property.className,
      "border",
      `text-${property.align}`,
      `w-${property.width}`,
      "p-1"
    );
    td.append(property.value.toLocaleString());
    return td;
  }
  embed(d, node) {
    const label = this.getTd(this.label, d);
    const quantity = this.getTd(this.quantity, d);
    const price = this.getTd(this.price, d);
    const total = this.getTd(this.total, d);
    const tr = d.createElement("tr");
    tr.append(label, quantity, price, total);
    node.append(tr);
  }
}
