import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import Card from '@/Components/DivCard/Card';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={"Profile"}
            windowType={"User"}
        >
            <Head title="Profile" />

            <Card>
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl" />
            </Card>

            <Card> <UpdatePasswordForm className="max-w-xl" /> </Card>
            <Card> <DeleteUserForm className="max-w-xl" /> </Card>

        </AuthenticatedLayout>
    );
}
