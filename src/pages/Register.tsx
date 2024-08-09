import images from "/assets/download16.png";

const Register = () => {
  return (
    <div className="flex p-2 h-screen font-poppins">
      <div className="max-h-screen w-[50vw] max-sm:hidden">
        <img
          src={images}
          className="h-full object-cover rounded-xl"
          alt="images"
        />
      </div>
      <div className="flex  flex-col items-center w-[50vw] max-h-screen p-20 max-sm:w-screen">
        <h1 className=" text-3xl text-green-600">Welcome Back!</h1>
        <form className="flex flex-col gap-4 my-10 w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="names"
            className="border border-slate-400 px-4 rounded-sm py-1"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="border border-slate-400 px-4 rounded-sm py-1"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="border border-slate-400 px-4 rounded-sm py-1"
          />
          <span></span>
          <button className="bg-green-700 text-white py-2 rounded-sm hover:bg-green-900">
            Create Account
          </button>
        </form>
        <div className="flex gap-2 max-sm:flex-wrap">
          <p className="text-gray-500 text-sm">Already Have An Account?</p>
          <span className="text-blue-700 text-sm underline hover:cursor-pointer">
            Sign In{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
