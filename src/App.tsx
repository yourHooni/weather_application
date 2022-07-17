
import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

/* Styles */
import GlobalStyle from 'styles/global-style'

/* Layouts */
import PageLayout from 'layouts/PageLayout'

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<PageLayout />} />
        <Route path="*" element={<div>no math</div>} />
      </Routes>
    </Fragment>
  );
}

export default App;