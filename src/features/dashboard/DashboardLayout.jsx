import styled from "styled-components";
import React from 'react';
import useRecentBookings from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import useRecentStays from "./useRecentStays.js";
import useCabins from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {bookings, isLoading} = useRecentBookings();
  const {confirmedStays, isLoading: isLoading2, numDays} = useRecentStays();
  const {cabins, isLoading: isLoading3} = useCabins()
  if (isLoading || isLoading2 || isLoading3) return <Spinner/>;
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} numCabins={cabins.length}/>
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart numDays={numDays} bookings={bookings}/>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;