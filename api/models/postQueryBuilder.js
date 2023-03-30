class postQueryBuilder {
  constructor(offsetSetting, limitSetting, sorting = "", roomSizeType = "") {
    this.limit = limitSetting;
    this.offset = offsetSetting;
    this.sorting = sorting;
    this.roomSizeType = roomSizeType;
  }

  roomSizeTypeBulider() {
    if (this.roomSizeType) {
      return `WHERE r.name IN ("${this.roomSizeType}")`;
    }
  }

  orderByBulider() {
    const orderBy = {
      new: "ORDER BY p.id ASC",
      recommend: "ORDER BY p.room_size_type_id DESC",
      id: "ORDER BY p.id ASC",
    };
    if (this.sorting) {
      return orderBy[this.sorting];
    }
    return orderBy["id"];
  }

  limitBuilder() {
    if (this.limit) {
      return `LIMIT ${this.limit}`;
    }
  }

  offsetBuilder() {
    if (this.offset) {
      return `OFFSET ${this.offset}`;
    }
  }

  build() {
    const filterQuery = [
      this.roomSizeTypeBulider(),
      this.orderByBulider(),
      this.limitBuilder(),
      this.offsetBuilder(),
    ];
    return filterQuery.join(" ");
  }
}

module.exports = { postQueryBuilder };
