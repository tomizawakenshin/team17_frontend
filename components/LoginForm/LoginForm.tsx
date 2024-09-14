"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(''); // エラーメッセージをリセット
        setSuccessMessage(''); // 成功メッセージをリセット

        if (formData.password.length < 8) {
            setErrorMessage('パスワードは8文字以上で入力してください');
            return;
        }

        try {
            const response = await fetch('https://hanabibackenddeploy-production.up.railway.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('ログインに失敗しました');
            }

            const data = await response.json();
            console.log('ログイン成功:', data);

            // JWTトークンをlocalStorageに保存
            localStorage.setItem('token', data.token);
            setSuccessMessage('ログイン成功しました！');

            router.push('/home1');
        } catch (error) {
            console.error('ログインエラー:', error);
            setErrorMessage('ログインに失敗しました。もう一度お試しください。');
        }
    };

    // SignUpボタンのクリックで呼ばれる関数
    const handleSignUp = () => {
        router.push('/signin');  // サインアップページにリダイレクト
    };

    return (
        <div className="mt-20 mx-auto w-full max-w-sm p-2">
            <form onSubmit={handleSubmit} className="space-y-6 p-2">
                <div>
                    <label htmlFor="email" className='block text-sm font-medium'>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        className='block mt-2 mb-8 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 text-black'
                    />
                </div>
                {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>}
                {successMessage && <p className="mt-2 text-green-600">{successMessage}</p>}
                <button
                    type="submit"
                    className='mt-10 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 font-semibold shadow-sm'
                >
                    Log In
                </button>
            </form>

            <div className="relative mt-8 flex items-center px-2">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <button
                onClick={handleSignUp}
                className='mt-10 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 font-semibold shadow-sm p-4'>
                SignUp
            </button>
        </div>
    );
};

export default LoginForm;
