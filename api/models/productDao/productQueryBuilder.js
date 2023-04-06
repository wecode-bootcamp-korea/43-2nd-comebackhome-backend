class productQueryBuilder {
  constructor(offsetSetting, limitSetting) {
    this.offset = offsetSetting;
    this.limit = limitSetting;
  }

  offsetBuilder() {
    if (this.offset) {
      return `OFFSET ${this.offset}`;
    }
  }

  limitBuilder() {
    if (this.limit) {
      return `LIMIT ${this.limit}`;
    }
  }

  build() {
    const filterQuery = [this.limitBuilder(), this.offsetBuilder()];
    return filterQuery.join(" ");
  }
}

module.exports = { productQueryBuilder };
