"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignInFrom = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://hanabibackenddeploy-production.up.railway.app/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('サインアップに失敗しました');
            }

            const data = await response.json();
            console.log('サインアップ成功:', data);

            router.push('/login')
        } catch (error) {
            console.error('サインアップエラー:', error);
        }
    };

    return (
        <div className="mt-10 mx-auto w-full max-w-sm">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="email" className='block text-sm font-medium'>
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"  // idをemailに修正
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className='block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black'
                    />
                </div>
                <button
                    type="submit"
                    className='mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 font-semibold shadow-sm'
                >
                    Sign up
                </button>
            </form>
        </div>
    );
}

export default SignInFrom;
