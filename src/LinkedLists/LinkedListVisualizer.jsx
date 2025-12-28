
import VisualNode from './VisualNode';

const LinkedListVisualizer = ({ list, highlightNodes = [], pointers = {}, arrowDirection = 'normal', showArrow = true, showNull = {} }) => {
  const renderList = () => {
    const nodes = [];
    let current = list;
    let index = 0;

    while (current) {
      const isHighlighted = highlightNodes.includes(index);
      const labels = Object.keys(pointers).filter(key => pointers[key] === index);
      const label = labels.length > 0 ? labels.join(', ') : undefined;

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

    const shouldShowNullBox = Object.values(showNull).some(value => value === true);
    if (shouldShowNullBox) {
      const nullLabels = Object.keys(pointers).filter(key => showNull[key] === true);
      
      // Determine if NULL should be on left (for prev) or right (for next/current)
      const showNullOnLeft = showNull.prev === true || showNull.alwaysShow === true;
      const showNullOnRight = showNull.next === true || showNull.current === true;
      
      // Show arrow from NULL only after node 0 has been reversed to point to it
      const shouldShowNullArrow = showNull.showReversedToNull === true;

      const nullNode = (
        <VisualNode
          key="null-node"
          value="NULL"
          isNull={true}
          label={nullLabels.length > 0 ? nullLabels.join(', ') : undefined}
          showArrow={shouldShowNullArrow}
          arrowDirection="reverse"
        />
      );

      // Add NULL to left if prev is null, otherwise to right
      if (showNullOnLeft) {
        nodes.unshift(nullNode);
      } else if (showNullOnRight) {
        nodes.push(nullNode);
      }
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
