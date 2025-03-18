import React from 'react';
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";
import useCabins from "./useCabins.js";
import Empty from "../../ui/Empty.jsx";

function CabinTable() {
  const {isLoading, cabins} = useCabins()
  const [searchParam] = useSearchParams()

  if (isLoading) return <Spinner/>;
  // if(!cabins) return <Empty resource="cabins" />;
  const filterValue = searchParam.get("discount") || "all";
  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount") filterCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === "with-discount") filterCabins = cabins.filter(cabin => cabin.discount > 0);

  const sortByValue = searchParam.get("sortBy") || "";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}/>
      </Table>
    </Menus>
  );
}

export default CabinTable;