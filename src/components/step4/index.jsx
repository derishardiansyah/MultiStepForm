/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Button, Card, CardBody, Divider, Flex, FormLabel, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Step4 = ({ onNextStep, onBackStep, theme, onBackStep2 }) => {
  const { t } = useTranslation();
  const addons = useSelector((state) => state.personal.addons);
  const isAnnualPlan = useSelector((state) => state.personal.isAnnualPlan);
  const selectedAddOns = Object.keys(addons).filter((title) => addons[title].isAdded);
  const selectedPlan = useSelector((state) => state.personal.selectedPlan);

  const totalAddOnsPrice = selectedAddOns.reduce(
    (total, title) => total + (isAnnualPlan ? addons[title].monthCost * 10 : addons[title].monthCost),
    0
  );

  const totalPrice = selectedPlan ? selectedPlan.price + totalAddOnsPrice : 0;
  return (
    <>
      <div className={theme === 'light' ? 'outerDark' : 'outer'}>
        <div className={theme === 'light' ? 'form-step-container-Dark' : 'form-step-container'}>
          <Flex direction="column" rowGap="5px">
            <FormLabel className={theme === 'light' ? 'heading-dark' : 'heading-text'} fontSize="40px" as="b">
              {t('finishingup')}
            </FormLabel>
            <FormLabel className={theme === 'light' ? 'caption-text-dark' : 'caption-text'} marginBottom="15px">
              {t('captfinishingup')}
            </FormLabel>
            <Card bgColor="hsl(217, 100%, 97%)">
              <CardBody>
                <div className="addon-details" style={{ paddingBottom: '5px' }}>
                  <Text color="hsl(213, 96%, 18%)" as="b">
                    {selectedPlan?.name} {isAnnualPlan ? t('yearly') : t('monthly')}
                  </Text>
                  <Text color="hsl(213, 96%, 18%)" as="b">
                    +${selectedPlan?.price}
                    {isAnnualPlan ? `/${t('yr')}` : `/${t('mo')}`}
                  </Text>
                </div>
                <Text textAlign="left" onClick={onBackStep2} cursor="pointer" textDecor="underline">
                  Change
                </Text>
                <Divider color="hsl(231, 11%, 63%)" />
                {selectedAddOns.map((title) => (
                  <div className="addon-details" style={{ paddingTop: '5px' }}>
                    <Text color="hsl(231, 11%, 63%)"> {t(addons[title].name)}</Text>
                    <Text color="hsl(213, 96%, 18%)">
                      +$
                      {isAnnualPlan ? addons[title].monthCost * 10 : addons[title].monthCost}
                      {isAnnualPlan ? `/${t('yr')}` : `/${t('mo')}`}
                    </Text>
                  </div>
                ))}
              </CardBody>
            </Card>
            <div className="addon-details">
              <FormLabel className={theme === 'light' ? 'totalDark' : 'total'} fontSize="lg" marginTop="15px">
                {t('total')}
              </FormLabel>
              <Text
                className={theme === 'light' ? 'totalPriceDark' : 'totalPrice'}
                marginTop="15px"
                fontSize="lg"
                as="b"
              >
                ${totalPrice}
                {isAnnualPlan ? `/${t('yr')}` : `/${t('mo')}`}
              </Text>
            </div>
          </Flex>
          <div className="button-desktop">
            <Flex direction="row" justifyContent="space-between" width={{ base: '60vw', md: '38vw' }} mt="30px">
              <Button style={{ color: theme === 'light' ? 'white' : 'gray' }} variant="ghost" onClick={onBackStep}>
                {t('back')}
              </Button>
              <Button onClick={onNextStep}>{t('nextstep')}</Button>
            </Flex>
          </div>
        </div>
      </div>
      <div className={theme === 'light' ? 'button-mobile-dark' : 'button-mobile'}>
        <Button style={{ color: theme === 'light' ? 'white' : 'gray' }} variant="ghost" onClick={onBackStep}>
          {t('back')}
        </Button>
        <Button bgColor="hsl(217, 100%, 97%)" color="hsl(213, 96%, 18%)" onClick={onNextStep}>
          {t('nextstep')}
        </Button>
      </div>
    </>
  );
};

export default Step4;
