import TodoItem from "../../components/listItem/TodoItem";
import useStore from "../../store";

type Props = {};

const DUMMY_TODOS = [
  {
    _id: "1",
    todo: "Wash dishes",
    isComplete: false,
  },
  {
    _id: "2",
    todo: "Clean windows",
    isComplete: false,
  },
  {
    _id: "3",
    todo: "Grocery shopping",
    isComplete: false,
  },
  {
    _id: "4",
    todo: "Preparation for summer vacation",
    isComplete: false,
  },
];

const SingleTodolist = (props: Props) => {
  const user = useStore(state => state.user)
  console.log(user)

  return (
    <div>
      {/* List Group with badges */}
      <ul className="mt-4 border border-gray-200 rounded bg-white divide-y divide-gray-200">
        {DUMMY_TODOS.map((item) => (
          <TodoItem key={item._id} todo={item.todo} id={item._id} isComplete={item.isComplete}/>
        ))}
      </ul>
      {/* END List Group with badges */}
    </div>
  );
};

export default SingleTodolist;
