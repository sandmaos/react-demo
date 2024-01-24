const fn1 = () => {
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
}

const fn2 = () => {
  function compose(s, dict) {
    let dp = Array(s.length + 1).fill(false);
    dp[s.length] = true;
    for (let i = s.length - 1; i >= 0; --i) {
      for (let item of dict) {
        if (i + item.length <= s.length && s.substring(i, i + item.length) === item && dp[i + item.length] === true)
          dp[i] = true;
      }
    }
    return dp[0];
  }
  const s = 'starbucks'
  const dict = ['star', 'bucks'];
  console.log(compose(s, dict));
}

const fn3 = () => {
  function rising(num, list) {
    let result = 0;
    for (let i = 1; i < list.length; ++i) {
      if (list[i] < list[i - 1]) {
        let diff = list[i - 1] - list[i] + 1;
        let count = Math.ceil(diff / num);
        list[i] += count * num;
        result += count;
      }
    }
    return result;
  }
  const num = 2;
  const list = [2, 7, 3, 5, 4];
  console.log(rising(num, list));
}


const fn4 = () => {
  const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  function maxSum(arr) {
    let maxSum = 0;
    let currSum = 0;
    for (let idx = 0; idx < arr.length; ++idx) {
      currSum+=arr[idx];
      if (currSum<=0) {
        currSum = 0;
      }
      maxSum = Math.max(maxSum, currSum)
    }
    return maxSum;
  }
  console.log(maxSum(arr));
}

fn4();
