import { useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Fragment>{children}</Fragment>;
}

export default ScrollToTop;
