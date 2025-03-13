import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Row from "../../ui/Row.jsx";
import useDeleteCabin from "./useDeleteCabin.js";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {
  const {
    id,
    name,
    image,
    description,
    max_capacity,
    regular_price,
    discount
  } = cabin;
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const {createCabin} = useCreateCabin();

  function handleDuplicateCabin() {
    createCabin({
      name: `copy of ${cabin.name}`,
      description,
      max_capacity,
      regular_price,
      image,
      discount,
    })
  }

  return (
    <>
      <Table.Row role="role">
        <Img src={image}/>
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity}</div>
        <Price>{formatCurrency(regular_price)}</Price>
        {discount ? (<Discount>{formatCurrency(discount)}</Discount>) : (<span>&mdash;</span>)}

        <Row type="horizontal">


          <Modal>

            <Menus.Menu>
              <Menus.Toggle id={cabin.id}/>
              <Menus.List id={cabin.id}>
                <Menus.Button onClick={handleDuplicateCabin}><HiSquare2Stack/> Duplicate</Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button><HiPencil/>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button><HiTrash/>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="delete">
              <ConfirmDelete resourceName="cabin"
                             disabled={isDeleting}
                             onConfirm={() => deleteCabin(id)}/>
            </Modal.Window>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} isEditingSession={id}/>
            </Modal.Window>
          </Modal>

        </Row>


      </Table.Row>

    </>

  );
}

export default CabinRow;