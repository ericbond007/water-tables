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
  ResponsiveContainer
} from 'recharts';

import moment from 'moment';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


function timeFormat(tickItem) {
    return moment(tickItem).format('MMM Do YY')
  }

function toolTipFormat(value) {
  let newDate = moment(value).format('MMM Do, HH:mm')

  if (newDate.slice(-5) === '00:00') {
    return moment(value).format('MMM Do YYYY')
  } else {
    return newDate
  }
}

function WaterChart({waterSeries}) {

  return (
    // <ResponsiveContainer width={800}>
    <div>
      <AreaChart
        width={800}
        height={400}
        data={waterSeries}
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
        <XAxis dataKey="dateTime" tickFormatter={timeFormat} domain={['auto', 'auto']}/>
        <YAxis dataKey="value" domain={['auto', 'auto']}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelFormatter={toolTipFormat}/>
        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </div>
    // </ResponsiveContainer>
  );
}

WaterChart.propTypes = {};

export default WaterChart;
