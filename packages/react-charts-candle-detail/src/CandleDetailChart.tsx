import React from 'react';
import classnames from 'classnames';

interface CandlePropsInterface {
  close: number;
  high: number;
  low: number;
  open: number;
  // trades: number;
  time: string;
  volume: number;
}

interface CandleDetailChartPropsInterface {
  assetSymbol: string;
  candles: CandlePropsInterface[];
  className?: string;
  colorGreen?: string;
  colorRed?: string;
  link?: string;
  widthPercentBody?: number;
  widthWick?: number;
}

const componentName = 'candleDetailChart';

const CandleDetailChart = ({
  assetSymbol,
  candles,
  className,
  colorGreen = '#26a699',
  colorRed = '#f23645',
  link,
  widthPercentBody = 3,
  widthWick = 2,
}: CandleDetailChartPropsInterface) => {
  let high = 0;
  let low = 0;

  for (const candle of candles) {
    if (!low || candle.low < low) {
      low = candle.low;
    }
    if (!high || candle.high > high) {
      high = candle.high;
    }
  }

  const percentWidth = 100 / candles.length;
  const overallHighLowDiff = high - low;

  return (
    <div className={classnames(className, componentName)}>
      <h2 className={`${componentName}__header`}>{assetSymbol}</h2>
      <section
        className={`${componentName}__section--top`}
        style={{
          flexBasis: `${percentWidth}%`,
        }}
      >
        {candles.map((current) => {
          const isBearish = current.close < current.open;
          const color = isBearish ? colorRed : colorGreen;

          const wickPercentToTop =
            ((high - current.high) / overallHighLowDiff) * 100;
          const wickPercentToBottom =
            ((low - current.low) / overallHighLowDiff) * 100;
          const wickPercentHeight = wickPercentToTop - wickPercentToBottom;

          const topOpenOrClose = isBearish ? current.close : current.open;
          const bottomOpenOrClose = isBearish ? current.open : current.close;
          const bodyPercentToTop =
            ((high - topOpenOrClose) / overallHighLowDiff) * 100;
          const bodyPercentToBottom =
            ((low - bottomOpenOrClose) / overallHighLowDiff) * 100;
          const bodyPercentHeight = bodyPercentToTop - bodyPercentToBottom;

          return (
            <div className={`${componentName}-candle`} key={current.time}>
              <div
                className={`${componentName}-candle__inner`}
                style={{
                  width: `${widthPercentBody}%`,
                }}
              >
                <div
                  className={classnames(
                    `${componentName}-candle__part`,
                    `${componentName}-candle__part--wick`,
                  )}
                  style={{
                    backgroundColor: color,
                    height: `${wickPercentHeight}%`,
                    left: `calc(50% - ${widthWick / 2}px`,
                    top: `${wickPercentToTop}%`,
                    width: `${widthWick}px`,
                  }}
                />
                <div
                  className={classnames(
                    `${componentName}-candle__part`,
                    `${componentName}-candle__part--body`,
                  )}
                  style={{
                    backgroundColor: color,
                    height: `${bodyPercentHeight}%`,
                    top: `${bodyPercentToTop}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </section>
      {/* <section className={`${componentName}__section--bottom`}>
        {candles.map(current => (
          <div className={`${componentName}-volume-block`} />
        ))}
      </section> */}
      {link && (
        <a className={`${componentName}__link`} href={link} target="_blank" rel="noreferrer">
          details
        </a>
      )}
    </div>
  );
};

export default CandleDetailChart;
