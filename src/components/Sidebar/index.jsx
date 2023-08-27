import { useTranslation } from 'react-i18next';
import Form from './form';

/* eslint-disable react/prop-types */
const Sidebar = ({ currentStep }) => {
  const { t } = useTranslation();
  return (
    <div className="sidebar-bg">
      <div className="form-all-steps">
        <Form StepNumber={1} StepLabel={t('yourinfo')} currentStep={currentStep} />
        <Form StepNumber={2} StepLabel={t('selectplan')} currentStep={currentStep} />
        <Form StepNumber={3} StepLabel={t('add-ons')} currentStep={currentStep} />
        <Form StepNumber={4} StepLabel={t('summary')} currentStep={currentStep} />
      </div>
    </div>
  );
};

export default Sidebar;
