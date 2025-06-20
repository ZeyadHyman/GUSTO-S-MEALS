import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoSend } from "react-icons/io5";
import { GiChefToque } from "react-icons/gi";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const genAI = new GoogleGenerativeAI("AIzaSyC4Xnq6Rb1jMCmTd1cPbu8B4yGZwKIxwW4");

function isCookingQuestion(question: string): boolean {
  const keywords = [
    // English cooking keywords
    "cook",
    "cooking",
    "recipe",
    "bake",
    "grill",
    "fry",
    "boil",
    "kitchen",
    "ingredient",
    "meal",
    "dish",
    "food",
    "oven",
    "stove",
    "microwave",
    "how to make",
    "how do i make",
    "prepare",
    "chop",
    "slice",
    "mix",
    "blend",
    "roast",
    "steam",
    "saute",
    "broil",
    "marinate",
    "season",
    "spice",
    "herb",
    "simmer",
    "poach",
    "whisk",
    "knead",
    "dough",
    "pastry",
    "bread",
    "cake",
    "dessert",
    "soup",
    "stew",
    "salad",
    "sauce",
    "gravy",
    "barbecue",
    "BBQ",
    "griddle",
    "pan",
    "pot",
    "skillet",
    "bowl",
    "plate",
    "serve",
    "garnish",
    "chopsticks",
    "fork",
    "knife",
    "spoon",
    "apron",
    "timer",
    "temperature",
    "degrees",
    "minutes",
    "hours",
    "mixing",
    "measuring",
    "cup",
    "tablespoon",
    "teaspoon",
    "ml",
    "liter",
    "gram",
    "kg",
    "ounce",
    "pound",
    "bakeware",
    "utensil",
    "kitchenware",
    "cuisine",
    "taste",
    "flavor",
    "sweet",
    "sour",
    "bitter",
    "salty",
    "umami",
    "spicy",
    "hot",
    "cold",
    "freeze",
    "defrost",
    "thaw",
    "microwave",
    "reheat",
    "leftovers",
    "portion",
    "serving",
    "nutrition",
    "calories",
    "protein",
    "carb",
    "fat",
    "vegan",
    "vegetarian",
    "halal",
    "kosher",
    "gluten",
    "allergy",
    "intolerance",
    "substitute",
    "alternative",
    "homemade",
    "from scratch",
    "traditional",
    "classic",
    "modern",
    "fusion",
    "international",
    "ethnic",
    "regional",
    "local",
    "street food",
    "fast food",
    "fine dining",
    "gourmet",
    "chef",
    "cookbook",
    "cooking show",
    "cooking tips",
    "cooking tricks",
    "cooking advice",
    "cooking help",
    "cooking question",
    "kitchen hack",
    "kitchen tip",
    "kitchen trick",
    "kitchen advice",
    "kitchen help",
    "kitchen question",
    // Arabic cooking keywords (in Arabic script)
    "طبخ",
    "طبخة",
    "طبخي",
    "طبخات",
    "طبخين",
    "طبخية",
    "طبخية",
    "مطبخ",
    "مطبخي",
    "مطبخك",
    "مطبخنا",
    "مطبخكم",
    "مطبخهم",
    "مطبخها",
    "مطبخه",
    "مطبخات",
    "مقادير",
    "مكون",
    "مكونات",
    "وصفة",
    "وصفات",
    "طريقة",
    "طرق",
    "تحضير",
    "تحضيرات",
    "خبز",
    "شوي",
    "قلي",
    "سلق",
    "مقلي",
    "مسلوق",
    "مشوي",
    "مخبوز",
    "مقلي",
    "مسلوق",
    "مفروم",
    "مقطع",
    "مبشور",
    "مطحون",
    "مخلل",
    "مملح",
    "حلو",
    "مالح",
    "حار",
    "بارد",
    "مقبلات",
    "شوربة",
    "سلطة",
    "صلصة",
    "تتبيلة",
    "بهارات",
    "توابل",
    "مذاق",
    "نكهة",
    "طعم",
    "مائدة",
    "غداء",
    "عشاء",
    "فطور",
    "سحور",
    "مائدة",
    "مائدة رمضان",
    "مائدة العيد",
    "عيد",
    "رمضان",
    "حلويات",
    "معجنات",
    "مقبلات",
    "أرز",
    "رز",
    "لحم",
    "دجاج",
    "سمك",
    "خضار",
    "خضروات",
    "فاكهة",
    "فواكه",
    "ماء",
    "زيت",
    "سمن",
    "زبدة",
    "سكر",
    "ملح",
    "فلفل",
    "كمون",
    "كزبرة",
    "زنجبيل",
    "قرفة",
    "قرنفل",
    "هيل",
    "زعفران",
    "كركم",
    "بابريكا",
    "شطة",
    "ليمون",
    "خل",
    "ثوم",
    "بصل",
    "طماطم",
    "بندورة",
    "بطاطا",
    "جزر",
    "كوسا",
    "باذنجان",
    "فلفل",
    "فليفلة",
    "خيار",
    "خس",
    "سبانخ",
    "ملوخية",
    "بامية",
    "فاصوليا",
    "عدس",
    "حمص",
    "فول",
    "فطر",
    "بيض",
    "جبن",
    "لبن",
    "حليب",
    "قشطة",
    "كريمة",
    "عصير",
    "شاي",
    "قهوة",
    "مشروب",
    "مشروبات",
    "مائدة",
    "سفرة",
    "طبق",
    "أطباق",
    "صحن",
    "صحون",
    "كوب",
    "كؤوس",
    "ملعقة",
    "شوكة",
    "سكين",
    "قدر",
    "طنجرة",
    "مقلاة",
    "صينية",
    "فرن",
    "موقد",
    "غاز",
    "نار",
    "حرارة",
    "درجة حرارة",
    "دقيقة",
    "دقائق",
    "ساعة",
    "ساعات",
    "مقدار",
    "وزن",
    "كيلو",
    "غرام",
    "جرام",
    "مل",
    "لتر",
    "مليلتر",
    "ملاعق",
    "ملعقة كبيرة",
    "ملعقة صغيرة",
    "كوب",
    "أكواب",
    "مائدة",
    "سفرة",
    "مائدة الطعام",
    "سفرة الطعام",
    "مائدة الإفطار",
    "مائدة الغداء",
    "مائدة العشاء",
  ];
  const lower = question.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

async function askGemini(question: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();
    return text || "No response from Gemini";
  } catch {
    return "Sorry, I encountered an error. Please try again.";
  }
}

const CookingChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages or loading change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    let botMsg: Message;
    if (isCookingQuestion(userMsg.text)) {
      const response = await askGemini(userMsg.text);
      botMsg = { sender: "bot", text: response };
    } else {
      botMsg = {
        sender: "bot",
        text: "I'm here to help with cooking questions! Ask me about recipes, ingredients, or techniques.",
      };
    }
    setMessages((msgs) => [...msgs, botMsg]);
    setLoading(false);
  };

  return (
    <div className="lg:min-h-screen h-full w-full flex lg:items-center lg:justify-center bg-gray-50">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg h-full">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
          <GiChefToque size={32} className="text-orange-400" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Cooking Chatbot</h2>
            <p className="text-xs text-gray-400">
              Ask about recipes, ingredients, or techniques
            </p>
          </div>
        </div>
        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto h-[calc(100vh-350px)] px-6 py-4 bg-white border-b border-gray-100"
        >
          {messages.length === 0 && (
            <div className="text-gray-300 text-center mt-5">
              Ask me anything about cooking!
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`px-5 py-3 rounded-3xl text-sm whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-orange-400 text-white rounded-br-md"
                    : "bg-gray-200 text-gray-800 rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-gray-400 text-sm mt-2">Bot is typing...</div>
          )}
        </div>
        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2 px-6 py-3 bg-white rounded-b-2xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) sendMessage();
            }}
            placeholder="Ask a cooking question..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-base"
            disabled={loading}
            aria-label="Ask a cooking question"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 rounded-lg bg-orange-400 text-white disabled:bg-gray-200 disabled:text-gray-400"
            aria-label="Send"
          >
            <IoSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CookingChatbot;
