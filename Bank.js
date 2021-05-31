class Bank {
  constructor(obj, i) {
    const prefix = "bank_";
    this.name = {
      class: prefix + "name",
      value: obj.name,
    };
    this.code = {
      class: prefix + "code",
      value: obj.code,
    };
    this.branch_name = {
      class: prefix + "branch_name",
      value: obj.branch.name,
    };
    this.branch_code = {
      class: prefix + "branch_code",
      value: obj.branch.code,
    };
    this.account_name = {
      class: prefix + "account_name",
      value: obj.account.name,
    };
    this.account_number = {
      class: prefix + "account_number",
      value: obj.account.number,
    };
  }
}
