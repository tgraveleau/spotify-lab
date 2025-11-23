export const formatNumber = (n: number) => {
  if (n >= 1_000_000) {
    return (
      (n / 1_000_000)
        .toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
        .replace(',0', '') + 'M'
    )
  }
  if (n >= 1_000) {
    return (n / 1_000).toLocaleString(undefined, { maximumFractionDigits: 0 }) + 'k'
  }
  return n.toLocaleString(undefined)
}
