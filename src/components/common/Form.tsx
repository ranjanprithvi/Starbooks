import {
    FieldValues,
    Path,
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    Input,
    Select,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface Option {
    value: string;
    label: string;
}

interface SliderMarks {
    value: number;
    label: string;
}

export interface Field<T> {
    type: "textInput" | "textArea" | "select" | "slider";
    label: string;
    name: Path<T>;
    inputType?: string;
    options?: Option[];
    sliderMarks?: SliderMarks[];
    placeholder?: string;
}

interface Props<T extends FieldValues> {
    resolver?: any;
    fields: Field<T>[];
    heading: string;
    onSubmit: (data: T) => void;
    handleSubmit: UseFormHandleSubmit<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    isValid: boolean;
}

const Form = <T extends FieldValues>({
    fields,
    heading,
    onSubmit,
    handleSubmit,
    register,
    errors,
    isValid,
}: Props<T>) => {
    const navigate = useNavigate();

    function renderInput({ label, name, inputType }: Field<T>) {
        return (
            <>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Input
                    step="any"
                    id={name}
                    type={inputType}
                    {...register(name, {
                        valueAsNumber: inputType == "number",
                    })}
                />
            </>
        );
    }

    function renderTextArea({ label, name }: Field<T>) {
        return (
            <>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Textarea id={name} {...register(name)} />
            </>
        );
    }

    // function renderNumberInput({ label, name }: Field<T>) {
    //     return (
    //         <>
    //             <FormLabel htmlFor={name}>{label}</FormLabel>
    //             <NumberInput id={name}>
    //                 <NumberInputField
    //                     {...register(name, { valueAsNumber: true })}
    //                 />
    //                 <NumberInputStepper>
    //                     <NumberIncrementStepper />
    //                     <NumberDecrementStepper />
    //                 </NumberInputStepper>
    //             </NumberInput>
    //         </>
    //     );
    // }
    function renderSelect({ label, name, options, placeholder }: Field<T>) {
        return (
            <>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Select placeholder={placeholder} {...register(name)}>
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </>
        );
    }

    function renderSlider({ label, name, sliderMarks }: Field<T>) {
        return (
            <>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Slider>
                    {sliderMarks?.map((mark) => (
                        <SliderMark value={mark.value}>{mark.label}</SliderMark>
                    ))}
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </>
        );
    }

    function renderField(field: Field<T>) {
        let renderElement: (arg0: Field<T>) => JSX.Element;
        switch (field.type) {
            case "select":
                renderElement = renderSelect;
                break;
            case "slider":
                renderElement = renderSlider;
                break;
            // case "numberInput":
            //     renderElement = renderNumberInput;
            //     break;
            case "textArea":
                renderElement = renderTextArea;
                break;
            default:
                renderElement = renderInput;
        }

        return (
            <>
                {renderElement(field)}
                <FormErrorMessage>
                    {errors[field.name]?.message?.toString()}
                </FormErrorMessage>
            </>
        );
    }

    // console.log(errors, isValid);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Heading marginBottom="3">{heading}</Heading>
            {fields.map((field) => (
                <FormControl
                    key={field.name}
                    marginBottom={3}
                    isInvalid={errors[field.name] ? true : false}
                >
                    {renderField(field)}
                </FormControl>
            ))}

            <HStack justifyContent="flex-end">
                {/* <Button isDisabled={!isValid} colorScheme="green" type="submit"> */}
                <Button colorScheme="green" type="submit">
                    Submit
                </Button>
                <Button onClick={() => navigate(-1)} colorScheme="gray">
                    Cancel
                </Button>
            </HStack>
        </form>
    );
};

export default Form;
