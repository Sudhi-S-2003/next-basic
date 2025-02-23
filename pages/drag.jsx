import { useState } from "react";
import ListStore from "../components/data/ListStore";
import Column from "../components/drag/Column";

function Page() {
  const [lists, setLists] = useState(ListStore);
  const [taskTitle, setTaskTitle] = useState("");

  const addHandler = () => {
    if (!taskTitle.trim()) return;
    setLists([
      ...lists,
      {
        id: lists.length + 1,
        title: taskTitle,
        column: 1,
        columnIndex: Math.max(0, ...lists.filter((item) => item.column === 1).map((item) => item.columnIndex)) + 1,
      },
    ]);
    setTaskTitle("");
  };

  const handleDropItem = (item, newColumn, dropIndex) => {
    setLists((prevLists) => {
      const filteredLists = prevLists.filter((listItem) => listItem.id !== item.id);

      let reindexedSourceColumn = filteredLists;
      if (item.column !== newColumn) {
        reindexedSourceColumn = filteredLists.map((listItem) => {
          if (listItem.column === item.column && listItem.columnIndex > item.columnIndex) {
            return { ...listItem, columnIndex: listItem.columnIndex - 1 };
          }
          return listItem;
        });
      }

      let updatedColumnItems = reindexedSourceColumn.filter((listItem) => listItem.column === newColumn);
      
      if (item.column === newColumn) {
        updatedColumnItems = updatedColumnItems.map((listItem) => {
          if (listItem.columnIndex >= dropIndex && listItem.columnIndex < item.columnIndex) {
            return { ...listItem, columnIndex: listItem.columnIndex + 1 };
          } else if (listItem.columnIndex <= dropIndex && listItem.columnIndex > item.columnIndex) {
            return { ...listItem, columnIndex: listItem.columnIndex - 1 };
          }
          return listItem;
        });
      } else {
        updatedColumnItems = updatedColumnItems.map((listItem) => ({
          ...listItem,
          columnIndex: listItem.columnIndex >= dropIndex ? listItem.columnIndex + 1 : listItem.columnIndex,
        }));
      }

      const newItem = { ...item, column: newColumn, columnIndex: dropIndex };
      return [...reindexedSourceColumn.filter((listItem) => listItem.column !== newColumn), ...updatedColumnItems, newItem];
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-center space-x-6">
        <Column
          bg="bg-red-500"
          color="text-white"
          title="To Do"
          lists={lists.filter((obj) => obj.column === 1).sort((a, b) => a.columnIndex - b.columnIndex)}
          no={1}
          onDropItem={handleDropItem}
        />
        <Column
          bg="bg-blue-500"
          color="text-black"
          title="In Progress"
          lists={lists.filter((obj) => obj.column === 2).sort((a, b) => a.columnIndex - b.columnIndex)}
          no={2}
          onDropItem={handleDropItem}
        />
        <Column
          bg="bg-green-500"
          color="text-white"
          title="Completed"
          lists={lists.filter((obj) => obj.column === 3).sort((a, b) => a.columnIndex - b.columnIndex)}
          no={3}
          onDropItem={handleDropItem}
        />
      </div>
      <div className="mt-6 flex flex-col items-center">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="p-2 border border-gray-300 rounded-lg w-1/3 shadow-sm focus:ring focus:ring-blue-300 text-black"
        />
        <button
          onClick={addHandler}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Page;

