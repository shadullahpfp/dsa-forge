import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const modules = [
  {
    order: 0,
    title: 'Programming Foundations',
    description: 'Build a strong foundation in programming concepts, problem-solving approaches, and code organization. This module prepares you for the DSA journey ahead.',
    slug: 'programming-foundations',
    icon: 'Code2',
    color: 'blue',
  },
  {
    order: 1,
    title: 'Arrays & Strings',
    description: 'Master the fundamental data structures. Learn array manipulation, string processing, two-pointer techniques, and sliding window patterns.',
    slug: 'arrays-strings',
    icon: 'Layers',
    color: 'green',
  },
  {
    order: 2,
    title: 'Recursion & Backtracking',
    description: 'Understand the art of breaking problems down. Master recursive thinking, call stacks, and backtracking algorithms for complex problems.',
    slug: 'recursion-backtracking',
    icon: 'GitBranch',
    color: 'purple',
  },
  {
    order: 3,
    title: 'Searching & Sorting',
    description: 'Learn efficient searching and sorting algorithms. Binary search, merge sort, quicksort, and their applications in real-world scenarios.',
    slug: 'searching-sorting',
    icon: 'Search',
    color: 'orange',
  },
  {
    order: 4,
    title: 'Linked List',
    description: 'Deep dive into linked data structures. Single, double, and circular linked lists with practical applications and common interview patterns.',
    slug: 'linked-list',
    icon: 'Link2',
    color: 'cyan',
  },
  {
    order: 5,
    title: 'Stack & Queue',
    description: 'Master linear data structures with specific access patterns. Stack for LIFO operations, queue for FIFO, and their applications.',
    slug: 'stack-queue',
    icon: 'Stack',
    color: 'pink',
  },
  {
    order: 6,
    title: 'Trees',
    description: 'Explore hierarchical data structures. Binary trees, tree traversals, and tree-based problem solving techniques.',
    slug: 'trees',
    icon: 'ListTree',
    color: 'emerald',
  },
  {
    order: 7,
    title: 'Binary Search Tree',
    description: 'Understand ordered tree structures. BST operations, balancing concepts, and efficient searching in sorted data.',
    slug: 'bst',
    icon: 'SquareStack',
    color: 'teal',
  },
  {
    order: 8,
    title: 'Heap & Priority Queue',
    description: 'Learn about priority-based data access. Min/max heaps, heap sort, and priority queue applications.',
    slug: 'heap-priority-queue',
    icon: 'PieChart',
    color: 'amber',
  },
  {
    order: 9,
    title: 'Graphs',
    description: 'Master graph theory and algorithms. BFS, DFS, shortest paths, minimum spanning trees, and graph-based problem solving.',
    slug: 'graphs',
    icon: 'Network',
    color: 'indigo',
  },
  {
    order: 10,
    title: 'Dynamic Programming',
    description: 'The art of optimization. Memoization, tabulation, and solving complex problems by breaking them into simpler subproblems.',
    slug: 'dynamic-programming',
    icon: 'Database',
    color: 'red',
  },
  {
    order: 11,
    title: 'Greedy Algorithms',
    description: 'Learn when local optimization leads to global solutions. Greedy strategies, proofs, and common greedy patterns.',
    slug: 'greedy',
    icon: 'Zap',
    color: 'yellow',
  },
  {
    order: 12,
    title: 'Advanced Topics',
    description: 'Advanced data structures and algorithms. Tries, segment trees, disjoint set union, and specialized problem-solving techniques.',
    slug: 'advanced',
    icon: 'Trophy',
    color: 'gold',
  },
]

