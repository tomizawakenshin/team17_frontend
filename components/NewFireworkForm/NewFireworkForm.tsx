'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const [fileName, setFileName] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setImageData(e.target.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setFileName("");
    setImageData("");
    reset({ file: undefined });
  };

  const onSubmit = (data: IFormInput) => {
    const formData = {
      ...data,
      tag: selectedCategory,
    };
    console.log(formData);
  };

  return (
    <div>
    <div className="container mx-auto px-5 pt-2 flex items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className='mb-4'>
          <label htmlFor="title" className="block text-sm font-medium">イベント名</label>
          <input type="text" {...register("title", { required: "イベント名は必須です" })} className="mt-1 p-1 w-full border rounded text-black" />  
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">イベント詳細</label>
          <input type="text" {...register("description", { required: "イベント詳細は必須です" })} className="mt-1 p-1 w-full border rounded text-black" /> 
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium">イベント画像</label>
          <input type="file" {...register("file", {
            required: "ファイルを選択してください",
            onChange: onFileChange
          })} accept="image/*" className="mt-1 p-1 w-full border rounded" />
          {imageData && (
            <div className="mt-2">
              <img src={imageData} alt="Preview" className="w-32 h-32 object-cover" />
              <button type="button" onClick={clearFile} className="mt-2 text-red-500">画像を削除</button>
            </div>
          )}
        </div>
        </form>
    </div>
        <div className="max-w-4xl mx-auto px-5">
          <label htmlFor="tag" className="block text-sm font-medium">タグを選択</label>
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

        <div className="flex justify-center items-center mt-8">
        <button type="submit" className="w-80 bg-yellow-200 hover:bg-yellow-100 text-gray-800 font-bold py-2 px-4 rounded">
          花火を打ち上げる
        </button>
      </div>
    </div>
  );
};

export default NewFireworkForm;
