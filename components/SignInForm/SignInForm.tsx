const SignInFrom = () => {
    return (
        <div className="mt-10 mx-auto w-full max-w-sm border-">
            <form action="">
                <div>
                    <label htmlFor="emailORname" className='block text-sm font-medium'>
                        Email or Name
                    </label>
                    <input type="text" id="emailORname" name="abc@def.com" required className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300" />
                </div>
                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <input type="text" id="password" name="abc@def.com" required className='block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300' />
                </div>
                <button type="submit" className='mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 font-semibold shadow-sm'>
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default SignInFrom;