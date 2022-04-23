import React from 'react';
import classnames from 'classnames';

interface CandlePropsInterface {
  close: number;
  high: number;
  low: number;
  open: number;
  time: string;
  volume: number;
}

interface CandleDetailChartPropsInterface {
  assetSymbol: string;
  candles: CandlePropsInterface[];
  className?: string;
  colorGreen?: string;
  colorRed?: string;
  heightChart?: string;
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
  heightChart = '360px',
  link,
  widthPercentBody = 20,
  widthWick = 2,
}: CandleDetailChartPropsInterface) => {
  let high = 0;
  let highestVolume = 0;
  let low = 0;

  for (const candle of candles) {
    if (!low || candle.low < low) {
      low = candle.low;
    }
    if (!high || candle.high > high) {
      high = candle.high;
    }
    if (!highestVolume || candle.volume > highestVolume) {
      highestVolume = candle.volume;
    }
  }

  const percentWidth = 100 / candles.length;
  const overallHighLowDiff = high - low;

  return (
    <div className={classnames(className, componentName)}>
      <h2 className={`${componentName}__header`}>{assetSymbol}</h2>
      <div
        className={`${componentName}__charts`}
        style={{
          height: heightChart,
        }}
      >
        <section
          className={classnames(
            `${componentName}__section`,
            `${componentName}__section--top`,
          )}
        >
          {candles.map((current) => {
            const isBearish = current.close < current.open;
            const color = isBearish ? colorRed : colorGreen;

            const wickPercentToTop =
              ((high - current.high) / overallHighLowDiff) * 100;
            const wickPercentHeight =
              ((current.high - current.low) / overallHighLowDiff) * 100;

            const topOpenOrClose = isBearish ? current.open : current.close;
            const bottomOpenOrClose = isBearish ? current.close : current.open;
            const bodyPercentToTop =
              ((high - topOpenOrClose) / overallHighLowDiff) * 100;
            const bodyPercentHeight =
              ((topOpenOrClose - bottomOpenOrClose) / overallHighLowDiff) * 100;

            return (
              <div
                className={`${componentName}-candle`}
                key={`candle-${assetSymbol}-${current.time}`}
                style={{
                  flexBasis: `${percentWidth}%`,
                }}
              >
                <div
                  className={`${componentName}-candle__inner`}
                  style={{
                    width: `${widthPercentBody}%`,
                  }}
                >
                  <div
                    className={classnames(
                      `${componentName}__part`,
                      `${componentName}__part--wick`,
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
                      `${componentName}__part`,
                      `${componentName}__part--body`,
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
        <section
          className={classnames(
            `${componentName}__section`,
            `${componentName}__section--bottom`,
          )}
        >
          {candles.map((current) => {
            const isBearish = current.close < current.open;
            const color = isBearish ? colorRed : colorGreen;

            const volumePercentToTop =
              ((highestVolume - current.volume) / highestVolume) * 100;
            const volumePercentHeight = 100 - volumePercentToTop;

            return (
              <div
                className={`${componentName}-bar`}
                key={`bars-${assetSymbol}-${current.time}`}
                style={{
                  flexBasis: `${percentWidth}%`,
                }}
              >
                <div
                  className={`${componentName}-bar__inner`}
                  style={{
                    width: `${widthPercentBody}%`,
                  }}
                >
                  <div
                    className={classnames(
                      `${componentName}__part`,
                      `${componentName}__part--bar`,
                    )}
                    style={{
                      backgroundColor: color,
                      height: `${volumePercentHeight}%`,
                      top: `${volumePercentToTop}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>
      {link && (
        <a
          className={`${componentName}__link`}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          details
        </a>
      )}
    </div>
  );
};

export default CandleDetailChart;
