
import VisualNode from './VisualNode';

const LinkedListVisualizer = ({ list, highlightNodes = [], pointers = {}, arrowDirection = 'normal', showArrow = true }) => {
  const renderList = () => {
    const nodes = [];
    let current = list;
    let index = 0;

    while (current) {
      const isHighlighted = highlightNodes.includes(index);
      const label = Object.keys(pointers).find(key => pointers[key] === index);
    
      const nodeArrowDirection = Array.isArray(arrowDirection) 
          ? arrowDirection[index] || 'normal'
          : arrowDirection;

      const shouldShowArrow = Array.isArray(showArrow) 
        ? (showArrow[index] !== false && current.next !== null)
        : (showArrow !== false && current.next !== null);

      nodes.push(
        <VisualNode
          key={index}
          value={current.val}
          showArrow={shouldShowArrow}
          highlight={isHighlighted}
          label={label}
          arrowDirection={nodeArrowDirection}
        />
      );

      current = current.next;
      index++;
    }

    return nodes;
  };

  return (
    <div className="flex items-center flex-wrap my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-sm min-h-24">
      {list ? renderList() : (
        <div className="text-gray-500 text-lg">Empty List</div>
      )}
    </div>
  );
};

export default LinkedListVisualizer;
