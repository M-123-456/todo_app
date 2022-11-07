import OverviewItem from "../components/OverviewItem";

type Props = {};

const DUMMY_TODOLIST = [
  {
    _id: "1",
    title: "My first todolist",
  },
  {
    _id: "2",
    title: "My second todolist",
  },
  {
    _id: "3",
    title: "My third todolist",
  },
  {
    _id: "4",
    title: "My forth todolist",
  },
];

const Overview = (props: Props) => {
  return (
    <div>
      {/* List Group with badges */}
      <ul className="mt-4 border border-gray-200 rounded bg-white divide-y divide-gray-200">
        {DUMMY_TODOLIST.map((item) => (
          <OverviewItem key={item._id} title={item.title} id={item._id} />
        ))}
      </ul>
      {/* END List Group with badges */}
    </div>
  );
};

export default Overview;
