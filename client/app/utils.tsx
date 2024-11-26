export const getRandomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16)

export const getColorFromPalette = (value: number) => {
  const palette = ['#640D5F', '#D91656', '#EB5B00', '#FFB200']
  const index = Math.min(Math.floor(value * palette.length), palette.length - 1)
  return palette[index]
}