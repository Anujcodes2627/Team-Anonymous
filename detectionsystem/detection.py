import sounddevice as sd
import numpy as np

# Constants for audio capture
duration = 5  # Duration of audio recording in seconds
sample_rate = 44100  # Sampling rate (samples per second)

# Function to measure sound intensity
def measure_sound_intensity():
    print("Recording audio...")
    audio_data = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype=np.int16)
    sd.wait()  # Wait for the audio recording to complete
    rms_value = np.sqrt(np.mean(np.square(audio_data)))
    db_level = 20 * np.log10(rms_value)
    if db_level <= 60:
        print(f"Sound intensity (db_level) is: {db_level:.2f} which is Normal sound")
    elif db_level >= 60:
        print(f"Sound intensity (db_level) is: {db_level:.2f} which is Polluted sound")
# Call the function to measure sound intensity
measure_sound_intensity()
