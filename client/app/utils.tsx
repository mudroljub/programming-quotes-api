export const getRandomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16)

export const getColorFromPalette = (percent: number, palette = ['#640D5F', '#D91656', '#EB5B00', '#FFB200']) => {
  const index = Math.min(Math.floor(percent * palette.length), palette.length - 1)
  return palette[index]
}

export const getKeysAndValues = (arr: [string, number][]): [string[], number[]] =>
  arr.reduce((acc, [key, value]) => {
    acc[0].push(key);
    acc[1].push(value);
    return acc;
  }, [([] as string[]), ([] as number[])] );