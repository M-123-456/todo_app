import React from "react";

type Props = {
    type: string,
    content: string,
    value: string,
    onChange: (e:React.FormEvent<HTMLInputElement>) => void;
}

const AuthInput: React.FC<Props> = ({ type, content, value, onChange }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={content} className="font-medium">
        {`${content[0].toUpperCase()}${content.slice(1)}`}
      </label>
      <input
        className="block border border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        type={type}
        id={content}
        name={content}
        placeholder={`Enter your ${content}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default AuthInput