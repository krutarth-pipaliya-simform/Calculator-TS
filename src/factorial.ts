export default function factorial(n : number) {
    if (n < 0) return NaN;
    let ans = n;
    while (--n) {
        ans *= n;
    }
    return ans;
}
