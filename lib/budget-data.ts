export const formatCost = (cost: string) => {
  const numberCost = parseInt(cost)
  if (!cost || Number.isNaN(numberCost)) {
    return cost
  }
  return numberCost.toLocaleString()
}
