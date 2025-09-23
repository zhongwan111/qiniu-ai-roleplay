# server/main.py

from fastapi import FastAPI
from api import characters  # 👈 1. 导入我们新的 characters 模块

# 创建一个 FastAPI 应用实例
app = FastAPI()

# 2. 将 characters.py 中的路由包含进来
# prefix="/api/characters" 的意思是，所有在 characters.router 里定义的 API
# 路径都会自动加上这个前缀。
# 例如，原来在 characters.py 里定义的 "/" 路径，现在会变成 "/api/characters/"
app.include_router(characters.router, prefix="/api/characters", tags=["Characters"])

# 根路径的 "Hello World" 我们可以保留，用于测试服务是否启动
@app.get("/")
def read_root():
    return {"message": "Hello, 无名小队! Your backend is running."}