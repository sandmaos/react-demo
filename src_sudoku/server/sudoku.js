const solveSudoku = (board) => {
  const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const rows = new Array(9).fill().map(() => new Set(options));
  const cols = new Array(9).fill().map(() => new Set(options));
  const blocks = new Array(9).fill().map(() => new Set(options));

  const getBlockIndex = (i, j) => { // 根据坐标，获取所在的小框的索引
    return (i / 3 | 0) * 3 + j / 3 | 0;  // |0 是向下取整
  };

  for (let i = 0; i < 9; i++) {    // 根据现有的已填的数字，更新set们
    for (let j = 0; j < 9; j++) {
      if (board[i][j] != ".") {
        rows[i].delete(board[i][j]); // 当前行出现过这个数字，这个数字就不能在这一行出现，删除该选项
        cols[j].delete(board[i][j]);
        blocks[getBlockIndex(i, j)].delete(board[i][j]);
      }
    }
  }

  const fill = (i, j) => {
    if (j == 9) {     // 列越界，就填下一行
      i++;
      j = 0;
      if (i == 9) return true;  // 都填完了 返回true
    }
    if (board[i][j] != ".") return fill(i, j + 1); // 如果不是空格，递归填下一格

    const blockIndex = getBlockIndex(i, j); // 获取所在小框的索引

    for (let num = 1; num <= 9; num++) {    // 枚举出所有选择：1-9
      const s = String(num);
      // 当前选择必须在三个set中都存在，如果有一个不存在，就说明发生了冲突，跳过该选择
      if (!rows[i].has(s) || !cols[j].has(s) || !blocks[blockIndex].has(s)) continue;

      board[i][j] = s;    // 作出选择
      rows[i].delete(s);  // 更新set们，删掉这个可填选项
      cols[j].delete(s);
      blocks[blockIndex].delete(s);

      if (fill(i, j + 1)) return true; // 如果基于当前选择，填下一个，最后可解出数独，直接返回真
      // 基于当前选择，填下一个，怎么填都不行，回溯，恢复为空格
      board[i][j] = ".";
      rows[i].add(s);     // set们，将之前删掉的当前数字，加回来
      cols[j].add(s);
      blocks[blockIndex].add(s);
    }
    return false;
  };
  fill(0, 0);
};

const checkValid = (board) => {
  const rows = new Array(9).fill().map(() => new Set());
  const cols = new Array(9).fill().map(() => new Set());
  const blocks = new Array(9).fill().map(() => new Set());
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (board[i][j] !== '.') {
        const num = board[i][j];
        if (!rows[i].has(num) && !cols[j].has(num) && !blocks[((i / 3 | 0) * 3 + j / 3 | 0)].has(num)) {
          rows[i].add(num);
          cols[j].add(num);
          blocks[((i / 3 | 0) * 3 + j / 3 | 0)].add(num);
        }
        else
          return false;
      }
      else continue;
    }
  }
  return true
}

module.exports = { solveSudoku, checkValid }

