import styled from "styled-components";

import BookingDataBox from "./BookingDataBox.jsx";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";

import {useMoveBack} from "../../hooks/useMoveBack.js";
import useBooking from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import {useNavigate} from "react-router-dom";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import useDeleteBooking from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {

  const {booking, isLoading} = useBooking();

  const navigate = useNavigate();
  const {deleteBooking, isDeleting} = useDeleteBooking();
  const moveBack = useMoveBack();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner/>;
  const {status, id: bookingId} = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking}/>

      <ButtonGroup>
        {status === "unconfirmed"
          && <Button onClick={() => navigate(`/checking/${bookingId}`)}>Check in</Button>}
        <Modal>
          <Modal.Open opens={bookingId}>
            <Button variation="danger">
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name={bookingId}>
            <ConfirmDelete
              resourceName="Booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSettled: () => {
                    navigate(-1)
                  }
                })
              }}/>
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>


      </ButtonGroup>

    </>
  );
}

export default BookingDetail;
