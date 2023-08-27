/* eslint-disable react/prop-types */
import { Circle, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Form = ({ StepNumber, StepLabel, currentStep }) => {
  const { t } = useTranslation();
  return (
    <div className={`sidebar-step ${currentStep === StepNumber ? 'active' : ''}`}>
      <Circle size="2.5rem" className="step-number" bg={currentStep === StepNumber ? 'hsl(206, 94%, 87%)' : ''}>
        {StepNumber}
      </Circle>
      <div className="step-text">
        <Text className="step-number-text">
          {t('step')} {StepNumber}
        </Text>
        <Text className="step-label">{StepLabel}</Text>
      </div>
    </div>
  );
};

export default Form;
