export type Quote = {
  _id: string;
  author: string;
  text: string;
  source?: string;
  rating?: number;
};

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[]
  }[];
};
