import { Link } from "react-router-dom";

type Props = {
  title: string;
  id: string;
};

const OverviewItem: React.FC<Props> = ({ title, id }) => {
  return (
    <li className="p-4 flex justify-between items-center">
      <Link to={`/todolist/${id}`}>
        <span className="text-lg font-semibold">{title}</span>
      </Link>
    </li>
  );
};

export default OverviewItem;
