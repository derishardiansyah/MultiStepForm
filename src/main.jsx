/* eslint-disable import/order */
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { store, persistor } from './redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import Multi from '@pages/Multi';
import './styles/multi/app.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ChakraProvider>
        <Language>
          <BrowserRouter>
            <div className="App" id="App">
              <Multi />
            </div>
          </BrowserRouter>
        </Language>
      </ChakraProvider>
    </PersistGate>
  </Provider>
);
