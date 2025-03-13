import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getAllCabins} from "../../services/apiCarbins.js";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";

function CabinTable() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins
  })
  const [searchParam] = useSearchParams()

  if (isPending) return <Spinner/>;
  const filterValue = searchParam.get("discount") || "all";
  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount") filterCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === "with-discount") filterCabins = cabins.filter(cabin => cabin.discount > 0);
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
          data={filterCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}/>
      </Table>
    </Menus>
  );
}

export default CabinTable;