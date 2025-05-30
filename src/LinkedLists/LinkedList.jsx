import { Link } from "react-router-dom";
function LinkedList(){
  return(
    <>
      <Link to={"/LinkedList/palindromeOfAList"}>Palindrome of a Linked List</Link>
      <br />
      <Link to={"/LinkedList/mergeKLinkedList"}>Merge K Linked List</Link>
    </>
  );
}

export default LinkedList
