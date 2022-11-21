import { BsCheck2Circle } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import IconButton from "./ui/buttons/IconButton";

type Props = {
  todo: string;
  id: string;
  isComplete: boolean;
};

const TodolistItem: React.FC<Props> = ({ todo, id, isComplete }) => {
  return (
    <li className="p-4 flex justify-between items-center">
      <span className=" text-lg">{todo}</span>
      <span className="flex justify-end space-x-2 md:space-x-4  mr-2">
        <IconButton size="text-2xl" color="text-red-800">
          <BsTrash />
        </IconButton>
        <IconButton size="text-2xl" color="text-green-800">
          <BsCheck2Circle />
        </IconButton>
      </span>
    </li>
  );
};

export default TodolistItem;
