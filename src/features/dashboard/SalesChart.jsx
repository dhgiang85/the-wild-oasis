import styled from "styled-components";
import DashboardBox from "./DashboardBox.jsx";
import React from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Heading from "../../ui/Heading.jsx";
import {useDarkMode} from "../../contexts/DarkModeContext.jsx";
import {eachDayOfInterval, format, isSameDay, subDays} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


function SalesChart({bookings, numDays}) {
  const {isDarkMode} = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  })
  const data = allDates.map((d) => {
    return {
      label: format(d, "MMM dd"),
      totalSales: bookings.filter(b => isSameDay(d, new Date(b.created_at))).reduce((acc, cur) => acc + cur.total_price, 0),
      extrasSales: bookings.filter(b => isSameDay(d, new Date(b.created_at))).reduce((acc, cur) => acc + cur.extras_price, 0),
    }
  })
  const colors = isDarkMode
    ? {
      totalSales: {stroke: "#4f46e5", fill: "#4f46e5"},
      extrasSales: {stroke: "#22c55e", fill: "#22c55e"},
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalSales: {stroke: "#4f46e5", fill: "#c7d2fe"},
      extrasSales: {stroke: "#16a34a", fill: "#dcfce7"},
      text: "#374151",
      background: "#fff",
    };
  return (
    <StyledSalesChart>
      <Heading as="h2">Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash; {format(allDates.at(-1), 'MMM dd yyyy')}</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="label" tick={{fill: colors.text}} tickLine={{stroke: colors.text}}/>
          <YAxis unit="$" tick={{fill: colors.text}} tickLine={{stroke: colors.text}}/>
          <CartesianGrid strokeDasharray={4}/>
          <Tooltip contentStyle={{backgroundColor: colors.background}}/>
          <Area type="monotone" dataKey="totalSales" fill={colors.totalSales.fill} stroke={colors.totalSales.stroke}
                strokeWidth={2} unit="$" name="total sales"/>
          <Area type="monotone" dataKey="extrasSales" fill={colors.extrasSales.fill}
                stroke={colors.extrasSales.stroke} unit="$" name="extra sales"
                strokeWidth={2}/>
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;