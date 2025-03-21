import React from 'react';
import Stat from "./Stat.jsx";
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from "react-icons/hi2";
import {formatCurrency} from "../../utils/helpers.js";

function Stats({bookings, confirmedStays, numDays, numCabins}) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc += cur.total_price, 0)
  const checkins = confirmedStays.length;
  const occupation = confirmedStays.reduce((acc, cur) => acc += cur.num_nights, 0) / (numDays * numCabins)
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase/>}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes/>}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays/>}
        value={checkins}
      />
      <Stat
        title="Check ins"
        color="yellow"
        icon={<HiOutlineChartBar/>}
        value={`${Math.floor(occupation * 100)}%`}
      />
    </>
  );
}

export default Stats;