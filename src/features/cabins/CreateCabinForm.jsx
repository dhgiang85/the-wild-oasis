import Input from "../../ui/Input";
import Form from "../../ui/Form.jsx";
import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import {useForm} from "react-hook-form";

import FormRow from "../../ui/FormRow.jsx";
import useCreateCabin from "./useCreateCabin.js";
import useEditCabin from "./useEditCabin.js";


function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditingSession = Boolean(editId);
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState
  } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  })
  const errors = formState.errors;

  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditingSession)
      editCabin({newCabinData: {...data, image}, id: editId}, {
        onSuccess: () => {
          // reset()
          onCloseModal?.()
        }
      })
    else
      createCabin({...data, image}, {
        onSuccess: () => {
          reset()
          onCloseModal?.()
        }
      })
  }

  function onError(errors) {
    // console.log(errors)
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {required: "this field is required",}
          )} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input type="number" id="max_capacity" disabled={isWorking} {...register(
          'max_capacity', {
            required: "this is required",
            min: {
              value: 1,
              message: "Maximum capacity is greater than 0"
            }
          })}  />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input type="number" id="regular_price" disabled={isWorking} {...register(
          'regular_price', {
            required: "this field is required",
          })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register(
          'discount', {
            required: "this field is required",
            validate: (value) => {
              const numValue = Number(value);
              const regularPrice = Number(getValues().regular_price);
              return numValue <= regularPrice || "Discount should be smaller than regular price";
            }
          })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register(
          'description', {
            required: "this field is required",
          })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" type="file" disabled={isWorking} accept="image/*" {...register(
          "image", {
            required: isEditingSession ? false : "this field is required",
          }
        )}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}> {isEditingSession ? "Edit cabin" : "Add new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
