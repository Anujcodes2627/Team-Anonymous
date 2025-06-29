import sounddevice as sd
import numpy as np
import soundfile as sf

# Constants for audio capture
duration = 10  # Duration of audio recording in seconds
sample_rate = 44100  # Sampling rate (samples per second)

# Function to measure sound intensity
def measure_sound_intensity():
    # Read audio file using soundfile
    audio_file_path = "s1.mp3"
    audio_data, _ = sf.read(audio_file_path, dtype='int16')

    # Ensure the audio data is mono (if stereo)
    if len(audio_data.shape) > 1:
        audio_data = np.mean(audio_data, axis=1)

    # Take a portion of the audio if it's longer than the specified duration
    if len(audio_data) > duration * sample_rate:
        audio_data = audio_data[:int(duration * sample_rate)]

    # Calculate RMS value (Root Mean Square)
    rms_value = np.sqrt(np.mean(np.square(audio_data)))
    db_level = 20 * np.log10(rms_value)
    if db_level <= 60:
        print(f"Sound intensity (db_level) is: {db_level:.2f} which is Normal sound")
    elif db_level >= 60:
        print(f"Sound intensity (db_level) is: {db_level:.2f} which is Polluted sound")

# Call the function to measure sound intensity
measure_sound_intensity()
