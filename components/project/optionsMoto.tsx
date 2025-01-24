import React, { useState } from 'react';
import optionsMotoJson from '../../optionsMoto.json';

type Option = {
    id: string;
    name: string;
    next: string;
};

type Question = {
    id: string;
    label: string;
    options: Option[];
};

type Questions = {
    [key: string]: Question;
};

const optionsMoto: Questions = optionsMotoJson;

const OptionsMoto = () => {
    const [currentStep, setCurrentStep] = useState('coque');
    const [formData, setFormData] = useState({});

    const handleOptionChange = (option: Option) => {
        setFormData({
            ...formData,
            [currentStep]: option.id,
        });
        setCurrentStep(option.next);
    };

    const renderOptions = (options: Option[]) => {
        return options.map((option) => (
            <div key={option.id}>
                <input
                    type="radio"
                    id={option.id}
                    name={currentStep}
                    value={option.id}
                    onChange={() => handleOptionChange(option)}
                />
                <label htmlFor={option.id}>{option.name}</label>
            </div>
        ));
    };

    const currentQuestion = optionsMoto[currentStep];

    return (
        <div>
            <h1>Formulaire en plusieurs étapes</h1>
            {currentQuestion ? (
                <div>
                    <h2>{currentQuestion.label}</h2>
                    {renderOptions(currentQuestion.options)}
                </div>
            ) : (
                <div>
                    <h2>Formulaire terminé</h2>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default OptionsMoto;