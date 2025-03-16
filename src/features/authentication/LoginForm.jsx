import {useState} from "react";
import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical.jsx";
import useLogin from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isLogin} = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    login({email, password}, {
      onSettled: () => {
        setEmail("");
        setPassword("");
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLogin}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLogin}

          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLogin ? <SpinnerMini/> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
