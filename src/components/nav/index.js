import { Link } from "react-router-dom";
import "./nav.css";
import { useUser } from "../../UserContext";
import PageNotFound from "../../page/PageNotFound";
function Nav() {
  const { user } = useUser();
  if (user === null) {
    return <div></div>;
  } else
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/coursePage">Khóa học</Link>
          </li>
          {/* <li>
            <Link to='/courseProgress'>Course Progress</Link>
          </li>
          <li>
            <Link to='/learning'>Learning</Link>
          </li>
          <li>
            <Link to='/practice'>Pratice</Link>
          </li> */}
          <li>
            <Link to="/settings">Hồ sơ</Link>
          </li>
        </ul>
      </nav>
    );
}

export default Nav;
