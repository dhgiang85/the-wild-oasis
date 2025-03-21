import {useState} from "react";

import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser.js";
import useUpdateUser from "./useUpdateUser.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";


function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email = "",
      user_metadata: {fullName: currentFullName},
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const {updateUser, isLoading} = useUpdateUser()

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({fullName, avatar}, {
      onSettled: () => {
        e.target.reset();
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled/>
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isLoading}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isLoading}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>{isLoading ? <SpinnerMini/> : 'Update account'}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
