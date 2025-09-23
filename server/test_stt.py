# server/test_stt.py (Final and Definitive Solution with faster-whisper)

import sys
import time
from faster_whisper import WhisperModel

# --- 配置 ---
MODEL_SIZE = "small"
AUDIO_FILE_PATH = "test_audio.wav"

if __name__ == '__main__':
    try:
        print(f"Initializing faster-whisper with model '{MODEL_SIZE}'...")
        # 明确指定在 CUDA (NVIDIA GPU) 上，使用 float16 精度来运行，以获得最佳性能
        model = WhisperModel(MODEL_SIZE, device="cuda", compute_type="float16")
        print("Model loaded successfully.")

    except Exception as e:
        print(f"\nFATAL ERROR: Failed to load the Whisper model.")
        print(f"This could be due to a PyTorch/CUDA configuration issue.")
        print(f"Original error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

    try:
        print(f"\nTranscribing audio file: '{AUDIO_FILE_PATH}'...")
        start_time = time.time()
        
        # transcribe 方法可以直接处理文件路径
        # beam_size=5 是一个性能和准确度平衡的常用设置
        segments, info = model.transcribe(AUDIO_FILE_PATH, beam_size=5, language="zh")

        print(f"Detected language '{info.language}' with probability {info.language_probability:.2f}")

        # segments 是一个迭代器，我们需要遍历它来获取所有识别出的文本片段
        full_text = "".join(segment.text for segment in segments)
        
        end_time = time.time()
        
        print("\n--- Recognition Result ---")
        print(f"Final Text: '{full_text}'")
        print(f"Processing took {end_time - start_time:.2f} seconds.")

    except FileNotFoundError:
        print(f"ERROR: Audio file not found at '{AUDIO_FILE_PATH}'")
    except Exception as e:
        print(f"\nAn unexpected error occurred during transcription: {e}")
        import traceback
        traceback.print_exc()

    print("\nProgram terminated.")