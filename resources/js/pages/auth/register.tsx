import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';

export default function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        role: 'anggota',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setApiError('');

        try {
            const response = await fetch('/register', { // Fortify Register endpoint
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const result = await response.json();

                if (response.status === 422 && result.errors) {
                    const validationErrors: Record<string, string> = {};

                    for (const key in result.errors) {
                        validationErrors[key] = result.errors[key][0];
                    }

                    setErrors(validationErrors);
                } else {
                    setApiError(result.message || 'Pendaftaran gagal.');
                }
            } else {
                // Berhasil daftar biasanya Laravel langsung login (Session)
                // Tapi kita arahkan ke login agar user bisa dapat API Token secara resmi
                router.visit('/login', {
                    data: { status: 'Pendaftaran berhasil! Silakan login.' }
                });
            }
        } catch {
            setApiError('Terjadi kesalahan jaringan.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title="Register" />
            
            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    {apiError && (
                        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
                            {apiError}
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={handleChange}
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            tabIndex={2}
                            autoComplete="email"
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Role / Jabatan</Label>
                        <Select 
                            name="role" 
                            onValueChange={(val) => setData({...data, role: val})}
                            defaultValue={data.role}
                        >
                            <SelectTrigger id="role" tabIndex={3}>
                                <SelectValue placeholder="Pilih Peran Anda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin Aplikasi</SelectItem>
                                <SelectItem value="pengurus">Pengurus UKM</SelectItem>
                                <SelectItem value="anggota">Anggota UKM</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirm password
                        </Label>
                        <PasswordInput
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            required
                            tabIndex={5}
                            autoComplete="new-password"
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        tabIndex={6}
                        disabled={processing}
                    >
                        {processing && <Spinner />}
                        Create account
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={login()} tabIndex={7}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
