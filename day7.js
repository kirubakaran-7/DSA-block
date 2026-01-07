/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxProduct = function(root) {
    const MOD = 1e9 + 7;
    let totalSum = 0;
    let maxProduct = 0;

    // First DFS: compute total sum of tree
    function getTotalSum(node) {
        if (!node) return 0;
        return node.val + getTotalSum(node.left) + getTotalSum(node.right);
    }

    totalSum = getTotalSum(root);

    // Second DFS: compute subtree sums & max product
    function dfs(node) {
        if (!node) return 0;

        let leftSum = dfs(node.left);
        let rightSum = dfs(node.right);

        let subTreeSum = node.val + leftSum + rightSum;

        // Try cutting above this subtree
        let product = subTreeSum * (totalSum - subTreeSum);
        maxProduct = Math.max(maxProduct, product);

        return subTreeSum;
    }

    dfs(root);

    return maxProduct % MOD;
};
