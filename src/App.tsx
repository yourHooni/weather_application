
import { Fragment } from 'react';
import { RecoilRoot } from 'recoil';

/* Styles */
import GlobalStyle from 'styles/global-style'

/* Layouts */
import PageLayout from 'layouts/PageLayout'

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <RecoilRoot>
        <PageLayout />
      </RecoilRoot>
    </Fragment>
  );
}

export default App;