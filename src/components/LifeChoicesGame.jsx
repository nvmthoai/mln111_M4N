import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Gemini AI API configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDYour-Gemini-API-Key-Here'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

const gameStages = {
  CHARACTER_CREATION: 'character',
  CAREER_CHOICE: 'career',
  MARRIAGE_CHOICE: 'marriage',
  CHILDREN_CHOICE: 'children',
  RESULTS: 'results'
}

const backgrounds = [
  { id: 'urban_rich', label: 'Thành thị - Gia đình khá giả', modifier: { finance: 20, happiness: 10, social: 15 } },
  { id: 'urban_normal', label: 'Thành thị - Gia đình bình thường', modifier: { finance: 0, happiness: 0, social: 0 } },
  { id: 'rural_normal', label: 'Nông thôn - Gia đình bình thường', modifier: { finance: -10, happiness: 5, social: 10 } },
  { id: 'poor', label: 'Hoàn cảnh khó khăn', modifier: { finance: -20, happiness: -5, social: 5 } }
]

const careers = [
  { id: 'it', label: '💻 Kỹ sư IT', income: 80, stability: 85, stress: 70 },
  { id: 'teacher', label: '👨‍🏫 Giáo viên', income: 40, stability: 90, stress: 50 },
  { id: 'worker', label: '👷‍♂️ Công nhân', income: 35, stability: 60, stress: 60 },
  { id: 'freelancer', label: '💼 Freelancer', income: 55, stability: 30, stress: 80 },
  { id: 'artist', label: '🎨 Nghệ sĩ', income: 25, stability: 20, stress: 90 },
  { id: 'doctor', label: '👩‍⚕️ Bác sĩ', income: 90, stability: 95, stress: 85 }
]

const marriageChoices = [
  { id: 'early', label: '💕 Kết hôn sớm (22-25 tuổi)', cost: 30, happiness: 20, social: 15 },
  { id: 'late', label: '💍 Kết hôn muộn (28-32 tuổi)', cost: 50, happiness: 10, social: 5 },
  { id: 'never', label: '🚶‍♂️ Không kết hôn', cost: 0, happiness: -5, social: -15 }
]

const childrenChoices = [
  { id: 'none', label: '🚫 Không sinh con', cost: 0, happiness: -10, social: -20 },
  { id: 'one', label: '👶 Một con', cost: 40, happiness: 15, social: 10 },
  { id: 'two', label: '👶👶 Hai con', cost: 70, happiness: 25, social: 20 },
  { id: 'three_plus', label: '👶👶👶+ Ba con trở lên', cost: 100, happiness: 30, social: 25 }
]

