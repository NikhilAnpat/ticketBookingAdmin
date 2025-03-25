import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/axiosInstance';

interface FormData {
    name: string;
    email: string;
    phone: string;
    age: string;
    password: string;
    profile_picture: File | null;
    preferred_language: string;
}

function Register() {
    const navigate = useNavigate(); // Initialize navigate function

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        age: '',
        password: '',
        profile_picture: null,
        preferred_language: 'eng',
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement;

        if (type === 'file' && files && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0],
            });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            const value = formData[key as keyof FormData];
            if (value !== null) {
                formDataToSend.append(key, value as string | Blob);
            }
        });

        try {
            const response = await api.post('/register', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage(response.data.message);
            setError('');

            
            setTimeout(() => {
                navigate('/login');
            }, 1000); 
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-4xl font-extrabold mb-8 text-blue-600 text-center">Create Your Account</h2>

            {message && <div className="text-green-600 mb-4">{message}</div>}
            {error && <div className="text-red-600 mb-4">{error}</div>}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
            >
                <div>
                    <label className="block text-lg font-medium text-gray-800">Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-800">Email Address:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-800">Phone Number:</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-800">Age:</label>
                    <input
                        type="number"
                        name="age"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-800">Create Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-800">Profile Picture:</label>
                    <input
                        type="file"
                        name="profile_picture"
                        accept="image/*"
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Profile Preview"
                            className="mt-4 max-h-32 rounded-lg shadow-lg"
                        />
                    )}
                </div>
                <div className="md:col-span-2">
                    <label className="block text-lg font-medium text-gray-800">Preferred Language:</label>
                    <select
                        name="preferred_language"
                        value={formData.preferred_language}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="eng">English</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="md:col-span-2 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Register
                </button>
                <div className="md:col-span-2 text-center mt-4">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;