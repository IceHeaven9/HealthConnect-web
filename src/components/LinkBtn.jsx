import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const LinkBtn = ({ children, to, className }) => {
  return (
    <>
      <Link to={to} className={className}>
        {children}
      </Link>
    </>
  );
};

LinkBtn.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};
