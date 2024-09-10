'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  title: string;
  description: string;
  file: FileList;
}

const NewFireworkForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const [fileName, setFileName] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>('music');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

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
    console.log(data);
  };

  return (
    <div className="container mx-auto px-2 pt-2 flex items-center">
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
        <label>
        Pick a tag:
        <select
            name="selectedTag"
            style={{ color: 'black', backgroundColor: 'white' }}
            value={selectedTag}
            onChange={handleChange}
        >
            <option value="music">music</option>
            <option value="movie">movie</option>
            <option value="other">other</option>
        </select>
        </label>


        <button type="submit" className="mt-8 w-full bg-yellow-200 hover:bg-yellow-100 text-gray-800 font-bold py-2 px-4 rounded">花火を打ち上げる</button>
      </form>
    </div>
  );
};

export default NewFireworkForm;
