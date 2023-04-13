import { validationConfig } from "../components/utils/validation-consts";
import { forms } from '../components/utils/const';
import FormValidation from '../components/FormValidation';

export default function initValidation() {
    forms.forEach((form) => {
        const formValidation = new FormValidation(validationConfig, form);
        formValidation.enableValidation();
    });
}