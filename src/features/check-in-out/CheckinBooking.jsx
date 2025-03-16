import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox.jsx";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";

import {useMoveBack} from "../../hooks/useMoveBack.js";
import useBooking from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import Checkbox from "../../ui/Checkbox.jsx";
import {formatCurrency} from "../../utils/helpers.js";
import {useEffect, useState} from "react";
import useCheckin from "./useCheckin.js";
import useSettings from "../settings/useSetting.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const {booking, isLoading} = useBooking();
  const {checkin, isChecking} = useCheckin();
  const {settings, isLoading: isSettingLoading} = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid ?? false);
  }, [booking]);

  if (isLoading || isSettingLoading) return <Spinner/>;
  const {
    id: bookingId,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;

  const {breakfast_price} = settings;
  const optionalBreakfastPrice = num_guests * num_nights * breakfast_price;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (!addBreakfast) {
      checkin({bookingId, breakfast: {}})
    } else {
      checkin({
        bookingId, breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: total_price + optionalBreakfastPrice,
        }
      })
    }
  }


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking}/>
      {!has_breakfast && <Checkbox
        checked={addBreakfast}
        onChange={() => {
          setAddBreakfast((add) => !add);
          setConfirmPaid(false);
        }}
      >
        Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
      </Checkbox>}
      <Checkbox
        checked={confirmPaid}
        disabled={confirmPaid}
        onChange={() => {
          setConfirmPaid((confirm) => !confirm)
        }}
      >I confirm that {guests.full_name} has paid the total amount of {' '}
        {
          !addBreakfast
            ? `${formatCurrency(total_price)}`
            : `${formatCurrency(total_price + optionalBreakfastPrice)} (${formatCurrency(total_price)} + ${formatCurrency(optionalBreakfastPrice)})`
        }
      </Checkbox>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isChecking || !confirmPaid}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
