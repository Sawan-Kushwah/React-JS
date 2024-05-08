import { useForm } from "react-hook-form"

import './App.css'

function App() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000)

    }
    )
  }

  const onSubmit = async (data) => {
    // await delay(2);
    let response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    let res = await response.text();
    console.log(data, res);
  }

  return (
    <>
      {isSubmitting && <div>Loading...</div>}
      <div className="container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Username" className="input" {...register("username", { required: true, maxLength: { value: 15, message: "maxLength is 15" } })} />
          {errors.username && <div>{errors.username.message}</div>}
          <br />
          <input type="password" placeholder="Password" className="input" {...register("password", { required: true, minLength: { value: 7, message: "Password length is 7" } })} />
          {errors.password && <div>{errors.password.message}</div>}
          <br />
          <button disabled={isSubmitting} >Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
