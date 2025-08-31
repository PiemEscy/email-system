import { useEffect } from 'react';
import Checkbox from '@/Components/Input/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { GrLogin } from "react-icons/gr";

export default function Login({ message, status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                toast.success("Login successful!", { position: 'top-right', autoClose: 3000 });
            },
            onError: (error) => {
                if (error.email) toast.error(error.email, { position: 'top-right', autoClose: 3000 });
                if (error.password) toast.error(error.password, { position: 'top-right', autoClose: 3000 });
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Header with Bottom Border */}
            <div className="border-b pb-3 mb-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <GrLogin className="text-gray-700 text-xl" />
                        <h2 className="text-xl font-semibold text-gray-700">Login</h2>
                    </div>
                </div>
                <p className="text-sm text-gray-500">
                    Please make sure all fields are filled in correctly.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </div>

                {/* Action Buttons with Top Border */}
                <div className="border-t pt-8 flex items-center justify-between">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>

    );
}
