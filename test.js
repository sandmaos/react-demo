function compose(s, dict) {
  function dfs(currStr) {
    if (currStr === s) {
      return true;
    }
    for (let item of dict) {
      if (s.startsWith(currStr + item)) {
        if (dfs(currStr + item))
          return true;
      }
    }
    return false;
  }
  return dfs('');
}
const s = 'starbucks'
const dict = ['star', 'bucks'];
console.log(compose(s, dict));


function rising(num, list) {
  let result=0;
  for (let i = 1; i < list.length; ++i) {
    if (list[i] < list[i - 1]) {
      let diff = list[i - 1] - list[i] + 1;
      let count=Math.ceil(diff/num);
      list[i]+=count*num;
      result+=count;
    }
  }
  return result;
}
const num = 2;
const list = [2, 7, 3, 5, 4];
console.log(rising(num, list));