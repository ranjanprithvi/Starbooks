import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";

const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    age: z
        .number({ invalid_type_error: "Age field is required" })
        .min(18, { message: "Age must be at least 18" }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                    id="name"
                    type="text"
                    {...register("name", { required: true, minLength: 3 })}
                />
                {errors.name && (
                    <FormErrorMessage className="text-danger">
                        {errors.name.message}
                    </FormErrorMessage>
                )}
            </FormControl>
            <FormControl className="mb-3">
                <FormLabel htmlFor="age" className="form-label">
                    Age
                </FormLabel>
                <Input
                    id="age"
                    type="number"
                    className="form-control"
                    {...register("age", { valueAsNumber: true })}
                />
                {errors.age && (
                    <FormErrorMessage className="text-danger">
                        {errors.age.message}
                    </FormErrorMessage>
                )}
            </FormControl>
            <Button type="submit" disabled={!isValid}>
                Submit
            </Button>
        </form>
    );
};

export default Form;
