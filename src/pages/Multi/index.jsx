import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { selectTheme } from '@containers/App/selectors';
import { setTheme } from '@containers/App/actions';
import {
  Card,
  CardBody,
  ChakraProvider,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  extendTheme,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Step1 from '@components/Step1';
import Sidebar from '@components/Sidebar';
import Step2 from '@components/Step2';
import Step3 from '@components/Step3';
import Step4 from '@components/step4';
import LastStep from '@components/LastStep';
import idFlag from '@static/images/id.svg';
import usFlag from '@static/images/us.svg';
import '@components/i18n';

const Multi = ({ theme }) => {
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    const app = document.getElementById('App');
    app.className = theme === 'light' ? 'App' : 'AppDark';
  };

  const myTheme = extendTheme({
    palette: {
      background: {
        default: theme === 'light' ? 'hsl(207, 26%, 17%)' : 'hsl(0, 0%, 98%)',
        paper: theme === 'light' ? 'hsl(237, 14%, 26%)' : 'hsl(0, 0%, 98%)',
      },
      text: {
        primary: theme === 'light' ? 'hsl(241, 19%, 90%)' : 'hsl(200, 15%, 8%)',
      },
    },
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const storedStep = localStorage.getItem('currentStep');
    return storedStep ? parseInt(storedStep, 10) : 1;
  });
  useEffect(() => {
    localStorage.setItem('currentStep', currentStep.toString());
  }, [currentStep]);
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleBackStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleBackStep1 = () => {
    setCurrentStep(1);
  };

  const handleBackStep2 = () => {
    setCurrentStep((prevStep) => prevStep - 2);
  };

  return (
    <ChakraProvider theme={myTheme}>
      <Card className={theme === 'light' ? 'form-card-Dark' : 'form-card'}>
        <CardBody className={theme === 'light' ? 'form-card-body-dark' : 'form-card-body'}>
          <Sidebar currentStep={currentStep} />
          {currentStep === 1 && <Step1 onNextStep={handleNextStep} theme={theme} />}
          {currentStep === 2 && <Step2 onNextStep={handleNextStep} onBackStep={handleBackStep} theme={theme} />}
          {currentStep === 3 && <Step3 onNextStep={handleNextStep} onBackStep={handleBackStep} theme={theme} />}
          {currentStep === 4 && (
            <Step4
              onNextStep={handleNextStep}
              onBackStep={handleBackStep}
              onBackStep2={handleBackStep2}
              theme={theme}
            />
          )}
          {currentStep === 5 && <LastStep onBackStep={handleBackStep1} theme={theme} />}
          <div className="rightFitur">
            <div className="thema">
              <IconButton onClick={handleTheme} style={{ backgroundColor: 'white' }}>
                {theme === 'light' ? (
                  <SunIcon sx={{ fontSize: 26, color: 'black' }} />
                ) : (
                  <MoonIcon sx={{ fontSize: 26, color: 'black' }} />
                )}
              </IconButton>
            </div>
            <div className="language">
              <Menu>
                <MenuButton>
                  {selectedLanguage === 'en' ? (
                    <div className="imgBahasa">
                      <img src={usFlag} alt="English Flag" />
                    </div>
                  ) : (
                    <div className="imgBahasa">
                      <img src={idFlag} alt="Indonesian Flag" />
                    </div>
                  )}
                </MenuButton>
                <MenuList className="list">
                  <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                  <div>
                    <hr />
                  </div>
                  <MenuItem onClick={() => handleLanguageChange('id')}>Indonesia</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </CardBody>
      </Card>
    </ChakraProvider>
  );
};

Multi.propTypes = {
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  theme: selectTheme,
});

export default connect(mapStateToProps)(Multi);
