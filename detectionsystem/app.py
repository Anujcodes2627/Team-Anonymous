# from flask import Flask, render_template, jsonify
# from flask_socketio import SocketIO, emit
# import sounddevice as sd
# import numpy as np
# import threading
# import time
# import os

# app = Flask(__name__, template_folder=os.path.abspath('.'))
# socketio = SocketIO(app)
# #
# # Audio settings
# duration = 2  # seconds
# sample_rate = 44100

# # Control flag for live detection
# is_detecting = False

# def detect_continuously():
#     global is_detecting
#     while is_detecting:
#         audio_data = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype=np.int16)
#         sd.wait()
#         rms_value = np.sqrt(np.mean(np.square(audio_data)))
#         db_level = 20 * np.log10(rms_value)
#         if db_level <= 60:
#             result = f"{db_level:.2f} dB — Normal sound"
#         else:
#             result = f"{db_level:.2f} dB — Polluted sound"
#         socketio.emit('detection_result', {'result': result})
#         time.sleep(1)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/start-detection')
# def start_detection():
#     global is_detecting
#     if not is_detecting:
#         is_detecting = True
#         threading.Thread(target=detect_continuously).start()
#     return jsonify({"status": "Detection started"})

# @app.route('/stop-detection')
# def stop_detection():
#     global is_detecting
#     is_detecting = False
#     return jsonify({"status": "Detection stopped"})

# if __name__ == '__main__':
#     socketio.run(app, debug=True)
# with open("index.html", "w") as f:
#     f.write(html_code)

from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
import sounddevice as sd
import numpy as np
import threading
import time
import os
from flask_cors import CORS


app = Flask(__name__, template_folder=os.path.abspath('.'))
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
 # 👈 Also allow socket connection from any origin


# Audio settings
duration = 2  # seconds
sample_rate = 44100

# Control flag
is_detecting = False

def detect_continuously():
    global is_detecting
    while is_detecting:
        audio_data = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype=np.int16)
        sd.wait()
        rms_value = np.sqrt(np.mean(np.square(audio_data)))
        db_level = 20 * np.log10(rms_value + 1e-6)  # avoid log(0)
        if db_level <= 60:
            result = f"{db_level:.2f} dB — Normal sound"
        else:
            result = f"{db_level:.2f} dB — Polluted sound"
        socketio.emit('detection_result', {'result': result})
        time.sleep(1)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/start-detection')
def start_detection():
    global is_detecting
    if not is_detecting:
        is_detecting = True
        threading.Thread(target=detect_continuously).start()
    return jsonify({"status": "Detection started"})

@app.route('/stop-detection')
def stop_detection():
    global is_detecting
    is_detecting = False
    return jsonify({"status": "Detection stopped"})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)