export default function LifeChoicesGame() {
  const [stage, setStage] = useState(gameStages.CHARACTER_CREATION)
  const [gameState, setGameState] = useState({
    character: null,
    career: null,
    marriage: null,
    children: null
  })
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  // Calculate stats function
  const calculateStats = useCallback((state = gameState) => {
    if (!state.character || !state.career || !state.marriage || !state.children) {
      return { finance: 50, happiness: 50, social: 50 }
    }

    const background = backgrounds.find(b => b.id === state.character.background)
    const career = careers.find(c => c.id === state.career)
    const marriage = marriageChoices.find(m => m.id === state.marriage)
    const children = childrenChoices.find(c => c.id === state.children)

    let finance = 50 + background.modifier.finance + career.income - marriage.cost - children.cost
    let happiness = 50 + background.modifier.happiness + marriage.happiness + children.happiness - (career.stress * 0.3)
    let social = 50 + background.modifier.social + marriage.social + children.social

    return {
      finance: Math.max(0, Math.min(100, finance)),
      happiness: Math.max(0, Math.min(100, happiness)),
      social: Math.max(0, Math.min(100, social))
    }
  }, [gameState])

  const finalStats = useMemo(() => calculateStats(), [calculateStats])

  const overallScore = useMemo(() => {
    const avg = (finalStats.finance + finalStats.happiness + finalStats.social) / 3
    if (avg >= 80) return { level: 'Xuất sắc', color: 'text-green-600', emoji: '🌟' }
    if (avg >= 65) return { level: 'Tốt', color: 'text-blue-600', emoji: '👍' }
    if (avg >= 50) return { level: 'Bình thường', color: 'text-yellow-600', emoji: '😐' }
    if (avg >= 35) return { level: 'Khó khăn', color: 'text-orange-600', emoji: '😰' }
    return { level: 'Rất khó khăn', color: 'text-red-600', emoji: '😭' }
  }, [finalStats])

  const resetGame = () => {
    setStage(gameStages.CHARACTER_CREATION)
    setGameState({
      character: null,
      career: null,
      marriage: null,
      children: null
    })
    setAiAnalysis(null)
  }

  // Generate AI analysis using Gemini
  const generateAIAnalysis = async (gameData, stats) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'AIzaSyDYour-Gemini-API-Key-Here') {
      // Fallback to static analysis if no API key
      return generateStaticAnalysis(stats)
    }

    setIsLoadingAI(true)
    
    try {
      const bgChoice = backgrounds.find(b => b.id === gameData.character.background)
      const careerChoice = careers.find(c => c.id === gameData.career)
      const marriageChoice = marriageChoices.find(m => m.id === gameData.marriage)
      const childrenChoice = childrenChoices.find(c => c.id === gameData.children)

      const prompt = `
Bạn là một chuyên gia phân tích xã hội học dựa trên lý thuyết Mác-Lênin. Hãy phân tích kết quả của một trò chơi mô phỏng cuộc sống với thông tin sau:

**Thông tin nhân vật:**
- Xuất phát: ${bgChoice?.label}
- Nghề nghiệp: ${careerChoice?.label}
- Quyết định hôn nhân: ${marriageChoice?.label}
- Quyết định sinh con: ${childrenChoice?.label}

**Kết quả cuối cùng:**
- Tài chính: ${Math.round(stats.finance)}/100
- Hạnh phúc: ${Math.round(stats.happiness)}/100  
- Quan hệ xã hội: ${Math.round(stats.social)}/100

**Yêu cầu phân tích:**
1. Áp dụng lý thuyết MLN về mối quan hệ giữa "tồn tại xã hội" và "ý thức xã hội" để giải thích kết quả này
2. Đưa ra 2-3 bài học về cách điều kiện vật chất ảnh hưởng đến quyết định cá nhân
3. Gợi ý 1-2 cách cải thiện tình huống (nếu có)
4. Kết thúc bằng một câu trích dẫn hoặc nguyên lý MLN phù hợp

**Phong cách:** Thân thiện, dễ hiểu, có tính giáo dục cao. Độ dài: 150-200 từ.
`

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error('Gemini API request failed')
      }

      const data = await response.json()
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                     generateStaticAnalysis(stats)

      setAiAnalysis(aiText)
      return aiText

    } catch (error) {
      console.error('Gemini AI Error:', error)
      const fallback = generateStaticAnalysis(stats)
      setAiAnalysis(fallback)
      return fallback
    } finally {
      setIsLoadingAI(false)
    }
  }

  // Static fallback analysis
  const generateStaticAnalysis = (stats) => {
    const avg = (stats.finance + stats.happiness + stats.social) / 3
    
    if (avg >= 80) {
      return `🌟 **Xuất sắc!** Bạn đã tạo ra sự cân bằng tốt giữa các yếu tố cuộc sống. Theo lý thuyết MLN, tồn tại xã hội ổn định đã tạo điều kiện cho ý thức xã hội tích cực về gia đình và hạnh phúc cá nhân. 

**Bài học:** Điều kiện kinh tế tốt không chỉ mang lại an ninh vật chất mà còn tạo nền tảng cho các quyết định tình cảm đúng đắn.

*"Tồn tại quyết định ý thức, nhưng ý thức cũng có tác động trở lại tồn tại"* - K. Marx`
    }
    
    if (avg >= 50) {
      return `😐 **Cân bằng cơ bản.** Bạn đạt được sự ổn định tương đối. Tuy nhiên, vẫn có những mâu thuẫn giữa tồn tại xã hội và ý thức cá nhân cần được giải quyết.

**Gợi ý:** Cần có kế hoạch dài hạn để cải thiện điều kiện vật chất, từ đó tạo nền tảng cho hạnh phúc tinh thần bền vững hơn.

*"Con người tạo ra lịch sử, nhưng không phải trong những điều kiện do họ tự chọn lựa"* - K. Marx`
    }
    
    return `😰 **Thách thức lớn.** Kết quả phản ánh sự căng thẳng giữa điều kiện khách quan và khao khát chủ quan. Tồn tại xã hội khó khăn đã ảnh hưởng mạnh đến các quyết định cá nhân.

**Bài học:** Cần có sự hỗ trợ từ xã hội và nỗ lực cá nhân để thay đổi điều kiện vật chất, tạo nền tảng cho cuộc sống tốt đẹp hơn.

*"Triết gia chỉ giải thích thế giới theo nhiều cách khác nhau; vấn đề là thay đổi nó"* - K. Marx`
  }

  const renderCharacterCreation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-blue-700 mb-4">🎭 Tạo nhân vật của bạn</h3>
        <p className="text-slate-600 mb-6">Chọn giới tính, độ tuổi và bối cảnh xuất phát</p>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Giới tính & Tuổi:</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'male_20', label: '👨 Nam, 20 tuổi' },
              { id: 'female_20', label: '👩 Nữ, 20 tuổi' },
              { id: 'male_25', label: '👨 Nam, 25 tuổi' },
              { id: 'female_25', label: '👩 Nữ, 25 tuổi' }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => setGameState(prev => ({
                  ...prev,
                  character: { ...prev.character, profile: option.id }
                }))}
                className={`p-3 rounded-lg text-sm border transition-colors ${
                  gameState.character?.profile === option.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Bối cảnh xuất phát:</label>
          <div className="space-y-2">
            {backgrounds.map(bg => (
              <button
                key={bg.id}
                onClick={() => setGameState(prev => ({
                  ...prev,
                  character: { ...prev.character, background: bg.id }
                }))}
                className={`w-full p-3 rounded-lg text-sm border text-left transition-colors ${
                  gameState.character?.background === bg.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="font-medium">{bg.label}</div>
                <div className="text-xs text-slate-500 mt-1">
                  Tài chính: {bg.modifier.finance > 0 ? '+' : ''}{bg.modifier.finance} | 
                  Hạnh phúc: {bg.modifier.happiness > 0 ? '+' : ''}{bg.modifier.happiness} | 
                  Xã hội: {bg.modifier.social > 0 ? '+' : ''}{bg.modifier.social}
                </div>
              </button>
            ))}
          </div>
        </div>

        {gameState.character?.profile && gameState.character?.background && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setStage(gameStages.CAREER_CHOICE)}
            className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tiếp tục → Chọn nghề nghiệp
          </motion.button>
        )}
      </div>
    </motion.div>
  )

  const renderCareerChoice = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-blue-700 mb-4">💼 Chọn nghề nghiệp</h3>
        <p className="text-slate-600 mb-6">Mỗi nghề có mức thu nhập, độ ổn định và áp lực khác nhau</p>
      </div>

      <div className="space-y-3">
        {careers.map(career => (
          <button
            key={career.id}
            onClick={() => {
              setGameState(prev => ({ ...prev, career: career.id }))
              setTimeout(() => setStage(gameStages.MARRIAGE_CHOICE), 300)
            }}
            className="w-full p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
          >
            <div className="font-medium text-slate-800 group-hover:text-blue-700">
              {career.label}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2 text-xs">
              <span className="text-green-600">💰 Thu nhập: {career.income}</span>
              <span className="text-blue-600">🛡️ Ổn định: {career.stability}</span>
              <span className="text-red-600">😰 Áp lực: {career.stress}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )

  const renderMarriageChoice = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-blue-700 mb-4">💕 Quyết định hôn nhân</h3>
        <p className="text-slate-600 mb-6">Lựa chọn này sẽ ảnh hưởng đến chi phí, hạnh phúc và quan hệ xã hội</p>
      </div>

      <div className="space-y-3">
        {marriageChoices.map(choice => (
          <button
            key={choice.id}
            onClick={() => {
              setGameState(prev => ({ ...prev, marriage: choice.id }))
              setTimeout(() => setStage(gameStages.CHILDREN_CHOICE), 300)
            }}
            className="w-full p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
          >
            <div className="font-medium text-slate-800 group-hover:text-blue-700">
              {choice.label}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2 text-xs">
              <span className="text-red-600">💸 Chi phí: {choice.cost}</span>
              <span className="text-green-600">😊 Hạnh phúc: {choice.happiness > 0 ? '+' : ''}{choice.happiness}</span>
              <span className="text-blue-600">👥 Xã hội: {choice.social > 0 ? '+' : ''}{choice.social}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )

  const renderChildrenChoice = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-blue-700 mb-4">👶 Quyết định sinh con</h3>
        <p className="text-slate-600 mb-6">Số con sẽ ảnh hưởng đến tài chính, tinh thần và xã hội</p>
      </div>

      <div className="space-y-3">
        {childrenChoices.map(choice => (
          <button
            key={choice.id}
            onClick={async () => {
              const newGameState = { ...gameState, children: choice.id }
              setGameState(newGameState)
              
              setTimeout(async () => {
                setStage(gameStages.RESULTS)
                
                // Generate AI analysis based on final results
                const tempStats = calculateStats(newGameState)
                await generateAIAnalysis(newGameState, tempStats)
              }, 300)
            }}
            className="w-full p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
          >
            <div className="font-medium text-slate-800 group-hover:text-blue-700">
              {choice.label}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2 text-xs">
              <span className="text-red-600">💸 Chi phí: {choice.cost}</span>
              <span className="text-green-600">😊 Hạnh phúc: {choice.happiness > 0 ? '+' : ''}{choice.happiness}</span>
              <span className="text-blue-600">👥 Xã hội: {choice.social > 0 ? '+' : ''}{choice.social}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )

  const renderResults = () => {
    const bgChoice = backgrounds.find(b => b.id === gameState.character.background)
    const careerChoice = careers.find(c => c.id === gameState.career)
    const marriageChoice = marriageChoices.find(m => m.id === gameState.marriage)
    const childrenChoice = childrenChoices.find(c => c.id === gameState.children)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-blue-700 mb-2">🎯 Kết quả cuộc đời của bạn</h3>
          <div className={`text-2xl font-bold ${overallScore.color} mb-4`}>
            {overallScore.emoji} {overallScore.level}
          </div>
        </div>

        {/* Stats Bars */}
        <div className="space-y-4">
          {[
            { key: 'finance', label: 'Tài chính', color: 'bg-green-500', value: finalStats.finance },
            { key: 'happiness', label: 'Hạnh phúc', color: 'bg-yellow-500', value: finalStats.happiness },
            { key: 'social', label: 'Quan hệ xã hội', color: 'bg-blue-500', value: finalStats.social }
          ].map(stat => (
            <div key={stat.key}>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>{stat.label}</span>
                <span>{Math.round(stat.value)}/100</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${stat.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.value}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Choices Summary */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-bold text-slate-800 mb-3">📋 Tóm tắt lựa chọn:</h4>
          <div className="space-y-2 text-sm">
            <div><strong>Xuất phát:</strong> {bgChoice?.label}</div>
            <div><strong>Nghề nghiệp:</strong> {careerChoice?.label}</div>
            <div><strong>Hôn nhân:</strong> {marriageChoice?.label}</div>
            <div><strong>Con cái:</strong> {childrenChoice?.label}</div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            🧠 Phân tích AI theo lý thuyết MLN:
            {isLoadingAI && (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full"
                />
                Đang phân tích...
              </div>
            )}
          </h4>
          
          {aiAnalysis ? (
            <div className="text-sm text-blue-700 space-y-2">
              {aiAnalysis.split('\n').map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={paragraph.startsWith('**') ? 'font-semibold' : ''}
                >
                  {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
                </motion.p>
              ))}
            </div>
          ) : isLoadingAI ? (
            <div className="text-sm text-blue-600">
              <div className="animate-pulse space-y-2">
                <div className="h-3 bg-blue-200 rounded w-full"></div>
                <div className="h-3 bg-blue-200 rounded w-3/4"></div>
                <div className="h-3 bg-blue-200 rounded w-5/6"></div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-blue-700">
              "Tồn tại xã hội quyết định ý thức xã hội. Lựa chọn của bạn phản ánh mối quan hệ biện chứng giữa điều kiện vật chất và quyết định cá nhân."
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-bold"
          >
            🔄 Chơi lại
          </motion.button>
          
          {!aiAnalysis && !isLoadingAI && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => generateAIAnalysis(finalStats, gameState)}
              className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-bold"
            >
              🤖 Phân tích AI
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Share results
              const text = `Tôi vừa chơi Life Choices Game! Kết quả: ${overallScore.level} (Tài chính: ${Math.round(finalStats.finance)}, Hạnh phúc: ${Math.round(finalStats.happiness)}, Xã hội: ${Math.round(finalStats.social)})`
              if (navigator.share) {
                navigator.share({ title: 'Life Choices Game', text })
              } else {
                navigator.clipboard.writeText(text)
                alert('Đã copy kết quả!')
              }
            }}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-bold"
          >
            📤 Chia sẻ
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="game" className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">
          🎮 Trò chơi mô phỏng "Life Choices"
        </h2>
        <p className="text-slate-600">
          Trải nghiệm quá trình ra quyết định quan trọng trong cuộc sống và khám phá mối quan hệ giữa tồn tại xã hội và ý thức xã hội
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-medium text-slate-600 mb-2">
              <span className={stage === gameStages.CHARACTER_CREATION ? 'text-blue-600' : ''}>
                Nhân vật
              </span>
              <span className={stage === gameStages.CAREER_CHOICE ? 'text-blue-600' : ''}>
                Nghề nghiệp
              </span>
              <span className={stage === gameStages.MARRIAGE_CHOICE ? 'text-blue-600' : ''}>
                Hôn nhân
              </span>
              <span className={stage === gameStages.CHILDREN_CHOICE ? 'text-blue-600' : ''}>
                Con cái
              </span>
              <span className={stage === gameStages.RESULTS ? 'text-blue-600' : ''}>
                Kết quả
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ 
                  width: stage === gameStages.CHARACTER_CREATION ? '20%' :
                         stage === gameStages.CAREER_CHOICE ? '40%' :
                         stage === gameStages.MARRIAGE_CHOICE ? '60%' :
                         stage === gameStages.CHILDREN_CHOICE ? '80%' : '100%'
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {stage === gameStages.CHARACTER_CREATION && renderCharacterCreation()}
            {stage === gameStages.CAREER_CHOICE && renderCareerChoice()}
            {stage === gameStages.MARRIAGE_CHOICE && renderMarriageChoice()}
            {stage === gameStages.CHILDREN_CHOICE && renderChildrenChoice()}
            {stage === gameStages.RESULTS && renderResults()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
