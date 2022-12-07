import { Link } from "react-router-dom";
import "./AuthorItem.css";
const AuthorItem = (props) => {
  const {
    id,
    name,
    work_count,
    birth_date = "",
    top_work = "",
    death_date = "",
    top_subjects = [],
  } = props;
  const imgSrc = `https://covers.openlibrary.org/a/olid/${id}-M.jpg`;
  const linkSrc = `/work/${id}`;
  return (
    <div className="authorItem" key={id}>
      <div className="authorInfoContainer">
        <img src={imgSrc} className="authorImage" />
        <div className="authorInfo">
          <Link to={linkSrc} state={{ top_subjects }}>
            <span className="authorName">{name} </span>
          </Link>
          {birth_date && <span>{birth_date} </span>}
          {death_date && <span>-{death_date}</span>}
          <p>
            <span className="numberOfBooks">{work_count} books </span> about{" "}
            <span> </span>
            {top_subjects && top_subjects.map((element) => element).join(", ")}
            <span> including </span>
            {top_work}
          </p>
        </div>
      </div>
    </div>
  );
};
export default AuthorItem;
