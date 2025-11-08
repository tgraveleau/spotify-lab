export const convertNumberToPx = (size: Record<string, number>) => {
  return Object.fromEntries(
    Object.entries(size)
      .filter(([, value]) => typeof value === 'number')
      .map(([key, value]) => [key, `${value}px`])
  )
}
