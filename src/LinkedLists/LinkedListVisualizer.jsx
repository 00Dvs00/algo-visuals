
import VisualNode from './VisualNode';

const LinkedListVisualizer = ({ list, highlightNodes = [], pointers = {} }) => {
  const renderList = () => { 
    const nodes = [];
    let current = list;
    let index = 0;
    
    while (current) {
      const isHighlighted = highlightNodes.includes(index);
      const label = Object.keys(pointers).find(key => pointers[key] === index);
      
      nodes.push(
        <VisualNode
          key={index}
          value={current.val}
          showArrow={current.next !== null}
          highlight={isHighlighted}
          label={label}
          arrowDirection={''}
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
