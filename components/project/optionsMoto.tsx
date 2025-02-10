import React, { useState } from 'react';
import optionsMotoJson from '../../optionsMoto.json';
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form"

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
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (optionId: string) => {
        setSelectedOption(optionId);
    };

    const handleValidation = () => {
        if (selectedOption) {
            const option = optionsMoto[currentStep].options.find(opt => opt.id === selectedOption);
            if (option) {
                setFormData({
                    ...formData,
                    [currentStep]: option.id,
                });
                setCurrentStep(option.next);
                setSelectedOption(null); // Reset selected option for the next step
            }
        }
    };

    const renderOptions = (options: Option[]) => {
        return options.map((option) => (
            <div key={option.id}>
                <input
                    type="radio"
                    id={option.id}
                    name={currentStep}
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => handleOptionChange(option.id)}
                    className="m-2 text-sm"
                />
                <label htmlFor={option.id}>{option.name}</label>
            </div>
        ));
    };

    const currentQuestion = optionsMoto[currentStep];

    return (
        <CardWrapper
            headerLabel="Configuration"
            headerTitle="Selle Moto"
            backButtonLabel=""
            backButtonHref=""
        >
            <h1 className="mb-4 text-sm font-medium">Formulaire en plusieurs étapes</h1>

            {currentQuestion ? (
                <div>
                    <h2 className="text-sm font-medium">{currentQuestion.label}</h2>
                    {renderOptions(currentQuestion.options)}

                    <Button className="w-full mt-4" onClick={handleValidation} >
                        Valider
                    </Button>
                </div>
            ) : (
                <div>
                    <h2>Formulaire terminé</h2>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
            )}
        </CardWrapper>
    );
};

export default OptionsMoto;