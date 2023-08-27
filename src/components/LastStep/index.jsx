/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import IconThankyou from '@static/images/icon-thank-you.svg';
import { Button } from '@chakra-ui/react';

const LastStep = ({ onBackStep, theme }) => {
  const { t } = useTranslation();
  console.log(theme);
  return (
    <>
      <div className={theme === 'light' ? 'outerDark' : 'outer'}>
        <div className={theme === 'light' ? 'form-step-container-Dark' : 'form-step-container'}>
          <div className="lastStep">
            <img src={IconThankyou} alt="" />
            <div className={theme === 'light' ? 'nameThankyouDark' : 'nameThankyou'}>{t('thankyou')}</div>
            <div className={theme === 'light' ? 'captionThankyouDark' : 'captionThankyou'}>{t('captthankyou')}</div>
          </div>
        </div>
        <div className="button-desktop">
          <Button onClick={onBackStep}>{t('makeanotherplans')}</Button>
        </div>
      </div>
    </>
  );
};

export default LastStep;
