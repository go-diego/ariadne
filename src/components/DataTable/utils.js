export function sortBy(prop, reverse, primer) {
    const key = x => (primer ? primer(x[prop]) : x[prop]);
    return (a, b) => {
        const A = key(a);
        const B = key(b);
        return (A < B ? -1 : A > B ? 1 : 0) * [-1, 1][+!!reverse];
    };
}
