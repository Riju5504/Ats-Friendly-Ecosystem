const API_BASE_URL = 'https://ats-friendly-ecosystem-XXXX.onrender.com/api';

export const analyzeResume = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-resume`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Server error: ' + response.status);

    return await response.json();
  } catch (err) {
    throw new Error('Could not connect to backend. Make sure port 5000 is running.');
  }
};