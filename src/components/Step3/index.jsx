/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button, Card, CardBody, Checkbox, Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { setAddOns } from '../../redux/personalSlice';

const Step3 = ({ onNextStep, onBackStep, theme }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState({});
  const addons = useSelector((state) => state.personal.addons);
  const isAnnualPlan = useSelector((state) => state.personal.isAnnualPlan);
  const isPlanSelected = useSelector((state) => state.personal.selectedPlan !== null);

  const handleCheckboxChange = (title) => {
    setIsChecked((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  useEffect(() => {
    Object.keys(isChecked).forEach((title) => {
      dispatch(setAddOns({ title, isChecked: isChecked[title] }));
    });
  }, [isChecked, dispatch]);

  const handleNextStep = () => {
    if (isPlanSelected && Object.values(isChecked).some((value) => value === true)) {
      onNextStep(); // Proceed to the next step if a plan is selected and at least one addon is checked
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Selection',
        text: 'Please select addon at least one one addon before proceeding to the next step.',
      });
    }
  };

  return (
    <>
      <div className={theme === 'light' ? 'outerDark' : 'outer'} data-testid="Step3">
        <div className={theme === 'light' ? 'form-step-container-Dark' : 'form-step-container'}>
          <div className="nameStep3">
            <div className={theme === 'light' ? 'firstStep3-dark' : 'firstStep3'}>{t('pickaddons')}</div>
            <div className={theme === 'light' ? 'secondStep3-dark' : 'secondStep3'}>{t('captpickaddons')}</div>
          </div>
          <div className="cardOption">
            {Object.keys(addons).map((addonTitle) => (
              <Card width={{ md: '40vw', lg: '40vw', xl: '35vw' }} key={addonTitle}>
                <CardBody>
                  <div className="cardList">
                    <div className="cardWrapper">
                      <Checkbox
                        colorScheme="purple"
                        isChecked={isChecked[addonTitle] || false}
                        onChange={() => handleCheckboxChange(addonTitle)}
                      />
                      <div className="cardName">
                        <Text fontSize="md" style={{ fontWeight: '700' }}>
                          {t(addons[addonTitle].name)}
                        </Text>
                        <Text fontSize="12px" color="grey" fontWeight="500">
                          {t(addons[addonTitle].description)}
                        </Text>
                      </div>
                    </div>
                    <Text>
                      +$
                      {isAnnualPlan
                        ? `${addons[addonTitle].monthCost * 10}/${t('yr')}`
                        : `${addons[addonTitle].monthCost}/${t('mo')}`}
                    </Text>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="button-desktop">
            <Flex
              direction="row"
              justifyContent="space-between"
              width={{ md: '40vw', lg: '40vw', xl: '35vw' }}
              mt="30px"
            >
              <Button style={{ color: theme === 'light' ? 'white' : 'gray' }} variant="ghost" onClick={onBackStep}>
                {t('back')}
              </Button>
              <Button onClick={handleNextStep} data-testid="next-step-button">
                {t('nextstep')}{' '}
              </Button>
            </Flex>
          </div>
        </div>
      </div>
      <div className={theme === 'light' ? 'button-mobile-dark' : 'button-mobile'}>
        <Button style={{ color: theme === 'light' ? 'white' : 'gray' }} variant="ghost" onClick={onBackStep}>
          {t('back')}
        </Button>
        <Button
          bgColor="hsl(217, 100%, 97%)"
          color="hsl(213, 96%, 18%)"
          onClick={handleNextStep}
          data-testid="next-step-button"
        >
          {t('nextstep')}
        </Button>
      </div>
    </>
  );
};

export default Step3;
