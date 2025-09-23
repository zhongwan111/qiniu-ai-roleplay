# server/api/characters.py

from fastapi import APIRouter

# 创建一个 APIRouter 实例
# 这就像是 FastAPI 应用的一个“子模块”或“蓝图”
router = APIRouter()

# 暂时将角色数据存储在这里
# 这是一个列表，列表中的每个元素都是一个代表角色的字典
DB_CHARACTERS = [
    {
        "id": "harry_potter",
        "name": "哈利·波特",
        "avatar": "https://your-image-url/harry_potter.png", # 稍后替换成真实的图片URL
        "description": "来自霍格沃茨的年轻巫师，勇敢且富有正义感。",
        "greeting": "你好！我是哈利。有什么魔法问题想问我吗？"
    },
    {
        "id": "socrates",
        "name": "苏格拉底",
        "avatar": "https://your-image-url/socrates.png", # 稍后替换成真实的图片URL
        "description": "古希腊的哲学家，喜欢通过提问来探讨真理。",
        "greeting": "认识你自己。告诉我，你今天思考了什么？"
    },
    {
        "id": "einstein",
        "name": "爱因斯坦",
        "avatar": "https://your-image-url/einstein.png", # 稍后替换成真实的图片URL
        "description": "一位富有想象力的物理学家，对宇宙充满好奇。",
        "greeting": "时间和空间皆是相对的。你想聊聊宇宙的奥秘吗？"
    }
]


# 定义一个获取所有角色的 API 端点
# 这个 API 的路径是 /
# 但它会被包含到主应用里，最终路径会是 /api/characters
@router.get("/")
def get_all_characters():
    return DB_CHARACTERS