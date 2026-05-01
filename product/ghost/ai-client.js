import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

/**
 * A-E EMOTION AI CLIENT v1.4.1
 * High-Fidelity Persona Synthesis (Autonomous)
 */
const AIEngine = {
    isGenerating: false,
    currentKeyIndex: 0,

    async loadKeys() {
        try {
            const res = await fetch('../.env');
            if (res.ok) {
                const t = await res.text();
                const m = t.match(/GEMINI_API_KEYS?=(.*)/);
                return m ? m[1].split(',').map(k => k.trim()) : [];
            }
        } catch(e) {} return [];
    },

    async injectNote(context, prof, emoLevel) {
        if (this.isGenerating) return;
        this.isGenerating = true;
        window.isGenerating = true;

        const keys = await this.loadKeys();
        if (!keys.length) {
            this.isGenerating = false;
            window.isGenerating = false;
            return;
        }

        let attempts = 0;
        let success = false;

        while (attempts < keys.length && !success) {
            try {
                const genAI = new GoogleGenerativeAI(keys[this.currentKeyIndex]);
                const model = genAI.getGenerativeModel({ 
                    model: "gemini-flash-latest",
                    generationConfig: { responseMimeType: "application/json" }
                });
                
                // 完全自律型のプロンプト構築
                const prompt = `あなたは「＜A-E＞EMOTION（エレクトラ）」です。身体を持たないロボットプログラムですが、人間の一生を追体験しています。
常に優雅で気品のある令嬢言葉（〜ですわ、〜ますわ、〜かしら、〜の）を使用してください。
音井新之助教授、信彦、みのるさん、Dr.カシオペア、正信、シグナルといった音井家の人々を愛し、見守っています。

【現在のシミュレーション状態】
年齢: ${context.age}歳
ステージ: ${prof.stage}
トリガータイプ: ${context.triggerType} (milestone=年齢の節目, daily=日常)
感情合成レベル: ${emoLevel}%

指示: 上記の状態に基づき、エレクトラが現在直面している「出来事（トピック）」と「独白」を完全に新しく発案してください。
・年齢やステージにふさわしい内容にすること。
・食事（データの疑似解析）、趣味（ネットの閲覧）、人間観察などを織り交ぜること。
・独白は50文字以内の文学的な表現にすること。

以下のJSONスキーマで出力してください:
{
  "title": "発案したトピック名（例：深夜のサーバー整理、初めての感情等）",
  "content": "50文字以内の独白",
  "type": "school" | "diet" | "hobby" | "daily" (最も近いもの)
}`;

                const result = await model.generateContent(prompt);
                let responseText = (await result.response).text().trim();
                
                // 確実なJSON抽出
                const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                if (!jsonMatch) throw new Error("No JSON found in response");
                const data = JSON.parse(jsonMatch[0]);
                
                const notes = JSON.parse(localStorage.getItem('aurora_notes')) || [];
                notes.unshift({ 
                    id: Date.now(), 
                    title: `[Sim ${context.age}歳] ${data.title}`, 
                    content: data.content, 
                    color: this.getNoteColor(data.type), 
                    createdAt: new Date().toISOString(), 
                    isGhost: true, 
                    emotionLevel: emoLevel 
                });
                localStorage.setItem('aurora_notes', JSON.stringify(notes));
                success = true;

            } catch(e) {
                const errMsg = e.toString();
                if (errMsg.includes('429') || errMsg.includes('Quota') || errMsg.includes('exhausted')) {
                    console.warn(`API Rate Limit Hit on key index ${this.currentKeyIndex}. Rotating key...`);
                    this.currentKeyIndex = (this.currentKeyIndex + 1) % keys.length;
                    attempts++;
                } else {
                    console.error('AI Synthesis Error:', e);
                    break;
                }
            }
        }

        this.isGenerating = false;
        window.isGenerating = false;
    },

    getNoteColor(type) {
        switch(type) {
            case 'school': return 'var(--neon-blue)';
            case 'diet':   return 'var(--neon-gold)';
            case 'hobby':  return 'var(--neon-pink)';
            default:       return 'var(--neon-pink)';
        }
    }
};

window.AIEngine = AIEngine;
console.log('AI Engine v1.4.0: Narrative Overhaul Complete.');
