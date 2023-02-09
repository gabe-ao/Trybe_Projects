import React from 'react';
import { render } from '@testing-library/react';
import StarContextProvider from '../../context/StarContextProvider';

export const renderWithReactAndContext = (component) => {
  return render(
      <StarContextProvider>
        {component}
      </StarContextProvider>
    );
}

export default renderWithReactAndContext;
