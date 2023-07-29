// A message containing letters from A-Z can be encoded into numbers using the following mapping:

// 'A' -> "1"
// 'B' -> "2"
// ...
// 'Z' -> "26"
// To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

// "AAJF" with the grouping (1 1 10 6)
// "KJF" with the grouping (11 10 6)
// Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

// Given a string s containing only digits, return the number of ways to decode it.

// The test cases are generated so that the answer fits in a 32-bit integer.

// Example 1:

// Input: s = "12"
// Output: 2
// Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

// Example 2:

// Input: s = "226"
// Output: 3
// Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

// Example 3:

// Input: s = "06"
// Output: 0
// Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").

// Example 4:

// Input: s = "1201"
// Output: 1
// Explanation: "01" cannot be mapped to "A" so the only valid mapping is "ATA" (1 20 1)

// Example 5:

// Input: s = "2125"
// Output: 5
// Explanation: All mappings are valid "BABE" (2 1 2 5), "BLE" (2 12 5), "BAY" (2 1 25), "U B E" (21 2 5), "21 25" (U, Y)


// Constraints:

// 1 <= s.length <= 100
// s contains only digits and may contain leading zero(s).

const input = '2125';

const decode = s => {
  // 0 digits
  if (s.length === 0) return 0;
  // 1 digit
  if (s.length === 1)
  {
    if (s[0] === '0') return 0;
    return 1;
  }
  // 2 digits
  if (s.length === 2)
  {
    if (s[0] === '0') return 0;
    if (s[0] !== '1' && s[0] !== '2')
    {
      if (s[1] === '0')
      {
        return 0; // '0{0..9}' - no decoding
      }
      // s[0] = {3..9}, s[1] = {1..9}
      return 1; // '{3..9}{1..9}' -> '{3..9}_{1..9}'
    } else
    {
      // s[0] = {1..2}, s[1] = {0..9}
      if (s[1] === '7' || s[1] === '8' || s[1] === '9')
      {
        return 1; // '{1..2}{7..9}' -> '{1..2}_{7..9}'
      } else
      {
        // s[0] = {1..2}, s[1] = {0..6}
        return 2; // '{1..2}{1..6}' -> '{1..2}_{1..6}' or '{1..2}{1..6}'
      }
    }
  }

  // 3 digits or more

  let prev = '';
  let curr = '';
  let next = '';
  let options = 0;

  for (let i = 1; i < s.length - 1; i++)
  {
    if (i !== 1) options -= 1; // penalty for every non-first iteration
    prev = s[i - 1];
    curr = s[i];
    next = s[i + 1];

    if (prev == '0')
    {
      return 0; // '0{1..9}' - no decoding
    } else if (curr === '0')
    {
      if (next === '0') return 0; // to zeros one-by-one - no decoding
      if (prev !== '1' && prev !== '2') return 0; // 26 - max number; '{3..9}0{1..9}' isn't possible - no decoding
      // {1,2}0{1..9}
      options += 1; // '{1,2}0{1..9}' -> '{1,2}0_{1..9}'
      continue;
    } else if (next == '0')
    {
      // prev = {1..9}, curr = {1..9}, next = '0'
      if (curr !== '1' && curr !== '2') return 0; // '{1..9}{3..9}0' - no decoding
      // prev = {1..9}, curr = {1..2}, next = '0'
      options += 1; // '{1..9}{1..2}0' -> '{1..9}_{1..2}0'
      continue;
    }

    // prev = {1..9}, curr = {1..9}, next = {1..9}
    if (prev !== '1' && prev !== '2')
    {
      // prev = {3..9}, curr = {1..9}, next = {1..9}
      if (curr !== '1' && curr !== '2')
      {
        // prev = {3..9}, curr = {3..9}, next = {1..9}
        options += 1; // '{3..9}{3..9}{1..9}' -> '{3..9}_{3..9}_{1..9}'
        continue;
      } else
      {
        // prev = {3..9}, curr = {1,2}, next = {1..9}
        if (next === '7' || next === '8' || next === '9')
        {
          // prev = {3..9}, curr = {1,2}, next = {7,8,9}
          return 0; // '{3..9}{1,2}{7,8,9}' - no decoding
        } else
        {
          // prev = {3..9}, curr = {1,2}, next = {1..6}
          options += 1; // '{3..9}{1,2}{1..6}' -> '{3..9}_{1,2}{1..6}'
          continue;
        }
      }
    } else
    {
      // prev = {1,2}, curr = {1..9}, next = {1..9}
      if (curr === '7' || curr === '8' || curr === '9') return 0; // '{1,2}{7,8,9}{1..9}' - no decoding
      // prev = {1,2}, curr = {1..6}, next = {1..9}
      if (next === '7' || next === '8' || next === '9')
      {
        // prev = {1,2}, curr = {1..6}, next = {7..9}
        options += 2; // '{1,2}{1..6}{7..9}' -> '{1,2}{1..6}_{7..9}' or '{1,2}_{1..6}_{7..9}'
        continue;
      } else
      {
        // prev = {1,2}, curr = {1..6}, next = {1..6}
        if (curr !== '1' && curr !== '2')
        {
          // prev = {1,2}, curr = {3..6}, next = {1..6}
          options += 2; // '{1,2}{3..6}{1..6}' -> '{1,2}{3..6}_{1..6}' or '{1,2}_{3..6}_{1..6}'
          continue;
        } else
        {
          // prev = {1,2}, curr = {1,2}, next = {1..6}
          options += 3; // '{1,2}{1,2}{1..6}' -> '{1,2}{1,2}_{1..6}' or '{1,2}_{1,2}{1..6}' or '{1,2}_{1,2}_{1..6}'
          continue;
        }
      }
    }
  }

  return options;
}

