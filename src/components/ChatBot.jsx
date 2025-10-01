import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const predefinedResponses = {
  "kết hôn": "Theo quan điểm MLN, quyết định kết hôn chịu ảnh hưởng mạnh từ tồn tại xã hội. Áp lực tài chính, chi phí nhà ở, việc làm không ổn định khiến giới trẻ cân nhắc. Bạn đang lo lắng điều gì cụ thể về kết hôn?",
  "sinh con": "Sinh con là quyết định lớn! Tồn tại xã hội hiện tại (thu nhập, chi phí nuôi dạy, hỗ trợ xã hội) tác động trực tiếp đến ý thức về sinh con. Chi phí giáo dục, y tế ngày càng cao làm nhiều cặp đôi trì hoãn.",
  "tài chính": "Đúng rồi! Tồn tại xã hội (điều kiện kinh tế) quyết định ý thức xã hội (thái độ với hôn nhân). Khi thu nhập thấp, áp lực chi phí cao, tự nhiên sẽ ngại cam kết dài hạn. Bạn có kế hoạch tài chính cụ thể nào chưa?",
  "áp lực": "Áp lực xã hội là biểu hiện của mâu thuẫn giữa ý thức và tồn tại. Gia đình muốn bạn kết hôn (ý thức truyền thống) nhưng điều kiện vật chất chưa cho phép (tồn tại hiện tại). Đây chính là tính độc lập tương đối của ý thức xã hội!",
  "gia đình": "Gia đình thường có ý thức xã hội truyền thống, trong khi bạn sống trong tồn tại xã hội hiện đại. Xung đột này rất bình thường! Quan trọng là tìm được sự cân bằng giữa kỳ vọng gia đình và thực tế cá nhân.",
  "sợ": "Nỗi sợ là phản ứng tự nhiên khi tồn tại xã hội không ổn định. Sợ cam kết vì lo không đủ khả năng, sợ thay đổi cuộc sống... Hãy phân tích cụ thể bạn sợ điều gì để tìm giải pháp phù hợp!",
  "trì hoãn": "Trì hoãn thể hiện tính vượt trước của ý thức - bạn đang chờ tồn tại xã hội thay đổi tích cực hơn. Đây là biểu hiện của tính độc lập tương đối! Nhưng cần cân nhắc: chờ đợi mãi hay tự tạo điều kiện?",
  "xin chào": "Xin chào! Tôi là chuyên viên tư vấn hôn nhân dựa trên lý thuyết Mác-Lênin. Tôi có thể giúp bạn phân tích mối quan hệ giữa điều kiện sống (tồn tại xã hội) và thái độ với kết hôn (ý thức xã hội). Bạn muốn tâm sự điều gì? 💭",
  "hello": "Hello! Tôi là AI tư vấn hôn nhân theo lý thuyết MLN. Tôi có thể hỗ trợ phân tích các vấn đề về kết hôn, sinh con từ góc độ khoa học xã hội. What's on your mind? 🤔",
  "help": "🔹 **Tôi có thể tư vấn về:**\n• Kết hôn & sinh con\n• Áp lực tài chính\n• Áp lực gia đình & xã hội\n• Nỗi sợ cam kết\n• Kế hoạch tương lai\n• Mối quan hệ tình cảm\n\nTất cả đều dựa trên lý thuyết MLN về mối quan hệ ý thức - tồn tại xã hội! Hãy chia sẻ vấn đề cụ thể nhé.",
  "thank": "Cảm ơn bạn đã tin tương! Tôi hy vọng lời tư vấn có thể giúp bạn thấy rõ hơn về tình huống. Nhớ rằng: mọi quyết định đều cần thời gian và suy nghĩ kỹ lưỡng. Chúc bạn tìm được hạnh phúc! 🌟",
  "cảm ơn": "Rất vui được hỗ trợ bạn! Hãy nhớ rằng mọi vấn đề đều có giải pháp, chỉ cần phân tích đúng góc độ. Chúc bạn luôn mạnh mẽ và tự tin trong mọi quyết định! 💪✨"
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatbot_messages')
    return saved ? JSON.parse(saved) : [
      {
        type: 'bot',
        content: 'Xin chào! Mình là Mai, chuyên viên tư vấn hôn nhân đây! 😊 Bạn có thể thoải mái tâm sự với mình về bất kỳ điều gì - từ chuyện tình cảm, gia đình, đến những lo lắng trong cuộc sống. Mình luôn sẵn sàng lắng nghe! Bạn muốn nói chuyện về gì nhỉ?',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ]
  })
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)
  const lastResponseRef = useRef(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    localStorage.setItem('chatbot_messages', JSON.stringify(messages))
  }, [messages])

  // Speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'vi-VN'
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }
      recognitionRef.current.onerror = () => setIsListening(false)
      recognitionRef.current.onend = () => setIsListening(false)
    }
  }, [])

  // TTS
  const speakText = (text) => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'vi-VN'
      utterance.rate = 1.4
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  // Simple math calculator
  const evaluateSimpleMath = (input) => {
    try {
      // Extract numbers and operators
      const mathMatch = input.match(/(\d+)\s*([+\-*/×÷])\s*(\d+)/)
      if (!mathMatch) return null
      
      const num1 = parseInt(mathMatch[1])
      const operator = mathMatch[2]
      const num2 = parseInt(mathMatch[3])
      
      switch (operator) {
        case '+':
          return `${num1} + ${num2} = ${num1 + num2}`
        case '-':
          return `${num1} - ${num2} = ${num1 - num2}`
        case '*':
        case '×':
          return `${num1} × ${num2} = ${num1 * num2}`
        case '/':
        case '÷':
          if (num2 === 0) return "Không thể chia cho 0 nhé bạn! 😅"
          return `${num1} ÷ ${num2} = ${num1 / num2}`
        default:
          return null
      }
    } catch {
      return null
    }
  }

  // Human-like conversation AI with personality
  const generateNaturalResponse = (input) => {
    const lowInput = input.toLowerCase().trim()
    
    // Greeting patterns
    if (lowInput.match(/^(xin chào|hello|hi|chào|hey|hế lô).*$/)) {
      const greetings = [
        "Chào bạn! Mình là Mai, chuyên viên tư vấn hôn nhân. Hôm nay bạn thế nào? 😊",
        "Hi! Tôi là Mai đây. Rất vui được gặp bạn! Bạn muốn tâm sự về điều gì không?",
        "Xin chào! Mình là Mai, có thể gọi mình là chị Mai. Bạn đang có gì băn khoăn về chuyện tình cảm không?"
      ]
      return greetings[Math.floor(Math.random() * greetings.length)]
    }
    
    // How are you patterns
    if (lowInput.match(/(bạn thế nào|khỏe không|sao rồi|thế nào rồi)/)) {
      return "Cảm ơn bạn hỏi thăm! Mình vẫn khỏe và sẵn sàng lắng nghe tâm sự của bạn. Còn bạn thì sao? Có gì đang làm bạn lo lắng không? 🤗"
    }
    
    // Age/personal questions
    if (lowInput.match(/(bao nhiêu tuổi|mấy tuổi|tuổi gì|sinh năm)/)) {
      return "Haha, mình cũng không biết chính xác tuổi mình nữa 😅 Nhưng mình đã có nhiều năm kinh nghiệm tư vấn rồi đấy! Quan trọng hơn là bạn đang ở độ tuổi nào và đang trăn trở gì về chuyện tình cảm?"
    }
    
    // Economic/financial concerns
    if (lowInput.match(/(tiền|lương|thu nhập|nghèo|giàu|kinh tế|chi phí|đắt|tài chính|tiết kiệm|mua nhà|xe|vay)/)) {
      const responses = [
        "Ờm... vấn đề tài chính thật sự là nỗi lo lớn của nhiều bạn trẻ bây giờ. Mình hiểu cảm giác áp lực đó lắm! Theo kinh nghiệm của mình, quan trọng là có kế hoạch rõ ràng và thảo luận thẳng thắn với người yêu. Tình hình tài chính của bạn hiện tại như thế nào?",
        "Chuyện tiền bạc luôn là vấn đề nhạy cảm nhỉ? Mình thấy nhiều cặp đôi chia tay vì không cùng tầm nhìn tài chính. Bạn và người yêu có thống nhất được về mục tiêu tài chính không?",
        "Thật ra, hạnh phúc không hoàn toàn phụ thuộc vào tiền đâu bạn. Mình từng tư vấn cho những cặp đôi không giàu có nhưng rất hạnh phúc vì hiểu nhau. Điều quan trọng là cả hai cùng nỗ lực và có trách nhiệm. Bạn đang lo lắng điều gì cụ thể?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Family pressure
    if (lowInput.match(/(bố mẹ|gia đình|họ hàng|ép buộc|áp lực|thúc giục|ba má|parents)/)) {
      const responses = [
        "Ôi, áp lực gia đình à? Mình hiểu lắm! Ba mẹ thường có tâm lý muốn con cái ổn định sớm, nhưng họ không hiểu hết khó khăn của thế hệ trẻ bây giờ. Bạn có thử nói chuyện thẳng thắn với ba mẹ chưa?",
        "Thế hệ ba mẹ và chúng ta thật sự khác nhau nhiều về cách nhìn nhận hôn nhân. Họ kết hôn sớm, còn giờ cuộc sống phức tạp hơn nhiều. Mình nghĩ bạn nên giải thích cho họ hiểu về hoàn cảnh hiện tại. Ba mẹ bạn có khó tính lắm không?",
        "Mình từng gặp nhiều trường hợp như bạn rồi. Thường thì ba mẹ chỉ lo lắng cho tương lai con cái thôi. Bạn thử đưa ra một timeline cụ thể xem, như 'con sẽ kết hôn trong 2-3 năm tới khi ổn định công việc'. Họ sẽ yên tâm hơn đấy!"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Fear and anxiety
    if (lowInput.match(/(sợ|lo lắng|e ngại|không tự tin|bất an|hoảng|scared|afraid|worry)/)) {
      const responses = [
        "Mình hiểu cảm giác sợ hãi của bạn. Kết hôn là quyết định lớn mà, sợ là bình thường thôi! Quan trọng là phân tích xem mình sợ cái gì để có cách đối phó. Bạn sợ nhất điều gì trong chuyện kết hôn?",
        "Ôi, bạn đừng tự ti quá! Mọi người đều có lúc lo lắng về tương lai cả. Điều quan trọng là phải đối mặt với nỗi sợ chứ không chạy trốn. Bạn có muốn chia sẻ cụ thể hơn không?",
        "Nỗi sợ thường xuất phát từ việc chúng ta chưa chuẩn bị đủ hoặc thiếu thông tin. Mình nghĩ bạn nên tìm hiểu kỹ hơn về những gì mình đang lo và lập kế hoạch cụ thể. Vậy bạn sợ nhất khía cạnh nào của việc kết hôn?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Career concerns  
    if (lowInput.match(/(công việc|sự nghiệp|thất nghiệp|job|career|work|thăng tiến|lương)/)) {
      return "Chuyện sự nghiệp quan trọng lắm đấy! Một công việc ổn định sẽ giúp bạn tự tin hơn trong các mối quan hệ. Bạn đang làm công việc gì vậy? Có thấy hài lòng với hiện tại không?"
    }
    
    // Relationship concerns
    if (lowInput.match(/(người yêu|bạn gái|bạn trai|crush|love|relationship|tình cảm|yêu thương)/)) {
      const responses = [
        "Ồ, chuyện tình cảm à? Mình rất thích nghe những câu chuyện tình yêu đấy! Bạn và người ấy quen nhau được bao lâu rồi? Tình hình thế nào?",
        "Tình yêu đẹp lắm nhỉ! Nhưng để có một mối quan hệ bền vững thì cần nhiều thứ hơn là chỉ có tình cảm. Bạn và người yêu có hiểu nhau không?",
        "Mình hy vọng bạn đang có một mối quan hệ tốt đẹp! Tình yêu là nền tảng, nhưng sự tương thích về giá trị sống cũng rất quan trọng. Hai bạn có cùng hướng về tương lai không?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Marriage related
    if (lowInput.match(/(kết hôn|cưới|marriage|wedding|lấy chồng|lấy vợ|đám cưới)/)) {
      return "Kết hôn là một quyết định rất quan trọng trong đời! Mình luôn khuyên các bạn trẻ hãy suy nghĩ kỹ và chuẩn bị thật chu đáo. Bạn đang có dự định gì về chuyện này không?"
    }
    
    // Children related
    if (lowInput.match(/(sinh con|có con|children|baby|em bé|nuôi con)/)) {
      return "Sinh con là trách nhiệm rất lớn đấy! Không chỉ về mặt tài chính mà còn về thời gian và năng lượng nữa. Bạn đã sẵn sàng cho việc này chưa? Hay đang lo lắng về điều gì?"
    }
    
    // Math and general knowledge
    if (lowInput.match(/(\d+)\s*[+\-*/×÷]\s*(\d+)/)) {
      const mathAnswer = evaluateSimpleMath(lowInput)
      if (mathAnswer !== null) {
        const mathResponses = [
          `${mathAnswer} đấy bạn! 😄 Toán học dễ thế mà! Giờ thử hỏi mình về chuyện tình cảm xem, khó hơn nhiều đó! 💕`,
          `Kết quả là: ${mathAnswer}! 🤓 Mình giải được rồi nhé! Vậy còn phương trình tình yêu thì sao? Bạn có đang "tính toán" với ai không? 😉`,
          `${mathAnswer} nha bạn! Easy! 📊 Nhưng mà tính toán tình cảm phức tạp hơn nhiều đấy. Bạn có muốn chia sẻ về "phép tính" tình yêu của mình không?`
        ]
        return mathResponses[Math.floor(Math.random() * mathResponses.length)]
      }
    }
    
    // Time questions
    if (lowInput.match(/(mấy giờ|giờ|time|thời gian)/)) {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      return `Bây giờ là ${timeStr} rồi bạn! Thời gian trôi nhanh nhỉ? Mình hay nghĩ, thời gian quý báu lắm, nên đừng để tuổi trẻ trôi qua mà không dám yêu đương gì nhé! Bạn có đang yêu ai không? 😉`
    }
    
    // Weather questions  
    if (lowInput.match(/(thời tiết|weather|nóng|lạnh|mưa|nắng)/)) {
      return "Mình không biết thời tiết bên ngoài thế nào, nhưng mình hy vọng trái tim bạn luôn ấm áp! 🌞 Thời tiết đẹp thì thích hợp để hẹn hò đấy, bạn có ai đặc biệt để đi chơi cùng không? 😊"
    }
    
    // Fun facts
    if (lowInput.match(/(màu gì|color|favorite|thích)/)) {
      return "Mình thích màu hồng! Màu của tình yêu mà! 💕 Còn bạn thích màu gì? Bạn có biết không, người yêu nhau thường có xu hướng thích những màu sắc tương tự nhau đấy!"
    }
    
    // Simple yes/no questions
    if (lowInput.match(/(có phải không|đúng không|có đúng|yes or no)/)) {
      const responses = [
        "Ừm... có thể đúng, có thể sai! Cuộc sống không phải lúc nào cũng đen trắng rõ ràng đâu bạn. Giống như chuyện tình cảm vậy! 😊",
        "Haha, câu hỏi khó đấy! Mình nghĩ còn tùy hoàn cảnh. Bạn muốn hỏi về chuyện gì thế?",
        "Tùy! 😄 Nhưng mình tin rằng mọi thứ đều có lý do của nó. Bạn đang phân vân về điều gì vậy?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Random questions
    if (lowInput.match(/(tên gì|tên|name|ai|who)/)) {
      return "Mình tên Mai đấy! Bạn có thể gọi mình là chị Mai. Mình làm tư vấn viên hôn nhân và rất thích được lắng nghe tâm sự của mọi người. Còn bạn tên gì?"
    }
    
    // Thank you
    if (lowInput.match(/(cảm ơn|thanks|thank you|cám ơn)/)) {
      return "Không có gì đâu! Mình rất vui được giúp đỡ bạn. Đó là công việc mà mình yêu thích mà! Bạn có gì thắc mắc nữa không?"
    }
    
    // Goodbye
    if (lowInput.match(/(tạm biệt|bye|goodbye|chào|hẹn gặp lại)/)) {
      return "Tạm biệt bạn nhé! Hy vọng cuộc trò chuyện hôm nay có ích cho bạn. Nhớ rằng mình luôn ở đây khi bạn cần tâm sự đấy! Chúc bạn mọi điều tốt lành! 🌈"
    }
    
    return null
  }

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase().trim()
    
    // First try natural conversation patterns
    const naturalResponse = generateNaturalResponse(userInput)
    if (naturalResponse) {
      // Prevent duplicate responses
      if (lastResponseRef.current === naturalResponse) {
        return "Mình vừa trả lời rồi mà bạn! 😅 Có gì khác bạn muốn hỏi không? Hoặc kể chi tiết hơn về vấn đề của bạn nhé!"
      }
      lastResponseRef.current = naturalResponse
      return naturalResponse
    }
    
    // Then check predefined responses but make them more contextual
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (input.includes(key)) {
        // Add some personality variation to avoid repetition
        const personalizedResponse = response + "\n\nBạn có muốn chia sẻ thêm về tình huống cụ thể không? Mình sẽ tư vấn chi tiết hơn! 😊"
        return personalizedResponse
      }
    }
    
    // General conversation starters based on keywords
    if (input.length < 3) {
      return "Hm? Bạn muốn nói gì thế? 🤔"
    }
    
    // If contains question words, respond helpfully
    if (input.match(/(sao|tại sao|tại|vì sao|why|how|làm sao|thế nào|có nên|nên không|có phải)/)) {
      return "Đây là câu hỏi hay đấy! Mình nghĩ để trả lời được, mình cần hiểu rõ hơn về hoàn cảnh của bạn. Bạn có thể chia sẻ chi tiết hơn không? Mình sẽ cố gắng tư vấn thật tận tình! 😊"
    }
    
    // If mentions emotions, be empathetic
    if (input.match(/(buồn|vui|hạnh phúc|stress|mệt|khó khăn|vấn đề|problem|sad|happy)/)) {
      return "Mình cảm nhận được cảm xúc trong lời nói của bạn. Tâm trạng ảnh hưởng rất nhiều đến các quyết định trong cuộc sống đấy. Bạn muốn tâm sự với mình về điều gì đang làm bạn cảm thấy như vậy không?"
    }
    
    // Default friendly response
    const defaultResponses = [
      "Mình nghe bạn nói rồi, nhưng có thể bạn nói rõ hơn một chút được không? Mình muốn hiểu để tư vấn cho bạn tốt nhất! 😊",
      "Ừm... mình cần thêm thông tin để có thể giúp bạn tốt hơn. Bạn có thể kể chi tiết hơn về tình huống của mình không?",
      "Nghe có vẻ thú vị đấy! Nhưng bạn có thể chia sẻ thêm để mình hiểu rõ hơn không? Mình sẽ cố gắng tư vấn hết mình!",
      "Mình đang lắng nghe bạn đây! Có thể bạn kể cụ thể hơn về những gì đang làm bạn băn khoăn không?"
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      type: 'user',
      content: input,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsTyping(true)

    // Get bot response with realistic delay
    setTimeout(() => {
      const responseText = getBotResponse(currentInput)
      const botResponse = {
        type: 'bot',
        content: responseText,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
      
      // Speak response if voice is enabled
      speakText(responseText)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }



  const clearHistory = () => {
    const initialMessage = {
      type: 'bot',
      content: 'Xin chào! Mình là Mai, chuyên viên tư vấn hôn nhân đây! 😊 Bạn có thể thoải mái tâm sự với mình về bất kỳ điều gì - từ chuyện tình cảm, gia đình, đến những lo lắng trong cuộc sống. Mình luôn sẵn sàng lắng nghe! Bạn muốn nói chuyện về gì nhỉ?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([initialMessage])
    localStorage.removeItem('chatbot_messages')
  }

  return (
    <>
      {/* Nút mở chat */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>💬</motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
        />
      </motion.button>

      {/* Cửa sổ chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🤖</div>
                <div>
                  <h3 className="font-semibold">Chị Mai - Tư vấn viên</h3>
                  <p className="text-xs opacity-80">🟢 Online • {messages.length - 1} tin nhắn</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${isVoiceEnabled ? 'bg-white/30' : 'bg-white/10'} hover:bg-white/40`}
                  title="Toggle voice"
                >
                  {isVoiceEnabled ? '🔊' : '🔇'}
                </button>
                <button
                  onClick={clearHistory}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center"
                  title="Clear history"
                >
                  🗑️
                </button>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">✕</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-slate-100 text-slate-800 rounded-bl-md'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>{msg.time}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-slate-100 text-slate-800 p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} className="w-2 h-2 bg-slate-400 rounded-full" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-2">
                <p className="text-xs text-slate-500 mb-2">Có thể bắt đầu bằng:</p>
                <div className="flex flex-wrap gap-1">
                  {["Chào chị Mai!", "Em đang có chút băn khoăn về tình cảm", "Gia đình cứ hỏi chuyện kết hôn", "Em sợ chưa đủ tiền để kết hôn", "Chị có thể tư vấn giúp em không?"].map((q, idx) => (
                    <button key={idx} onClick={() => setInput(q)} className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-full transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2 mb-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Chia sẻ băn khoăn của bạn..."
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                />
                {recognitionRef.current && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={startListening}
                    disabled={isListening}
                    className={`px-3 py-2 rounded-xl ${isListening ? 'bg-red-500 text-white' : 'border border-slate-200 hover:bg-slate-50'}`}
                    title="Voice input"
                  >
                    {isListening ? '🎤' : '🎙️'}
                  </motion.button>
                )}
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSend} disabled={!input.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  📤
                </motion.button>
              </div>
              <div className="flex items-center justify-end text-xs text-slate-500">
                <span>{isListening ? 'Đang nghe...' : 'Enter để gửi'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
