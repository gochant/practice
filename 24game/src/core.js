(function (root, factory) {
    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        factory(exports)
    } else {
        factory(this)
    }
}(this, function (exports) {

    const placeholders = {'+': 'plus', '-': 'minus', '*': 'times', '/': 'divide'}

    /**
     * 24 游戏解法器
     */
    class The24Game {
        /**
         *
         * @param {number} [target=24] - 目标数字
         * @param {boolean} [optimizeBracket=false] - 是否优化掉不必要的括号
         */
        constructor({target = 24, optimizeBracket = false} = {}) {
            // 目标数字
            this.target = target
            this.optimizeBracket = optimizeBracket

            // 缓存
            this._cache = {}
        }

        /**
         * 获取满足条件的表达式
         * @param {Array.<number>} arr - 用于组合的数字
         * @return {Array.<string>} - 表达式列表
         * @example
         *   new The24Game().solve([5, 5, 6, 6])
         */
        solve(...arr) {
            if(arr.length === 0) return []
            arr.sort()
            const cacheKey = arr.toString()
            if (this._cache[cacheKey]) {
                return this._cache[cacheKey]
            }
            // 所有可能的四则运算中间结果集
            const intermediates = this._intermediates = []
            // 等价表达式缓存表
            this._equalExprs = {}

            // arr 集合可划分为 2^n - 2 个子集，用二进制位表示集合
            for (let i = 1, len = 2 ** arr.length - 1; i <= len; i++) {
                intermediates[i] = []
            }
            // 填充单值集合结果集
            for (let i = 0, len = arr.length; i < len; i++) {
                let item = arr[i]
                intermediates[2 ** i] = [{
                    exp: item.toString(),
                    val: item
                }]
            }
            // 填充多值集合结果集
            for (let i = 1, len = 2 ** arr.length - 1; i <= len; i++) {
                intermediates[i] = this.operate(i)
            }

            const ret = intermediates[intermediates.length - 1]
                .filter(item => Math.abs(item.val - this.target) < Number.EPSILON)
                .map(item => item.exp).sort()
                // 去重
                .filter((item, k, arr) => k === 0 || item !== arr[k - 1])
            this._cache[cacheKey] = ret
            return ret
        }

        /**
         * 计算并填充表达式结果集
         * @param subset
         * @return {*}
         * @private
         */
        operate(subset) {
            const intermediates = this._intermediates
            if (intermediates[subset].length === 0) {
                for (let i = 1; i < Math.ceil(subset / 2); i++) {  // 折半递归深度
                    if ((i & subset) === i) {
                        // 递归进行
                        intermediates[subset] = intermediates[subset]
                            .concat(this._forkOperate(this.operate(i), this.operate(subset - i)))
                    }
                }
            }

            return intermediates[subset]
        }

        /**
         * 标准化单个表达式
         * @param op - 连接操作符
         * @param nextOp - 表达式操作符
         * @param exp - 表达式
         * @param [isLeft=true] - 是否左操作数
         * @return {string} - 标准化后的表达式
         * @private
         */
        _normalizeExpr(op, nextOp, exp, isLeft = true) {
            if (this.optimizeBracket) {
                // 使用优化的括号处理方式
                if (isLeft) {
                    return ((op === '*' && /[\+\-]/.test(nextOp))
                    || (op === '/' && /[\+\-]/.test(nextOp))) ?
                        `(${exp})` : exp
                } else {
                    return ((op === '-' && /[\+\-]/.test(nextOp))
                    || (op === '*' && /[\+\-\/]/.test(nextOp))
                    || (op === '/' && /[\+\-\*\/]/.test(nextOp))) ?
                        `(${exp})` : exp
                }

            }
            return nextOp != null ? `(${exp})` : exp
        }

        /**
         * 获取等价表达式
         * @param left - 左操作数
         * @param right - 右操作数
         * @param op - 操作
         * @return {String} - 表达式
         * @private
         */
        _getEqualExpr(left, right, op) {
            const equlaExprs = this._equalExprs
            const exprs = [this._normalizeExpr(op, left.op, left.exp),
                this._normalizeExpr(op, right.op, right.exp, false)]

            // 处理加法、乘法交换律
            if (op === '+' || op === '*') {
                // 进行 Unicode 排序，为了满足用例
                let expr = exprs.sort().join(op)

                // 对等价表达式生成同样的 key
                const keys = expr.replace(/(\(.+\))/g, (str)=> {
                    return str.replace(op, placeholders[op])
                }).split(op).sort()
                const key = keys.join(op).replace(placeholders[op], op)
                if (equlaExprs[key] == null) {
                    equlaExprs[key] = expr
                }
                return equlaExprs[key]
            }

            return exprs.join(op)
        }

        /**
         * 枚举分支运算，并计算值
         * @param aSet - 集合 a
         * @param bSet - 集合 b
         * @return {Array}
         * @private
         */
        _forkOperate(aSet, bSet) {
            const ret = []
            aSet.forEach((a, i) => {
                bSet.forEach((b, j)=> {
                    ret.push({
                        exp: this._getEqualExpr(a, b, '+'),
                        val: a.val + b.val,
                        op: '+'
                    })
                    ret.push({
                        exp: this._getEqualExpr(a, b, '-'),
                        val: a.val - b.val,
                        op: '-'
                    })
                    if (a.val !== b.val) {
                        ret.push({
                            exp: this._getEqualExpr(b, a, '-'),
                            val: b.val - a.val,
                            op: '-'
                        })
                    }
                    ret.push({
                        exp: this._getEqualExpr(a, b, '*'),
                        val: a.val * b.val,
                        op: '*'
                    })
                    if (b.val != 0) {
                        ret.push({
                            exp: this._getEqualExpr(a, b, '/'),
                            val: a.val / b.val,
                            op: '/'
                        })
                    }
                    if (a.val != 0 && a.val !== b.val) {
                        ret.push({
                            exp: this._getEqualExpr(b, a, '/'),
                            val: b.val / a.val,
                            op: '/'
                        })
                    }
                })
            })
            return ret
        }
    }

    exports.The24Game = The24Game
}));