
export const truncateWithEllipsis = (str, n=20) => {
    return (typeof str !== 'undefined' &&str.length > n) ? str.substr(0, n-1) + '...' : str;
}