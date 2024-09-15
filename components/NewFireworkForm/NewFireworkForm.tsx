"use client";

import { useRouter } from 'next/navigation'; // useRouter フックをインポート
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import classNames from 'classnames';

interface IFormInput {
  title: string;
  description: string;
  file: FileList;
  tag: string;
}

const getColor = (category: string) => {
  switch (category) {
    case 'music': return 'red';
    case 'movie': return 'blue';
    case 'comedy': return 'purple';
    case 'art': return 'yellow';
    case 'hackathon': return 'green';
    case 'other': return 'orange';
    default: return 'gray';
  }
};

const NewFireworkForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const [imageData, setImageData] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("music");
  const router = useRouter(); // useRouterフックの初期化

  useEffect(() => {
    // トークンが存在しない場合にログイン画面に遷移
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login'); // トークンがない場合はログインページにリダイレクト
    }
  }, [router]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => setImageData(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setImageData("");
    reset({ file: undefined });
  };

  const onSubmit = async (data: IFormInput) => {
    const token = localStorage.getItem("token"); // localStorageからJWTトークンを取得
    if (!token) {
      return;
    }

    const formData = new FormData();
    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("file", data.file[0]); // 画像ファイルを追加
    formData.append("tag", selectedCategory);

    try {
      const response = await fetch("https://hanabibackenddeploy-production.up.railway.app/hanabi/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // AuthorizationヘッダーにJWTトークンを設定
        },
        body: formData, // マルチパート形式でデータを送信
      });

      if (!response.ok) {
        throw new Error("花火の作成に失敗しました。");
      }

      const result = await response.json();

      router.push("/home1")
      reset(); // フォームのリセット
      clearFile(); // ファイルのクリア

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-5 pt-2 flex items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className='mb-6 mt-8'>
            <label htmlFor="title" className="block text-sm font-medium mb-1">イベント名</label>
            <input type="text" {...register("title", { required: "イベント名は必須です" })} className="mt-1 p-1 w-full border rounded text-black" />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-1">イベント詳細</label>
            <input type="text" {...register("description", { required: "イベント詳細は必須です" })} className="mt-1 p-1 w-full border rounded text-black" />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>

          <div className="mb-6">
            <label htmlFor="file" className="block text-sm font-medium mb-1">イベント画像</label>

            {/* 隠されたファイル入力要素 */}
            <input
              type="file"
              id="file"
              {...register("file", {
                required: "ファイルを選択してください",
                onChange: onFileChange,
              })}
              accept="image/*"
              className="hidden"  // ここでinputを隠します
            />

            {/* カスタムボタン */}
            <label htmlFor="file" className="cursor-pointer inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              コンピューターから選択
            </label>

            {imageData && (
              <div className="mt-2">
                <img src={imageData} alt="Preview" className="w-32 h-32 object-cover" />
                <button type="button" onClick={clearFile} className="mt-2 text-red-500">画像を削除</button>
              </div>
            )}
            {errors.file && <span className="text-red-500">{errors.file.message}</span>}
          </div>
        </form>
      </div>

      <div className="max-w-4xl mx-auto px-10">
        <label htmlFor="tag" className="block text-sm font-medium mb-2">タグを選択</label>
        <div className="flex space-x-2">
          <div className="flex overflow-x-auto space-x-4 no-scrollbar">
            {['music', 'movie', 'comedy', 'art', 'hackathon', 'other'].map(category => (
              <button
                key={category}
                type="button"
                className={classNames(
                  'px-2 py-1 rounded-lg',
                  selectedCategory === category
                    ? `bg-${getColor(category)}-500 text-white`
                    : 'bg-gray-200'
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full"> {/* handleSubmitを使用 */}
        <div className="flex justify-center items-center mt-16">
          <button type="submit" className="w-80 bg-yellow-200 hover:bg-yellow-100 text-gray-800 font-bold py-2 px-4 rounded">
            花火を打ち上げる
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewFireworkForm;
