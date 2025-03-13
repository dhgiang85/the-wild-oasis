import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getAllCabins} from "../../services/apiCarbins.js";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow-v2.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

function CabinTable() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins
  })
  if (isPending) return <Spinner/>;
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
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}/>
      </Table>
    </Menus>
  );
}

export default CabinTable;