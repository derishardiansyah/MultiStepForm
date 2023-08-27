/* eslint-disable import/named */
/* eslint-disable react/prop-types */
// Step2.js

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Text,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Image,
  Box,
  Button,
  Switch,
  FormControl,
} from '@chakra-ui/react';
import advanceImg from '@static/images/icon-advanced.svg';
import proImg from '@static/images/icon-pro.svg';
import arcadeImg from '@static/images/icon-arcade.svg';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { selectPlan, setIsAnnualPlan } from '../../redux/personalSlice';

const Step2 = ({ onNextStep, onBackStep, theme }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const plans = useSelector((state) => state.personal.plans);
  const isAnnualPlan = useSelector((state) => state.personal.isAnnualPlan);
  const isPlanSelected = useSelector((state) => state.personal.selectedPlan !== null);

  const calculatePrice = (plan, cycle) => {
    const { monthlyPrice, yearlyPrice } = plans[plan];
    const monthlyText = `$${monthlyPrice}/${t('mo')}`;
    const yearlyText = `$${yearlyPrice}/${t('yr')}`;

    if (cycle === 'monthly') {
      return monthlyText;
    }
    const savingPercentage = Math.round((1 - yearlyPrice / (monthlyPrice * 12)) * 100);
    return (
      <>
        <Text>{yearlyText}</Text>
        <Text fontSize="14px" color="black">
          {savingPercentage}% {t('off')}, {t('2monthsfree')}
        </Text>
      </>
    );
  };

  const handlePlanClick = (plan) => {
    const price = billingCycle === 'monthly' ? plans[plan].monthlyPrice : plans[plan].yearlyPrice;
    dispatch(selectPlan({ name: plans[plan].name, price }));
  };

  const handleIsAnnualChange = () => {
    setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'));
    dispatch(setIsAnnualPlan(!isAnnualPlan));
  };

  const handleNextStep = () => {
    if (isPlanSelected) {
      onNextStep();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Select Plan',
        text: 'Please select a plan first before moving to the next step',
      });
    }
  };

  return (
    <>
      <div className={theme === 'light' ? 'outerDark' : 'outer'}>
        <div className={theme === 'light' ? 'form-step-container-Dark' : 'form-step-container'}>
          <Flex direction="column" alignItems="flex-start" rowGap="5px" textAlign="left">
            <Text
              className={theme === 'light' ? 'heading-dark' : 'heading-text'}
              fontSize={{ base: '40px', md: '35px' }}
              as="b"
            >
              {t('selectyourplan')}
            </Text>
            <Text className={theme === 'light' ? 'caption-text-dark' : 'caption-text'} marginBottom="35px">
              {t('captselectyourplan')}
            </Text>
            <Flex flexDirection={{ base: 'column', lg: 'row' }} gap="10px">
              <Card
                textAlign="left"
                display="flex"
                flexDirection={{ base: 'row', lg: 'column' }}
                alignItems={{ base: 'center', lg: 'flex-start' }}
                width={{ lg: '13vw', md: '40vw', base: '60vw' }}
                height={{ lg: '210px', base: '90px' }}
                onClick={() => handlePlanClick('arcade')}
                _hover={{
                  border: theme === 'light' ? 'orange solid' : '0.5px solid hsl(243, 100%, 62%)',
                  bgColor: theme === 'light' ? '#DDE6ED' : '#FBF6FC',
                }}
              >
                <CardHeader>
                  <Image src={arcadeImg} />
                </CardHeader>
                <CardBody>
                  <Heading size="md" color="hsl(213, 96%, 18%)">
                    Arcade
                  </Heading>
                  <Text fontSize="14px" color="hsl(231, 11%, 63%)">
                    {calculatePrice('arcade', billingCycle)}
                  </Text>
                </CardBody>
              </Card>
              <Card
                textAlign="left"
                display="flex"
                flexDirection={{ base: 'row', lg: 'column' }}
                alignItems={{ base: 'center', lg: 'flex-start' }}
                width={{ lg: '13vw', md: '40vw', base: '60vw' }}
                height={{ lg: '210px', base: '90px' }}
                onClick={() => handlePlanClick('advance')}
                _hover={{
                  border: theme === 'light' ? 'orange solid' : '0.5px solid hsl(243, 100%, 62%)',
                  bgColor: theme === 'light' ? '#DDE6ED' : '#FBF6FC',
                }}
              >
                <CardHeader>
                  <Image src={advanceImg} />
                </CardHeader>
                <CardBody>
                  <Heading size="md" color="hsl(213, 96%, 18%)">
                    Advanced
                  </Heading>
                  <Text fontSize="14px" color="hsl(231, 11%, 63%)">
                    {calculatePrice('advance', billingCycle)}
                  </Text>
                </CardBody>
              </Card>
              <Card
                textAlign="left"
                display="flex"
                flexDirection={{ base: 'row', lg: 'column' }}
                alignItems={{ base: 'center', lg: 'flex-start' }}
                width={{ lg: '13vw', md: '40vw', base: '60vw' }}
                height={{ lg: '210px', base: '90px' }}
                onClick={() => handlePlanClick('pro')}
                _hover={{
                  border: theme === 'light' ? 'orange solid' : '0.5px solid hsl(243, 100%, 62%)',
                  bgColor: theme === 'light' ? '#DDE6ED' : '#FBF6FC',
                }}
              >
                <CardHeader>
                  <Image src={proImg} />
                </CardHeader>
                <CardBody>
                  <Heading size="md" color="hsl(213, 96%, 18%)">
                    Pro
                  </Heading>
                  <Text fontSize="14px" color="hsl(231, 11%, 63%)">
                    {calculatePrice('pro', billingCycle)}
                  </Text>
                </CardBody>
              </Card>
            </Flex>
            <Box
              width={{ base: '60vw', md: '40vw' }}
              height="3rem"
              bgColor="hsl(217, 100%, 97%)"
              borderRadius="5px"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-evenly"
              marginTop="30px"
            >
              <Text className={theme === 'light' ? 'monthly-text-dark' : 'monthly-text'}>{t('monthly')}</Text>
              <FormControl display="flex" justifyContent="center" width="5rem">
                <Switch id="email-alerts" onChange={handleIsAnnualChange} checked={isAnnualPlan} />
              </FormControl>
              <Text className={theme === 'light' ? 'yearly-text-dark' : 'yearly-text'}>{t('yearly')}</Text>
            </Box>
          </Flex>
          <div className="button-desktop">
            <Flex direction="row" justifyContent="space-between" width={{ base: '60vw', md: '40vw' }} mt="30px">
              <Button style={{ color: theme === 'light' ? 'white' : 'gray' }} variant="ghost" onClick={onBackStep}>
                {t('back')}
              </Button>
              <Button onClick={handleNextStep}>{t('nextstep')}</Button>
            </Flex>
          </div>
        </div>
      </div>
      <div className={theme === 'light' ? 'button-mobile-dark' : 'button-mobile'}>
        <Button style={{ color: theme === 'light' ? 'white' : 'gray' }} variant="ghost" onClick={onBackStep}>
          {t('back')}
        </Button>
        <Button bgColor="hsl(217, 100%, 97%)" color="hsl(213, 96%, 18%)" onClick={handleNextStep}>
          {t('nextstep')}
        </Button>
      </div>
    </>
  );
};

export default Step2;
