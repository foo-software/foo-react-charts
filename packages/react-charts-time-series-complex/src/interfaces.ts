export interface RangeInterface {
  max: number;
  min: number;
  color: string;
}

export interface TimeSeriesComplexChartDataInterface {
  annotation?: string;
  date: Date;
  [key: string]: any;
}

export interface TimeSeriesComplexChartPropsInterface {
  annotationBulletRadius?: number;
  annotationBulletStrokeWidth?: number;
  chartId: string;
  color?: string;
  className?: string;
  data: TimeSeriesComplexChartDataInterface[];
  dateMinGridDistance?: number;
  field: string;
  fillOpacity?: number;
  hasAnnotations?: boolean;
  hasBaseGrid?: boolean;
  hasGrid?: boolean;
  hasOnlyLastRange?: boolean;
  hasXAxis?: boolean;
  hasYAxis?: boolean;
  height?: string;
  max?: number;
  min?: number;
  name: string;
  onClick?: (data: any) => any;
  padding?: number;
  ranges?: RangeInterface[];
  refreshId?: string;
  strokeWidth?: number;
  tooltipClassName?: string;
  tooltipValueClassName?: string;
  tooltipAnnotationClassName?: string;
}
