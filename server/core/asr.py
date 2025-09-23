# server/core/asr.py

from faster_whisper import WhisperModel
import os

# --- 配置 ---
MODEL_SIZE = "small"

# --- 全局模型实例 ---
# 我们只在程序启动时加载一次模型，避免重复加载消耗资源
print("Loading Whisper ASR model...")
try:
    # 我们在这里也需要设置好 LD_LIBRARY_PATH, 稍后会在启动脚本里处理
    model = WhisperModel(MODEL_SIZE, device="cuda", compute_type="float16")
    print("Whisper ASR model loaded successfully.")
except Exception as e:
    print(f"FATAL ERROR: Failed to load Whisper model: {e}")
    model = None

def transcribe_audio_file(file_path: str) -> str:
    """
    接收一个音频文件的路径，返回识别出的文本。
    """
    if not model:
        return "Error: ASR model is not available."
        
    if not os.path.exists(file_path):
        return f"Error: Audio file not found at {file_path}"
        
    segments, info = model.transcribe(file_path, beam_size=5, language="zh")
    
    full_text = "".join(segment.text for segment in segments)
    return full_text

# TODO: 以后我们再添加一个函数，用于处理实时的音频流数据
# def transcribe_audio_stream(audio_chunks):
#     ..