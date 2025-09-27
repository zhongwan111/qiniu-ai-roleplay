// LLM服务调用统一接口
import { getCurrentLLMConfig, SYSTEM_PROMPTS } from "@/config/llm-config";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export class LLMService {
  // 调用LLM API
  static async chat(
    userMessage: string,
    systemPrompt?: string
  ): Promise<string> {
    const config = getCurrentLLMConfig();

    if (!config) {
      throw new Error(
        "请先在 src/config/llm-config.ts 中配置并启用一个LLM服务"
      );
    }

    const messages: ChatMessage[] = [
      {
        role: "system",
        content: systemPrompt || SYSTEM_PROMPTS.default,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];

    switch (config.name) {
      case "通义千问":
        return await this.callQwenAPI(config, messages);
      case "OpenAI GPT":
        return await this.callOpenAIAPI(config, messages);
      case "智谱ChatGLM":
        return await this.callZhipuAPI(config, messages);
      default:
        throw new Error(`不支持的LLM服务: ${config.name}`);
    }
  }

  // 通义千问API调用
  private static async callQwenAPI(
    config: any,
    messages: ChatMessage[]
  ): Promise<string> {
    const requestBody = {
      model: config.model,
      input: { messages },
      parameters: {
        temperature: 0.7,
        top_p: 0.8,
        max_tokens: 150,
        result_format: "message",
      },
    };

    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "X-DashScope-SSE": "disable",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("通义千问API调用失败:", response.status, errorData);
      throw new Error(`通义千问API调用失败: ${response.status}`);
    }

    const data = await response.json();

    if (data.output?.choices?.[0]?.message?.content) {
      return data.output.choices[0].message.content;
    } else {
      throw new Error("通义千问API响应格式错误");
    }
  }

  // OpenAI API调用
  private static async callOpenAIAPI(
    config: any,
    messages: ChatMessage[]
  ): Promise<string> {
    const requestBody = {
      model: config.model,
      messages,
      temperature: 0.7,
      max_tokens: 150,
    };

    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API调用失败:", response.status, errorData);
      throw new Error(`OpenAI API调用失败: ${response.status}`);
    }

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    } else {
      throw new Error("OpenAI API响应格式错误");
    }
  }

  // 智谱API调用
  private static async callZhipuAPI(
    config: any,
    messages: ChatMessage[]
  ): Promise<string> {
    const requestBody = {
      model: config.model,
      messages,
      temperature: 0.7,
      max_tokens: 150,
    };

    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("智谱API调用失败:", response.status, errorData);
      throw new Error(`智谱API调用失败: ${response.status}`);
    }

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    } else {
      throw new Error("智谱API响应格式错误");
    }
  }
}
