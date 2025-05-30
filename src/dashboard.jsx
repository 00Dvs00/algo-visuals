import { Link } from "react-router-dom";

function Dashboard(){
  return(
    <div>
      <Link to={"/LinkedList"}>LinkedList</Link>
    </div>
  );
}

export default Dashboard 