import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            {/* Form on the right (or below the logo on smaller screens) */}
            <div className="w-full">
                <form onSubmit={submit} className="space-y-4">
                    <div className="mt-4">

                        <div className="mb-4 text-sm text-gray-600">
                            This is a secure area of the application. Please confirm your password before continuing.
                        </div>
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="border-t mt-5 flex items-center justify-between">
                        <PrimaryButton className="" disabled={processing}>
                            Confirm
                        </PrimaryButton>
                    </div>
                </form>

            </div>

        </GuestLayout>
    );
}
