import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Input/InputError';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/Input/InputLabel';
import { GrUserAdd } from "react-icons/gr";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="border-b pb-3 mb-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <GrUserAdd className="text-gray-700 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-700">Forgot Password</h2>
                    </div>
                </div>
                <p className="text-sm text-gray-500">Please make sure all fields are filled in correctly.</p>
            </div>

            <form onSubmit={submit}>
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="border-t pt-4 mt-8 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
