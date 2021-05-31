class From {
  constructor(obj, i) {
    const prefix = "from_";
    this.name = {
      class: prefix + "name",
      value: obj.name,
    };
    this.zip = {
      class: prefix + "zip",
      value: obj.zip,
    };
    this.address_1 = {
      class: prefix + "address_1",
      value: obj.address_1,
    };
    this.address_2 = {
      class: prefix + "address_2",
      value: obj.address_2,
    };
    this.tel = {
      class: prefix + "tel",
      value: obj.tel,
    };
  }
}
