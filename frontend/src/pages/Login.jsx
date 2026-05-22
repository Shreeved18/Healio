import React from 'react'

const Login = () => {
  const [state,setstate] = React.useState("Sign Up");
  const [email,setemail] = React.useState("");
  const [password,setpassword] = React.useState("");
  const [name,setname] = React.useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle form submission
  };
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg'>
            <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
            <p>Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment</p>
            {state === "Sign Up" 
            &&
            <div className='w-full'>
              <p>Full Name</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            }
            <div className='w-full'>
              <p>Email</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className='w-full'>
              <p>Password</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button className = "bg-primary  text-white w-full  py-2 px-4 rounded-md text-base" type="submit">{state === "Sign Up" ? "Create Account" : "Login"}</button>
            {state === "Sign Up" ? 
              <p>Already have an account? <span onClick={() => setstate("Login")} className="text-primary underline cursor-pointer">Login here</span></p>
              : <p>Create a new account? <span onClick={() => setstate("Sign Up")} className="text-primary underline cursor-pointer">Click here</span></p>
            }
      </div>
    </form>
  )
}

export default Login