const problems = [
  // Module 0: Programming Foundations
  {
    moduleId: 'module-0',
    title: 'Sum of Two Numbers',
    slug: 'sum-of-two-numbers',
    difficulty: 'EASY',
    description: `Given two integers, write a function to return their sum.

This problem tests your basic understanding of function definition, parameter passing, and return values.`,
    constraints: `-1000 <= a, b <= 1000`,
    examples: JSON.stringify([
      { input: 'a = 2, b = 3', output: '5', explanation: '2 + 3 = 5' },
      { input: 'a = -1, b = 1', output: '0', explanation: '-1 + 1 = 0' },
    ]),
    intuition: `This is a fundamental problem that tests your understanding of basic arithmetic operations and function implementation.

In programming, we often need to perform simple operations and return results. The key insight here is that addition is a primitive operation in virtually all programming languages.

Think about:
- How would you handle edge cases like very large numbers?
- What if the numbers were floating-point instead of integers?`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What is the time complexity of addition?', hint: 'Think about how addition is performed at the hardware level' },
      { id: '2', question: 'What would happen if we added two very large integers?', hint: 'Consider integer overflow' },
    ]),
    bruteForce: `Simply use the built-in addition operator. There's no "brute force" vs "optimal" for this basic operation.`,
    optimization: `The addition operator is already O(1). No optimization needed for this basic operation.`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function sum(a, b) {\n  return a + b;\n}`,
        explanation: 'Use the + operator to add two numbers'
      },
      {
        language: 'python',
        code: `def sum(a, b):\n    return a + b`,
        explanation: 'Python uses the same + operator for addition'
      },
      {
        language: 'java',
        code: `public int sum(int a, int b) {\n    return a + b;\n}`,
        explanation: 'Java requires explicit return type declaration'
      },
    ]),
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    starterCode: JSON.stringify({
      javascript: `function sum(a, b) {\n  // Your code here\n}`,
      python: `def sum(a, b):\n    # Your code here\n    pass`,
      java: `public int sum(int a, int b) {\n    // Your code here\n    return 0;\n}`,
      typescript: `function sum(a: number, b: number): number {\n  // Your code here\n  return 0;\n}`,
      cpp: `int sum(int a, int b) {\n    // Your code here\n    return 0;\n}`,
      go: `func sum(a, b int) int {\n    // Your code here\n    return 0\n}`,
      rust: `fn sum(a: i32, b: i32) -> i32 {\n    // Your code here\n    0\n}`,
    }),
    testCases: JSON.stringify([
      { input: 'a = 2, b = 3', expectedOutput: '5' },
      { input: 'a = -1, b = 1', expectedOutput: '0' },
      { input: 'a = 0, b = 0', expectedOutput: '0' },
      { input: 'a = 100, b = 200', expectedOutput: '300' },
    ]),
    hints: JSON.stringify(['Use the + operator', 'Return the result directly']),
    order: 1,
  },
  // Module 1: Arrays & Strings
  {
    moduleId: 'module-1',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'EASY',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: `- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
    examples: JSON.stringify([
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2]' },
    ]),
    intuition: `**Real-world intuition:**
Imagine you're at a store and need to find two items that together cost exactly $50. You have a list of all item prices. Instead of checking every pair (which would take forever), you could use a price lookup system.

For each item price, you know exactly what other price you need ($50 - current price). You can then check if that needed price exists in your lookup.

**Why this works:**
By remembering what you've seen before, you can instantly check if the complement exists. This is the power of hash maps!`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What data structure allows O(1) lookup time?', hint: 'Think about hash-based data structures' },
      { id: '2', question: 'For each number, what value are you looking for?', hint: 'It\'s related to the target' },
      { id: '3', question: 'What should you store in your data structure?', hint: 'You need indices, not just values' },
    ]),
    bruteForce: `**Approach:** Check every possible pair of numbers.

For each element, check all other elements to see if they sum to the target.

\`\`\`
for i from 0 to n-1:
    for j from i+1 to n-1:
        if nums[i] + nums[j] == target:
            return [i, j]
\`\`\`

**Time Complexity:** O(n²) - We check n*(n-1)/2 pairs
**Space Complexity:** O(1) - No extra space needed

This works but is slow for large arrays!`,
    optimization: `**Key Insight:** Use a hash map to store numbers we've seen and their indices.

For each number, we can calculate what we need (target - current number) and check if it exists in our map.

\`\`\`
hashMap = {}
for i from 0 to n-1:
    complement = target - nums[i]
    if complement exists in hashMap:
        return [hashMap[complement], i]
    hashMap[nums[i]] = i
\`\`\`

**Time Complexity:** O(n) - Single pass through the array
**Space Complexity:** O(n) - Storing at most n elements

This is the optimal solution!`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
        explanation: 'Use a Map for O(1) lookups. Store each number with its index as we iterate.'
      },
      {
        language: 'python',
        code: `def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`,
        explanation: 'Python dictionary provides O(1) average case lookups'
      },
      {
        language: 'java',
        code: `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[] { map.get(complement), i };\n        }\n        map.put(nums[i], i);\n    }\n    return new int[] {};\n}`,
        explanation: 'Use HashMap for efficient lookups in Java'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: JSON.stringify({
      javascript: `function twoSum(nums, target) {\n  // Your code here\n  return [];\n}`,
      python: `def twoSum(nums, target):\n    # Your code here\n    return []`,
      java: `public int[] twoSum(int[] nums, int target) {\n    // Your code here\n    return new int[] {};\n}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {\n  // Your code here\n  return [];\n}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}`,
      go: `func twoSum(nums []int, target int) []int {\n    // Your code here\n    return []int{}\n}`,
      rust: `fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n    // Your code here\n    vec![]\n}`,
    }),
    testCases: JSON.stringify([
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
      { input: 'nums = [3,3], target = 6', expectedOutput: '[0,1]' },
    ]),
    hints: JSON.stringify(['Try using a hash map', 'Store each number\'s index as you iterate', 'The complement is target - current number']),
    order: 1,
  },
  // Module 1: Reverse String
  {
    moduleId: 'module-1',
    title: 'Reverse String',
    slug: 'reverse-string',
    difficulty: 'EASY',
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    constraints: `- 1 <= s.length <= 10^5
- s[i] is a printable ASCII character.`,
    examples: JSON.stringify([
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: 'The string "hello" reversed is "olleh"' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: 'The string "Hannah" reversed is "hannaH"' },
    ]),
    intuition: `**Real-world intuition:**
Imagine you have a row of books and want to reverse their order. The most natural approach is to swap the first and last books, then the second and second-to-last, and so on until you meet in the middle.

**Why this works:**
By swapping from both ends towards the center, each element only needs to move once. This is efficient and requires no extra space.`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'How many swaps do you need to make?', hint: 'Think about the length of the string' },
      { id: '2', question: 'What happens when the string has odd vs even length?', hint: 'Does the middle element need to move?' },
    ]),
    bruteForce: `**Approach:** Create a new array and copy elements in reverse order.

\`\`\`
result = new array of size n
for i from 0 to n-1:
    result[i] = s[n-1-i]
return result
\`\`\`

**Time Complexity:** O(n)
**Space Complexity:** O(n) - Creates a new array

This doesn't meet the in-place requirement!`,
    optimization: `**Two-pointer approach:** Swap elements from both ends moving towards the center.

\`\`\`
left = 0, right = n-1
while left < right:
    swap(s[left], s[right])
    left++
    right--
\`\`\`

**Time Complexity:** O(n/2) = O(n)
**Space Complexity:** O(1) - Only using two pointers

This is optimal and meets all requirements!`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function reverseString(s) {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    [s[left], s[right]] = [s[right], s[left]];\n    left++;\n    right--;\n  }\n}`,
        explanation: 'Use two pointers and swap elements in-place'
      },
      {
        language: 'python',
        code: `def reverseString(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1`,
        explanation: 'Python allows easy tuple unpacking for swaps'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: JSON.stringify({
      javascript: `function reverseString(s) {\n  // Modify s in-place\n}`,
      python: `def reverseString(s):\n    # Modify s in-place\n    pass`,
    }),
    testCases: JSON.stringify([
      { input: 's = ["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { input: 's = ["a"]', expectedOutput: '["a"]' },
    ]),
    hints: JSON.stringify(['Use two pointers', 'Swap elements from both ends', 'Stop when pointers meet in the middle']),
    order: 2,
  },
  // Module 2: Recursion
  {
    moduleId: 'module-2',
    title: 'Factorial',
    slug: 'factorial',
    difficulty: 'EASY',
    description: `Given a non-negative integer n, calculate n factorial (n!).

The factorial of n is the product of all positive integers less than or equal to n.
n! = n × (n-1) × (n-2) × ... × 1

By definition, 0! = 1.`,
    constraints: `0 <= n <= 12`,
    examples: JSON.stringify([
      { input: 'n = 5', output: '120', explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120' },
      { input: 'n = 0', output: '1', explanation: '0! = 1 by definition' },
    ]),
    intuition: `**Real-world intuition:**
Think of factorial like arranging books on a shelf. If you have n books, how many ways can you arrange them?

- For the first position: n choices
- For the second: n-1 choices
- And so on...

This gives us n × (n-1) × (n-2) × ... × 1 = n!

**Recursive insight:**
To arrange n books, first pick one book for the end (n choices), then arrange the remaining (n-1) books. This is n × (n-1)!.`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What is the base case for this recursion?', hint: 'What\'s the simplest factorial to compute?' },
      { id: '2', question: 'How does n! relate to (n-1)!?', hint: 'n! = n × (n-1)!' },
    ]),
    bruteForce: `**Iterative approach:**
\`\`\`
result = 1
for i from 1 to n:
    result = result * i
return result
\`\`\`

This works fine and has O(n) time complexity.`,
    optimization: `**Recursive approach:**
\`\`\`
factorial(n):
    if n == 0:
        return 1
    return n * factorial(n-1)
\`\`\`

Both approaches are O(n) time. The recursive solution is more elegant but uses O(n) stack space.`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}`,
        explanation: 'Base case: 0! = 1. Recursive case: n! = n × (n-1)!'
      },
      {
        language: 'python',
        code: `def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)`,
        explanation: 'Clean recursive implementation'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n) - recursion stack',
    starterCode: JSON.stringify({
      javascript: `function factorial(n) {\n  // Your code here\n  return 0;\n}`,
      python: `def factorial(n):\n    # Your code here\n    return 0`,
    }),
    testCases: JSON.stringify([
      { input: 'n = 5', expectedOutput: '120' },
      { input: 'n = 0', expectedOutput: '1' },
      { input: 'n = 10', expectedOutput: '3628800' },
    ]),
    hints: JSON.stringify(['0! = 1 is the base case', 'n! = n × (n-1)!']),
    order: 1,
  },
  // Module 2: Fibonacci
  {
    moduleId: 'module-2',
    title: 'Fibonacci Number',
    slug: 'fibonacci',
    difficulty: 'EASY',
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given n, calculate F(n).`,
    constraints: `0 <= n <= 30`,
    examples: JSON.stringify([
      { input: 'n = 2', output: '1', explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1' },
      { input: 'n = 3', output: '2', explanation: 'F(3) = F(2) + F(1) = 1 + 1 = 2' },
    ]),
    intuition: `**Real-world intuition:**
Fibonacci appears everywhere in nature - from the arrangement of leaves on a stem, to the spiral of shells, to breeding rabbit populations!

The key insight is that each number depends on the two before it. This makes it perfect for recursion, but also teaches us about optimization.`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What are the base cases?', hint: 'F(0) and F(1)' },
      { id: '2', question: 'Why is naive recursion slow?', hint: 'We recalculate the same values many times' },
    ]),
    bruteForce: `**Naive Recursion:**
\`\`\`
fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
\`\`\`

**Time:** O(2^n) - Exponential! Very slow for large n.
**Space:** O(n) - Call stack depth`,
    optimization: `**Dynamic Programming (Memoization):**
Store computed values to avoid recalculation.

\`\`\`
memo = {}
fib(n):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]
\`\`\`

**Time:** O(n) - Each value computed once
**Space:** O(n)`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function fib(n, memo = {}) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n  return memo[n];\n}`,
        explanation: 'Use memoization to avoid redundant calculations'
      },
      {
        language: 'python',
        code: `def fib(n, memo={}):\n    if n <= 1:\n        return n\n    if n in memo:\n        return memo[n]\n    memo[n] = fib(n-1, memo) + fib(n-2, memo)\n    return memo[n]`,
        explanation: 'Python dictionary for memoization'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: JSON.stringify({
      javascript: `function fib(n) {\n  // Your code here\n  return 0;\n}`,
      python: `def fib(n):\n    # Your code here\n    return 0`,
    }),
    testCases: JSON.stringify([
      { input: 'n = 2', expectedOutput: '1' },
      { input: 'n = 5', expectedOutput: '5' },
      { input: 'n = 10', expectedOutput: '55' },
    ]),
    hints: JSON.stringify(['Use memoization to store computed values', 'Base cases: F(0) = 0, F(1) = 1']),
    order: 2,
  },
  // Module 3: Binary Search
  {
    moduleId: 'module-3',
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'EASY',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    constraints: `- 1 <= nums.length <= 10^4
- -10^4 < nums[i], target < 10^4
- All integers in nums are unique.
- nums is sorted in ascending order.`,
    examples: JSON.stringify([
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' },
    ]),
    intuition: `**Real-world intuition:**
Imagine looking for a word in a dictionary. You don't start from page 1 and check every word. Instead, you open somewhere in the middle, check if the word should be before or after, and repeat.

This is binary search! Each step cuts your search space in half.

**Why it works:**
Because the array is sorted, comparing with the middle element tells us exactly which half to search next.`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'Why must the array be sorted?', hint: 'How do you know which half to search?' },
      { id: '2', question: 'How do you calculate the middle index?', hint: 'left + (right - left) / 2 prevents overflow' },
      { id: '3', question: 'When should you stop searching?', hint: 'What if left > right?' },
    ]),
    bruteForce: `**Linear Search:**
\`\`\`
for i from 0 to n-1:
    if nums[i] == target:
        return i
return -1
\`\`\`

**Time:** O(n) - Check every element
**Space:** O(1)

Works but doesn't use the sorted property!`,
    optimization: `**Binary Search:**
\`\`\`
left = 0, right = n-1
while left <= right:
    mid = left + (right - left) / 2
    if nums[mid] == target:
        return mid
    if nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1
\`\`\`

**Time:** O(log n) - Search space halves each step
**Space:** O(1)

This is optimal!`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor(left + (right - left) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
        explanation: 'Classic binary search implementation'
      },
      {
        language: 'python',
        code: `def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`,
        explanation: 'Python binary search with integer division'
      },
    ]),
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    starterCode: JSON.stringify({
      javascript: `function search(nums, target) {\n  // Your code here\n  return -1;\n}`,
      python: `def search(nums, target):\n    # Your code here\n    return -1`,
    }),
    testCases: JSON.stringify([
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expectedOutput: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expectedOutput: '-1' },
    ]),
    hints: JSON.stringify(['Use two pointers: left and right', 'Compare middle element with target', 'Adjust pointers based on comparison']),
    order: 1,
  },
  // Module 1: Maximum Subarray
  {
    moduleId: 'module-1',
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'MEDIUM',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
    constraints: `- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4`,
    examples: JSON.stringify([
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1', explanation: 'The subarray [1] has the largest sum 1.' },
    ]),
    intuition: `**Real-world intuition:**
Imagine you're tracking daily profit/loss for a business. You want to find the best consecutive period. 

If running total goes negative, you're better off starting fresh from the next day. This is Kadane's algorithm!

**Key insight:**
A negative running sum can never help future numbers be larger. So reset when sum goes negative.`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What should you do when running sum becomes negative?', hint: 'A negative prefix never helps' },
      { id: '2', question: 'How do you track the maximum sum seen so far?', hint: 'Update after each element' },
    ]),
    bruteForce: `**Check all subarrays:**
\`\`\`
maxSum = -infinity
for i from 0 to n-1:
    for j from i to n-1:
        sum = 0
        for k from i to j:
            sum += nums[k]
        maxSum = max(maxSum, sum)
\`\`\`

**Time:** O(n³) - Very slow!`,
    optimization: `**Kadane's Algorithm:**
\`\`\`
maxSum = nums[0]
currentSum = 0
for num in nums:
    if currentSum < 0:
        currentSum = 0
    currentSum += num
    maxSum = max(maxSum, currentSum)
\`\`\`

**Time:** O(n) - Single pass
**Space:** O(1)`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = 0;\n  for (const num of nums) {\n    if (currentSum < 0) currentSum = 0;\n    currentSum += num;\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}`,
        explanation: 'Kadane\'s algorithm - reset when sum goes negative'
      },
      {
        language: 'python',
        code: `def maxSubArray(nums):\n    max_sum = nums[0]\n    current_sum = 0\n    for num in nums:\n        if current_sum < 0:\n            current_sum = 0\n        current_sum += num\n        max_sum = max(max_sum, current_sum)\n    return max_sum`,
        explanation: 'Python implementation of Kadane\'s algorithm'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: JSON.stringify({
      javascript: `function maxSubArray(nums) {\n  // Your code here\n  return 0;\n}`,
      python: `def maxSubArray(nums):\n    # Your code here\n    return 0`,
    }),
    testCases: JSON.stringify([
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: 'nums = [1]', expectedOutput: '1' },
      { input: 'nums = [5,4,-1,7,8]', expectedOutput: '23' },
    ]),
    hints: JSON.stringify(['Use Kadane\'s algorithm', 'Reset current sum when it goes negative', 'Track maximum sum seen']),
    order: 3,
  },
  // Module 6: Tree Inorder Traversal
  {
    moduleId: 'module-6',
    title: 'Binary Tree Inorder Traversal',
    slug: 'binary-tree-inorder-traversal',
    difficulty: 'EASY',
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

Inorder traversal: Left → Root → Right`,
    constraints: `- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100`,
    examples: JSON.stringify([
      { input: 'root = [1,null,2,3]', output: '[1,3,2]', explanation: 'Inorder: left(1) → root(1) → right subtree' },
      { input: 'root = []', output: '[]', explanation: 'Empty tree returns empty array' },
    ]),
    intuition: `**Real-world intuition:**
Think of a family tree. Inorder traversal visits people in a specific order: all descendants on the left side first, then the person, then all descendants on the right.

For a BST, this gives us sorted order!

**The pattern:**
1. Go left as far as possible
2. Process current node
3. Go right`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What is the order of visiting nodes?', hint: 'Left, Root, Right' },
      { id: '2', question: 'What is the base case for recursion?', hint: 'What if the node is null?' },
    ]),
    bruteForce: `**Iterative with Stack:**
Simulate the call stack manually.

\`\`\`
stack = []
result = []
current = root
while current or stack not empty:
    while current:
        stack.push(current)
        current = current.left
    current = stack.pop()
    result.add(current.val)
    current = current.right
\`\`\``,
    optimization: `**Recursive (cleaner):**
\`\`\`
inorder(node):
    if node is null: return
    inorder(node.left)
    result.add(node.val)
    inorder(node.right)
\`\`\`

Both are O(n) time and O(h) space (h = height).`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function inorderTraversal(root) {\n  const result = [];\n  function inorder(node) {\n    if (!node) return;\n    inorder(node.left);\n    result.push(node.val);\n    inorder(node.right);\n  }\n  inorder(root);\n  return result;\n}`,
        explanation: 'Recursive inorder traversal'
      },
      {
        language: 'python',
        code: `def inorderTraversal(root):\n    result = []\n    def inorder(node):\n        if not node:\n            return\n        inorder(node.left)\n        result.append(node.val)\n        inorder(node.right)\n    inorder(root)\n    return result`,
        explanation: 'Python recursive solution'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) where h is tree height',
    starterCode: JSON.stringify({
      javascript: `function inorderTraversal(root) {\n  // Your code here\n  return [];\n}`,
      python: `def inorderTraversal(root):\n    # Your code here\n    return []`,
    }),
    testCases: JSON.stringify([
      { input: 'root = [1,null,2,3]', expectedOutput: '[1,3,2]' },
      { input: 'root = []', expectedOutput: '[]' },
    ]),
    hints: JSON.stringify(['Visit left subtree first', 'Then process current node', 'Finally visit right subtree']),
    order: 1,
  },
  // Module 4: Linked List - Reverse Linked List
  {
    moduleId: 'module-4',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'EASY',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    constraints: `- The number of nodes in the list is the range [0, 5000].
- -5000 <= Node.val <= 5000`,
    examples: JSON.stringify([
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: 'Reversed list' },
      { input: 'head = [1,2]', output: '[2,1]', explanation: 'Reversed list' },
    ]),
    intuition: `**Real-world intuition:**
Imagine a train of people holding hands. To reverse the direction, each person needs to let go of the hand they're holding and grab the hand of the person behind them instead.

**The pattern:**
For each node, we need to change its next pointer to point to the previous node.`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What pointers do you need to track?', hint: 'Previous, current, and next node' },
      { id: '2', question: 'Why do you need to store next before changing pointer?', hint: 'You lose reference otherwise' },
    ]),
    bruteForce: `**Using extra space:**
Store all nodes in an array, then rebuild in reverse.

**Time:** O(n) **Space:** O(n)`,
    optimization: `**Iterative approach:**
\`\`\`
prev = null
current = head
while current:
    next = current.next
    current.next = prev
    prev = current
    current = next
return prev
\`\`\`

**Time:** O(n) **Space:** O(1)`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function reverseList(head) {\n  let prev = null;\n  let current = head;\n  while (current) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}`,
        explanation: 'Three pointer technique'
      },
      {
        language: 'python',
        code: `def reverseList(head):\n    prev = None\n    current = head\n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    return prev`,
        explanation: 'Iterative reversal'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: JSON.stringify({
      javascript: `function reverseList(head) {\n  // Your code here\n  return head;\n}`,
      python: `def reverseList(head):\n    # Your code here\n    return head`,
    }),
    testCases: JSON.stringify([
      { input: 'head = [1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' },
      { input: 'head = []', expectedOutput: '[]' },
    ]),
    hints: JSON.stringify(['Track previous node', 'Store next before changing pointer']),
    order: 1,
  },
  // Module 5: Stack - Valid Parentheses
  {
    moduleId: 'module-5',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'EASY',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.`,
    constraints: `- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'.`,
    examples: JSON.stringify([
      { input: 's = "()"', output: 'true', explanation: 'Valid pair' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All valid pairs' },
      { input: 's = "(]"', output: 'false', explanation: 'Wrong closing bracket' },
    ]),
    intuition: `**Real-world intuition:**
Think of stacking plates. You can only remove the top plate. Similarly, the most recent opening bracket must be closed first - this is LIFO (Last In, First Out), perfect for a stack!`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What data structure fits this problem?', hint: 'LIFO behavior' },
      { id: '2', question: 'When is a string invalid?', hint: 'Mismatch or unclosed brackets' },
    ]),
    bruteForce: `Count brackets - doesn't work for order!`,
    optimization: `**Stack approach:**
\`\`\`
stack = []
for char in s:
    if char is opening:
        stack.push(char)
    else:
        if stack empty: return false
        top = stack.pop()
        if top doesn't match char: return false
return stack empty
\`\`\``,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const c of s) {\n    if (c in map) {\n      if (stack.pop() !== map[c]) return false;\n    } else {\n      stack.push(c);\n    }\n  }\n  return stack.length === 0;\n}`,
        explanation: 'Use stack and mapping'
      },
      {
        language: 'python',
        code: `def isValid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in mapping:\n            if not stack or stack.pop() != mapping[c]:\n                return False\n        else:\n            stack.append(c)\n    return len(stack) == 0`,
        explanation: 'Stack with bracket mapping'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: JSON.stringify({
      javascript: `function isValid(s) {\n  // Your code here\n  return true;\n}`,
      python: `def isValid(s):\n    # Your code here\n    return True`,
    }),
    testCases: JSON.stringify([
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' },
    ]),
    hints: JSON.stringify(['Use a stack', 'Map closing to opening brackets']),
    order: 1,
  },
  // Module 9: Graphs - Number of Islands
  {
    moduleId: 'module-9',
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'MEDIUM',
    description: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    constraints: `- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] is '0' or '1'.`,
    examples: JSON.stringify([
      { input: 'grid = [["1","1","1"],["1","1","0"],["1","0","1"]]', output: '2', explanation: 'Two separate islands' },
    ]),
    intuition: `**Real-world intuition:**
Imagine looking at an aerial photo of islands. You'd scan across, and when you find land, you'd mark all connected land as "visited" to avoid counting it twice.

**The pattern:**
DFS/BFS to "sink" (mark visited) all connected land when you find an unvisited piece.`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'How do you mark visited cells?', hint: 'Change to water or use visited set' },
      { id: '2', question: 'What are the four directions?', hint: 'Up, down, left, right' },
    ]),
    bruteForce: `Check every cell - O(m*n) minimum needed`,
    optimization: `**DFS approach:**
\`\`\`
count = 0
for each cell:
    if cell is land:
        count++
        dfs(cell)  # mark all connected as visited
return count

dfs(cell):
    if out of bounds or water: return
    mark as water
    dfs(all 4 neighbors)
\`\`\``,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function numIslands(grid) {\n  let count = 0;\n  const dfs = (i, j) => {\n    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;\n    grid[i][j] = '0';\n    dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1);\n  };\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === '1') { count++; dfs(i, j); }\n    }\n  }\n  return count;\n}`,
        explanation: 'DFS to sink islands'
      },
      {
        language: 'python',
        code: `def numIslands(grid):\n    count = 0\n    def dfs(i, j):\n        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] == '0':\n            return\n        grid[i][j] = '0'\n        dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)\n    \n    for i in range(len(grid)):\n        for j in range(len(grid[0])):\n            if grid[i][j] == '1':\n                count += 1\n                dfs(i, j)\n    return count`,
        explanation: 'DFS traversal'
      },
    ]),
    timeComplexity: 'O(m*n)',
    spaceComplexity: 'O(m*n) worst case recursion',
    starterCode: JSON.stringify({
      javascript: `function numIslands(grid) {\n  // Your code here\n  return 0;\n}`,
      python: `def numIslands(grid):\n    # Your code here\n    return 0`,
    }),
    testCases: JSON.stringify([
      { input: 'grid = [["1","1","1"],["1","1","0"],["1","0","1"]]', expectedOutput: '2' },
    ]),
    hints: JSON.stringify(['Use DFS or BFS', 'Mark visited cells', 'Count connected components']),
    order: 1,
  },
  // Module 10: DP - Climbing Stairs
  {
    moduleId: 'module-10',
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'EASY',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    constraints: `- 1 <= n <= 45`,
    examples: JSON.stringify([
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1' },
    ]),
    intuition: `**Real-world intuition:**
This is Fibonacci in disguise! To reach step n, you either:
- Came from step n-1 (took 1 step)
- Came from step n-2 (took 2 steps)

So ways(n) = ways(n-1) + ways(n-2)`,
    thinkSection: JSON.stringify([
      { id: '1', question: 'What are the base cases?', hint: 'n=1 and n=2' },
      { id: '2', question: 'How does this relate to Fibonacci?', hint: 'Same recurrence relation' },
    ]),
    bruteForce: `**Naive recursion:**
\`\`\`
climb(n):
    if n <= 2: return n
    return climb(n-1) + climb(n-2)
\`\`\`
**Time:** O(2^n) - Exponential!`,
    optimization: `**DP approach:**
\`\`\`
if n <= 2: return n
dp = [0]*(n+1)
dp[1], dp[2] = 1, 2
for i from 3 to n:
    dp[i] = dp[i-1] + dp[i-2]
return dp[n]
\`\`\`
**Time:** O(n) **Space:** O(n) or O(1) with optimization`,
    solution: JSON.stringify([
      {
        language: 'javascript',
        code: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}`,
        explanation: 'Space-optimized DP'
      },
      {
        language: 'python',
        code: `def climbStairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b`,
        explanation: 'Iterative Fibonacci'
      },
    ]),
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: JSON.stringify({
      javascript: `function climbStairs(n) {\n  // Your code here\n  return 0;\n}`,
      python: `def climbStairs(n):\n    # Your code here\n    return 0`,
    }),
    testCases: JSON.stringify([
      { input: 'n = 2', expectedOutput: '2' },
      { input: 'n = 3', expectedOutput: '3' },
      { input: 'n = 5', expectedOutput: '8' },
    ]),
    hints: JSON.stringify(['This is Fibonacci!', 'Use DP to avoid recalculating']),
    order: 1,
  },
]

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.submission.deleteMany()
  await prisma.note.deleteMany()
  await prisma.dailyChallenge.deleteMany()
  await prisma.userProgress.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.module.deleteMany()

  console.log('✅ Cleared existing data')

  // Create modules
  for (const moduleData of modules) {
    await prisma.module.create({
      data: {
        order: moduleData.order,
        title: moduleData.title,
        description: moduleData.description,
        slug: moduleData.slug,
        icon: moduleData.icon,
        color: moduleData.color,
      },
    })
  }

  console.log('✅ Created modules')

  // Get module IDs
  const dbModules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
  })

  // Create problems
  for (const problemData of problems) {
    const moduleIndex = parseInt(problemData.moduleId.split('-')[1])
    const targetModule = dbModules[moduleIndex]

    if (targetModule) {
      await prisma.problem.create({
        data: {
          moduleId: targetModule.id,
          title: problemData.title,
          slug: problemData.slug,
          difficulty: problemData.difficulty as any,
          description: problemData.description,
          constraints: problemData.constraints,
          examples: problemData.examples,
          intuition: problemData.intuition,
          thinkSection: problemData.thinkSection,
          bruteForce: problemData.bruteForce,
          optimization: problemData.optimization,
          solution: problemData.solution,
          timeComplexity: problemData.timeComplexity,
          spaceComplexity: problemData.spaceComplexity,
          starterCode: problemData.starterCode,
          testCases: problemData.testCases,
          hints: problemData.hints,
          order: problemData.order,
        },
      })
    }
  }

  console.log('✅ Created problems')

  // Create a demo user (only if doesn't exist)
  const existingUser = await prisma.user.findUnique({
    where: { email: 'demo@dsaforge.dev' },
  })

  let demoUser = existingUser
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('password123', 12)
    demoUser = await prisma.user.create({
      data: {
        email: 'demo@dsaforge.dev',
        name: 'Demo User',
        password: hashedPassword,
        role: 'USER',
        preferredLanguage: 'javascript',
        experienceLevel: 'BEGINNER',
        onboardingCompleted: true,
      },
    })
    console.log('✅ Created demo user (email: demo@dsaforge.dev, password: password123)')
  } else {
    console.log('✅ Demo user already exists')
  }

  // Create initial progress for demo user (only if doesn't exist)
  const firstModule = dbModules[0]
  if (firstModule && demoUser) {
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_moduleId: { userId: demoUser.id, moduleId: firstModule.id },
      },
    })

    if (!existingProgress) {
      await prisma.userProgress.create({
        data: {
          userId: demoUser.id,
          moduleId: firstModule.id,
          completed: false,
          completedTopics: '[]',
          completedProblems: '[]',
        },
      })
      console.log('✅ Created initial progress')
    } else {
      console.log('✅ Progress already exists')
    }
  }

  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
