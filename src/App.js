import React, { useState } from 'react';

function App() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Basic form validation
        let hasError = false;

        if (!email) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
            hasError = true;
        }

        if (!name) {
            setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
            hasError = true;
        }

        if (!password) {
            setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
            hasError = true;
        }

        if (!confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Confirm Password is required',
            }));
            hasError = true;
        }

        if (password !== confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Passwords do not match',
            }));
            hasError = true;
        }

        if (!hasError) {
            // Reset the error for "All fields are required"
            setErrors((prevErrors) => ({ ...prevErrors, allFields: '' }));

            // Form submission logic here
            const formData = {
                email,
                name,
                password,
                // Add any other form fields you need
            };

            // Example API call using fetch
            fetch('https://example.com/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the response from the server
                    console.log(data);
                    // Reset the form values
                    setEmail('');
                    setName('');
                    setPassword('');
                    setConfirmPassword('');
                    setErrors({});
                    // Show success message after a brief delay
                    setShowSuccessMessage(true);

                })
                .catch((error) => {
                    // Handle any error that occurred during form submission
                    console.error(error);
                });
        } else {
            // Set the error for "All fields are required"
            setErrors((prevErrors) => ({
                ...prevErrors,
                allFields: 'Error: All the fields are mandatory',
            }));
        }
    };

    return (
        <div className="form-input">
            <div className="outer-container">
                <h1>Signup</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        {errors.allFields && <p className="error">{errors.allFields}</p>}
                    </div>

                    <div>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>

                {showSuccessMessage && (
                    <div>
                        <p className="success">Successfully signed up!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