/**
 * 21211
 * 2 1 2 1 1
 * 21 2 1 1
 * 2 12 1 1
 * 2 1 21 1
 * 21 21 1
 * 
 * 2 1 2 11
 * 21 2 11
 * 2 12 11
 */

// const decodeSmart = s => {
//   if (s.length === 0) return 0;
//   if (s.length === 1) return 1;

//   // s.length >= 2
//   let prev = '';
//   let curr = '';
//   let options = 0;

//   for (let i = 1; i < s.length; i++)
//   {
//     // if (i !== 1) options -= 1; // penatly for iteration

//     prev = s[i - 1];
//     curr = s[i];

//     console.log({ prev, curr, options });

//     if (prev == '0')
//     {
//       if (i === 1) return 0; // prev - the first number of the string
//       return 1;
//     }
//     if (curr == '0')
//     {
//       if (prev == '1' || prev == '2')
//       {
//         options += 1; // '{1,2}0' -> '{1,2}0'
//         continue;
//       }
//       return 0; // '{3,9}0'
//     } else if (prev == '1' || prev == '2')
//     {
//       // prev = {1..9}, curr = {1..9}
//       if (curr !== '7' && curr !== '8' && curr !== '9')
//       {
//         options += 2; // '{1,2}{1..6}' -> '{1,2}{1..6}' or '{1,2}_{1..6}'
//         continue;
//       } else
//       {
//         options += 1; // '{1,2}{7,8,9}' -> '{1,2}_{7,8,9}'
//         continue;
//       }
//     } else
//     {
//       // prev = {3..9}, curr = {1..9}
//       options += 1; // '{3..9}{1..9}' -> '{3..9}_{1..9}'
//       // continue;
//     }
//   }

//   return options;
// }


const testCases = [
  // {
  //   input: '12',
  //   expectedOutput: 2
  // },
  // {
  //   input: '226',
  //   expectedOutput: 3
  // },
  // {
  //   input: '06',
  //   expectedOutput: 0
  // },
  // {
  //   input: '1201',
  //   expectedOutput: 1
  // },
  // {
  //   input: '2125',
  //   expectedOutput: 5
  // },
  {
    input: '21211',
    expectedOutput: 8
  }
]

function main() {
  for (let testCase of testCases)
  {
    const result = decode(testCase.input)
    console.log(`[${result === testCase.expectedOutput}]input ${testCase.input} result ${result} expectedResult ${testCase.expectedOutput}`)
  }
}

main()
