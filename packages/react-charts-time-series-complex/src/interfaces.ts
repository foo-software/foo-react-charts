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

export interface TimeSeriesComplexChartBasePropsInterface {
  chartId: string;
  color?: string;
  className?: string;
  dateMinGridDistance?: number;
  fillOpacity?: number;
  hasBaseGrid?: boolean;
  hasGrid?: boolean;
  hasXAxis?: boolean;
  hasYAxis?: boolean;
  height?: string;
  isTooltipDisabled?: boolean;
  max?: number;
  min?: number;
  padding?: number;
  strokeWidth?: number;
}

export interface TimeSeriesComplexPlaceholderChartPropsInterface
  extends TimeSeriesComplexChartBasePropsInterface {
  data?: TimeSeriesComplexChartDataInterface[];
}

export interface TimeSeriesComplexChartPropsInterface
  extends TimeSeriesComplexChartBasePropsInterface {
  annotationBulletRadius?: number;
  annotationBulletStrokeWidth?: number;
  data: TimeSeriesComplexChartDataInterface[];
  dateAxisExtraMax?: number;
  dateAxisExtraMin?: number;
  field: string;
  hasAnnotations?: boolean;
  hasOnlyLastRange?: boolean;
  name: string;
  onClick?: (data: any) => any;
  ranges?: RangeInterface[];
  refreshId?: string;
  tooltipClassName?: string;
  tooltipValueClassName?: string;
  tooltipAnnotationClassName?: string;
  valueAxisExtraMax?: number;
  valueAxisExtraMin?: number;
  valueMinGridDistance?: number;
  valueAxisPrefix?: string;
  valueAxisSuffix?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}
