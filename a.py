import sys

sys.setrecursionlimit(200000)

def solve(N, A, Q, Queries):
    tree = [0] * (4 * N)

    def build(node, start, end):
        if start == end:
            tree[node] = A[start]
        else:
            mid = (start + end) // 2
            build(2 * node, start, mid)
            build(2 * node + 1, mid + 1, end)
            tree[node] = min(tree[2 * node], tree[2 * node + 1])

    def update(node, start, end, idx, val):
        if start == end:
            tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                update(2 * node, start, mid, idx, val)
            else:
                update(2 * node + 1, mid + 1, end, idx, val)
            tree[node] = min(tree[2 * node], tree[2 * node + 1])

    def query(node, start, end, l, r, x):
        if start > r or end < l or tree[node] > x:
            return -1
        if start == end:
            return start + 1
        mid = (start + end) // 2
        left = query(2 * node, start, mid, l, r, x)
        if left != -1:
            return left
        return query(2 * node + 1, mid + 1, end, l, r, x)

    build(1, 0, N - 1)

    res = []
    for q in Queries:
        if q[0] == 1:
            update(1, 0, N - 1, q[1] - 1, q[2])
        else:
            res.append(query(1, 0, N - 1, q[1] - 1, q[2] - 1, q[3]))
    return res


# -------- ONLINE COMPILER TEST --------
def main():
    # SAMPLE INPUT (hard-coded)
    N = 10
    A = [12, 71, 80, 22, 48, 13, 75, 81, 68, 52]
    Q = 4
    Queries = [
        [2, 1, 10, 27],
        [1, 2, 49, 0],
        [1, 3, 26, 0],
        [2, 2, 10, 7]
    ]

    ans = solve(N, A, Q, Queries)
    for x in ans:
        print(x)

if __name__ == "__main__":
    main()
