# 24 Game Solver

## 特点

基本算法采用《编程之美》24点游戏的第二种解法，即使用分治法进行递归

* 支持任意元素个数和任意目标值（默认 4 个元素和 24 为目标值）
* 对典型的加法和乘法交换律进行了去重处理
* 支持对多余括号进行处理

性能优化：

* 对一些路径进行了剪枝
* 使用缓存避免重复计算

工具：

* 文档：jsdoc
* 单元测试：mocha + chai
* 覆盖率测试：istanbul

## 可改进的地方

### 常见的等价式处理

* 加减乘除变换式：例如：6\*6-(6+6) 和 6\*6-6-6，
* 幂的等价：2 * 2 和 2 + 2

### 表达式解析

例如：6*6-5-7 和 6*6-7-5