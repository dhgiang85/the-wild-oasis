import styled from "styled-components";
import {format, isToday} from "date-fns";

import Tag from "../../ui/Tag.jsx";
import Table from "../../ui/Table.jsx";

import {formatCurrency, formatDistanceFromNow} from "../../utils/helpers.js";
import Menus from "../../ui/Menus.jsx";
import {HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout.js";
import useDeleteBooking from "./useDeleteBooking.js";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Modal from "../../ui/Modal.jsx";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
                      booking: {
                        id: bookingId,
                        created_at,
                        start_date,
                        end_date,
                        num_nights,
                        num_guests,
                        total_price,
                        status,
                        guests: {full_name: guestName, email},
                        cabins: {name: cabinName},
                      },
                    }) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const {checkout, isCheckingOut} = useCheckout();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}{" "}
          &rarr; {num_nights} night stay
        </span>
        <span>
          {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(total_price)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId}/>
          <Menus.List id={bookingId}>
            <Menus.Button onClick={() => navigate(`/bookings/${bookingId}`)}><HiEye/>See details</Menus.Button>
            {status === "unconfirmed"
              && <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)}><HiArrowDownOnSquare/>Check
                in</Menus.Button>}
            {status === "checked-in"
              && <Menus.Button
                disabled={isCheckingOut}
                onClick={() => {
                  checkout(bookingId)
                }}>
                <HiArrowUpOnSquare/>Checkout
              </Menus.Button>}

            <Modal.Open opens={bookingId}>
              <Menus.Button>
                <HiTrash/>Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name={bookingId}>
            <ConfirmDelete
              resourceName="Booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId)
              }}/>
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
