/**
 *
 * WaterChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from 'recharts';

import moment from 'moment';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

//function WaterChart({waterSeries}) {
//  return (
//    <div>
//    <LineChart width={700} height={600} data={waterSeries}>
//      <XAxis dataKey="value" />
//      <YAxis type="number" domain={['auto', 'auto']} />
//      <CartesianGrid strokeDasharray="3 3" />
//    <Line type="monotone" dataKey="value" stroke="#8884d8" />
//      <Tooltip />
//      <Legend />
//    </LineChart>
//    </div>
//  );
//}

function WaterChart({waterSeries}) {
  return (
    <div>
<AreaChart width={730} height={250} data={waterSeries}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
    {/*
    <XAxis dataKey="dateTime" domain={['auto', 'auto']} />
  */}
  <XAxis dataKey="dateTime" tickFormatter={timeStr => moment(timeStr).format('MMM Do')} domain={['auto', 'auto']}/>
  <YAxis dataKey="value" domain={['auto', 'auto']}/>
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
</AreaChart>
    </div>
  );
}

WaterChart.propTypes = {};

export default WaterChart;
