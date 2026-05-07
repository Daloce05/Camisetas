const AuthButtons = () => {
  return (
    <div className="py-2 flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 w-full">
      <button className="btn btn-neutral btn-outline w-full lg:w-auto">crear cuenta</button>
      <div className="hidden lg:block">|</div>
      <button className="btn bg-neutral btn-outline w-full lg:w-auto">iniciar sesión</button>
    </div>
  )
}
export default AuthButtons