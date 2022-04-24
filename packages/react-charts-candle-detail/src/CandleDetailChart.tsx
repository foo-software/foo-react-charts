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

    // shouldn't have to do this, but with some data providers
    // the open or close is higher or lower than the high or low
    if (candle.open < low) {
      low = candle.open;
    }
    if (candle.close < low) {
      low = candle.close;
    }

    if (!high || candle.high > high) {
      high = candle.high;
    }

    // shouldn't have to do this either
    if (candle.open > high) {
      high = candle.open;
    }
    if (candle.close > high) {
      high = candle.close;
    }

    if (!highestVolume || candle.volume > highestVolume) {
      highestVolume = candle.volume;
    }
  }

  const percentWidth = 100 / candles.length;
  const overallHighLowDiff = high - low;
  const date = new Date(candles[0].time).toLocaleDateString();
  const timeframeStart = new Date(candles[0].time).toLocaleTimeString();
  const timeframeEnd = new Date(candles[2].time).toLocaleTimeString();

  return (
    <div
      className={classnames(className, componentName, {
        [`${componentName}--clickable`]: !!link,
      })}
      onClick={!link ? undefined : () => window.open(link, '_blank')}
    >
      <header className={`${componentName}__header-container`}>
        <h2 className={`${componentName}__header`}>{assetSymbol}</h2>
        <h3 className={`${componentName}__subheader`}>{date}</h3>
        <h3 className={`${componentName}__subheader`}>
          {timeframeStart} - {timeframeEnd}
        </h3>
      </header>
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

            const bodyTop = isBearish ? current.open : current.close;
            const bodyBottom = isBearish ? current.close : current.open;
            const bodyPercentToTop =
              ((high - bodyTop) / overallHighLowDiff) * 100;
            const bodyPercentHeight =
              ((bodyTop - bodyBottom) / overallHighLowDiff) * 100;

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
    </div>
  );
};

export default CandleDetailChart;
