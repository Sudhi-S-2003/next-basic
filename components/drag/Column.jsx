import { useState } from "react";

function Column({ bg = "bg-slate-500", color = "text-white", title = "Column", lists = [], no, onDropItem }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("drag-item", JSON.stringify(item));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event, dropIndex) => {
    event.preventDefault();
    setIsDraggingOver(false);
    const droppedItem = JSON.parse(event.dataTransfer.getData("drag-item"));
    if (droppedItem.id) {
      onDropItem(droppedItem, no, dropIndex);
    }
  };

  return (
    <div
      className={`min-w-[300px] m-4 p-6 rounded-lg ${bg} ${color} shadow-lg transition-all ${
        isDraggingOver ? "scale-105" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, lists.length)}
    >
      <h2 className="text-xl font-bold mb-3 text-center">{title}</h2>
      {lists.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
          className="text-lg font-semibold p-3 border border-black rounded bg-white text-black m-1 cursor-move hover:bg-gray-200 transition-colors"
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default Column;
