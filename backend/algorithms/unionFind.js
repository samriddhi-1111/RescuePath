class UnionFind {
  constructor(elements) {
    this.parent = {};
    this.rank = {};

    elements.forEach(el => {
      this.parent[el] = el;
      this.rank[el] = 0;
    });
  }

  find(item) {
    if (this.parent[item] === item) {
      return item;
    }
    // Path compression
    this.parent[item] = this.find(this.parent[item]);
    return this.parent[item];
  }

  union(item1, item2) {
    const root1 = this.find(item1);
    const root2 = this.find(item2);

    if (root1 !== root2) {
      // Union by rank
      if (this.rank[root1] > this.rank[root2]) {
        this.parent[root2] = root1;
      } else if (this.rank[root1] < this.rank[root2]) {
        this.parent[root1] = root2;
      } else {
        this.parent[root2] = root1;
        this.rank[root1] += 1;
      }
      return true;
    }
    return false;
  }
}

module.exports = UnionFind;
