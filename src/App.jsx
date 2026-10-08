import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  BookOpen, Sparkles, FileText, Brain, Users, Award, CheckCircle, Clock,
  Settings, Plus, Send, Volume2, Layers, BarChart3, Globe, Moon, Sun,
  Trash2, Edit3, Search, Share2, AlertCircle, X, ChevronRight, Play,
  Check, HelpCircle, RotateCcw, UploadCloud, Lock, Unlock, Copy,
  MessageSquare, Flame, FileCode, CheckSquare, Target, User, LogOut,
  ArrowLeft, RefreshCw, Bookmark, Zap, Compass, Filter, Share,
  Download, Smartphone, HardDriveDownload, DownloadCloud
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    appName: "StudySphere",
    tagline: "Understand. Practice. Master. Together.",
    welcomeBack: "Welcome back",
    dailyGoal: "Daily Study Goal",
    minsStudied: "mins studied today",
    quickActions: "Quick Actions",
    uploadMaterial: "Upload PDF / Material",
    aiTutor: "AI Tutor",
    generateExam: "Generate Exam",
    createRoom: "Study Room",
    continueStudying: "Continue Studying",
    recentFiles: "Recent Materials",
    smartRecs: "AI Smart Recommendations",
    recMessage: "You scored 65% on Chapter 3. We recommend reviewing 'Cell Structure' before taking another practice exam.",
    navHome: "Home",
    navLibrary: "Library",
    navTutor: "AI Tutor",
    navRooms: "Rooms",
    navProfile: "Profile",
    navPlanner: "Planner",
    navMistakes: "Mistakes",
    login: "Sign In",
    register: "Create Account",
    logout: "Log Out",
    studentName: "Student Name",
    gradeLevel: "Academic Grade",
    favSubjects: "Favorite Subjects",
    prefLang: "Preferred Output Language",
    uploadTitle: "PDF & Document Analyzer",
    uploadSubtitle: "Upload PDFs, lecture slides, books or notes to get AI summaries, explanations & exams.",
    dropZone: "Click or drag files here (PDF, DOCX, TXT, Images)",
    summarize: "Summarize",
    explain: "Explain Topic",
    askMaterial: "Ask Material",
    flashcards: "Flashcards",
    summaryType: "Summary Style",
    shortSummary: "Short Summary",
    detailedSummary: "Detailed Summary",
    bulletPoints: "Key Points & Definitions",
    explainLevel: "Explanation Mode",
    simpleLevel: "Explain Simply (ELI5)",
    detailedLevel: "In-depth Step by Step",
    examplesLevel: "Practical Real-world Examples",
    generateSummaryBtn: "Generate AI Summary",
    askingMaterialPlaceholder: "Ask anything about this document...",
    sourcesFound: "Source Page / Section Cited",
    examTitle: "AI Exam Generator",
    numQuestions: "Number of Questions",
    difficulty: "Difficulty",
    questionTypes: "Question Types",
    duration: "Duration (Mins)",
    startExam: "Start AI Exam",
    timeRemaining: "Time Remaining",
    submitExam: "Submit Answers",
    examResults: "Exam Results",
    score: "Your Score",
    reviewAnswers: "Review Mistakes & Explanations",
    mcq: "Multiple Choice",
    trueFalse: "True / False",
    shortAns: "Short Answer",
    mixed: "Mixed Format",
    myMistakes: "Mistake Notebook",
    mistakesSub: "Questions you answered incorrectly are stored here for targeted revision.",
    retryQuestion: "Retry Question",
    noMistakes: "No mistakes recorded yet! Great job studying.",
    roomTitle: "Collaborative Study Rooms",
    createRoomBtn: "Create Temporary Room",
    roomName: "Room Title",
    maxMembers: "Max Participants",
    endRoom: "End Study Room",
    roomClosedNotice: "This room has been ended by the host. All files and chat logs are now closed.",
    inviteLink: "Copy Room Link",
    copied: "Link copied!",
    sendMsg: "Send message or ask AI...",
    askGroupAI: "@AI Group Study Assistant",
    notesTitle: "Study Notes",
    createNote: "New Personal Note",
    aiConvertNote: "Convert Material to Smart Note",
    studyPlanner: "AI Study Planner",
    scheduleExam: "Upcoming Exam Schedule",
    language: "Language / اللغة",
    theme: "Theme Mode",
    dark: "Dark Mode",
    light: "Light Mode",
    rtlToggle: "Switch to Arabic (RTL)",
    ltrToggle: "Switch to English (LTR)",
    useMyFiles: "Prioritize My Uploaded Files",
    analyzingText: "AI Reading document... Extracting key concepts...",
    installApp: "Install App (PWA)",
    downloadAppDesc: "Install StudySphere on your device for fast, offline-ready access.",
    downloadSummary: "Download Summary",
    appInstalled: "App Installed Successfully!",
  },
  ar: {
    appName: "StudySphere",
    tagline: "افهم. تدرّب. أتقن. معاً.",
    welcomeBack: "مرحباً بعودتك",
    dailyGoal: "هدف الدراسة اليومي",
    minsStudied: "دقيقة تمت دراستها اليوم",
    quickActions: "إجراءات سريعة",
    uploadMaterial: "رفع ملف PDF / ملخص",
    aiTutor: "المعلم الذكي",
    generateExam: "إنشاء اختبار ذكي",
    createRoom: "غرفة دراسة جماعية",
    continueStudying: "متابعة الدراسة",
    recentFiles: "المواد الدراسية الأخيرة",
    smartRecs: "توصيات الذكاء الاصطناعي",
    recMessage: "حققت 65% في الفصل الثالث. نوصي بمراجعة درس 'تركيب الخلية' قبل أداء اختبار جديد.",
    navHome: "الرئيسية",
    navLibrary: "المكتبة",
    navTutor: "المعلم",
    navRooms: "الغرف",
    navProfile: "الحساب",
    navPlanner: "الخطة",
    navMistakes: "أخطائي",
    login: "تسجيل الدخول",
    register: "إنشاء حساب جديد",
    logout: "تسجيل الخروج",
    studentName: "اسم الطالب",
    gradeLevel: "المرحلة الدراسية",
    favSubjects: "المواد المفضلة",
    prefLang: "لغة المخرجات المفضلة",
    uploadTitle: "محلل ملفات PDF والمستندات",
    uploadSubtitle: "قم برفع ملفات PDF، العروض التقديمية، الكتب أو الملاحظات للحصول على ملخصات واختبارات شرح ذكي.",
    dropZone: "اضغط أو اسحب الملفات هنا (PDF, DOCX, TXT, صور)",
    summarize: "تلخيص",
    explain: "شرح وتبسيط",
    askMaterial: "اسأل المستند",
    flashcards: "بطاقات الاستذكار",
    summaryType: "أسلوب التلخيص",
    shortSummary: "ملخص موجز",
    detailedSummary: "ملخص تفصيلي شامل",
    bulletPoints: "نقاط رئيسية ومصطلحات",
    explainLevel: "مستوى الشرح",
    simpleLevel: "شرح مبسط جداً (كما لشخص مبتدئ)",
    detailedLevel: "شرح عميق خطوة بخطوة",
    examplesLevel: "أمثلة عملية واقعية",
    generateSummaryBtn: "توليد الملخص بالذكاء الاصطناعي",
    askingMaterialPlaceholder: "اسأل أي سؤال حول محتوى هذا المستند...",
    sourcesFound: "الصفحة / القسم المرجعي من المستند",
    examTitle: "مولد الاختبارات الذكي",
    numQuestions: "عدد الأسئلة",
    difficulty: "مستوى الصعوبة",
    questionTypes: "نوعية الأسئلة",
    duration: "مدة الاختبار (بالدقائق)",
    startExam: "بدء الاختبار الذكي",
    timeRemaining: "الوقت المتبقي",
    submitExam: "إنهاء وإرسال الإجابات",
    examResults: "نتيجة الاختبار",
    score: "درجتك النهائية",
    reviewAnswers: "مراجعة الأخطاء والتفسير",
    mcq: "خيارات متعددة",
    trueFalse: "صواب / خطأ",
    shortAns: "إجابة قصيرة",
    mixed: "اختبار متنوع",
    myMistakes: "دفتر الأخطاء الذكي",
    mistakesSub: "تم حفظ الأسئلة التي أجبت عليها بشكل خاطئ لمراجعتها وتقويتها.",
    retryQuestion: "إعادة محاولة السؤال",
    noMistakes: "لا توجد أخطاء مسجلة حالياً! عمل ممتاز في الدراسة.",
    roomTitle: "غرف الدراسة الجماعية التفاعلية",
    createRoomBtn: "إنشاء غرفة مؤقتة",
    roomName: "عنوان الغرفة",
    maxMembers: "الحد الأقصى للمشاركين",
    endRoom: "إنهاء غرفة الدراسة",
    roomClosedNotice: "تم إغلاق هذه الغرفة من قبل المضيف. جميع الملفات والمحادثات تم إنهاؤها.",
    inviteLink: "نسخ رابط الدعوة",
    copied: "تم نسخ الرابط!",
    sendMsg: "أرسل رسالة أو اسأل الذكاء الاصطناعي...",
    askGroupAI: "@مساعد الذكاء الاصطناعي للمجموعة",
    notesTitle: "الملاحظات الدراسية",
    createNote: "ملاحظة جديدة",
    aiConvertNote: "تحويل المستند إلى ملاحظة منظمة",
    studyPlanner: "مخطط الدراسة الذكي",
    scheduleExam: "جدول الاختبارات القادمة",
    language: "Language / اللغة",
    theme: "المظهر",
    dark: "الوضع الداكن",
    light: "الوضع الفاتح",
    rtlToggle: "التحويل للعربية",
    ltrToggle: "Switch to English",
    useMyFiles: "إعطاء الأولوية لملفاتي المرفوعة",
    analyzingText: "الذكاء الاصطناعي يقرأ المستند... يستخرج المفاهيم الرئيسية...",
    installApp: "تثبيت التطبيق على جهازك",
    downloadAppDesc: "قم بتثبيت StudySphere كتطبيق مستقل على هاتفك أو جهازك للوصول السريع والاستخدام الفعال.",
    downloadSummary: "تنزيل الملخص كملف",
    appInstalled: "تم تثبيت التطبيق بنجاح!",
  }
};

async function callGeminiAPI(prompt, systemInstruction = "", outputJson = false) {
  const apiKey = ""; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  if (systemInstruction) payload.systemInstruction = { parts: [{ text: systemInstruction }] };
  if (outputJson) payload.generationConfig = { responseMimeType: "application/json" };

  let delay = 1000;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (e) {
      if (attempt === 2) return null;
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
  return null;
}

const DEFAULT_FILES = [
  {
    id: "f1",
    name: "Biology_Ch3_Cell_Structure.pdf",
    subject: "Biology",
    size: "2.4 MB",
    pages: 18,
    uploadDate: "2026-10-02",
    content: `Cell biology is the study of cell structure and function. Major components include:
    1. Cell Membrane: A lipid bilayer that regulates what enters and leaves the cell.
    2. Nucleus: Contains DNA and controls cellular activities.
    3. Mitochondria: The powerhouse of the cell, generating ATP through aerobic respiration.`
  },
  {
    id: "f2",
    name: "Physics_Quantum_Mechanics_Intro.pdf",
    subject: "Physics",
    size: "4.1 MB",
    pages: 32,
    uploadDate: "2026-10-05",
    content: `Quantum Mechanics introduces energy quantization and wave-particle duality.`
  }
];

export default function App() {
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home');

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    if (window.matchMedia('(display-mode: standalone)').matches) setIsInstalled(true);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setIsInstalled(true);
      setDeferredPrompt(null);
    } else {
      alert("اضغط على قائمة المتصفح ثم اختر تثبيت التطبيق");
    }
  };

  const downloadTextFile = (content, filename) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const [user, setUser] = useState({
    name: "عبدالرحيم يوسف",
    grade: "الصف الأول الثانوي - WE ATS",
    favSubjects: ["Biology", "Physics", "Computer Science"],
    dailyGoalMins: 45,
    todayMins: 32,
    streak: 5
  });

  const [files, setFiles] = useState(DEFAULT_FILES);
  const [selectedFile, setSelectedFile] = useState(DEFAULT_FILES[0]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [analyzerMode, setAnalyzerMode] = useState('summarize');
  const [summaryLength, setSummaryLength] = useState('detailed');
  const [explainStyle, setExplainStyle] = useState('simple');
  const [aiResultText, setAiResultText] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const [activeExam, setActiveExam] = useState(null);

  const [mistakes, setMistakes] = useState([
    {
      id: "m1",
      subject: "Biology",
      question: "Which organelle is responsible for ATP synthesis?",
      userAns: "Ribosomes",
      correctAns: "Mitochondria",
      explanation: "Mitochondria generate cellular ATP energy.",
      source: "Biology_Ch3_Cell_Structure.pdf"
    }
  ]);

  const [rooms, setRooms] = useState([
    {
      id: "ROOM-101",
      name: "Biology Final Exam Review Group",
      subject: "Biology",
      membersCount: 4,
      host: "عبدالرحيم يوسف",
      messages: [
        { sender: "Sara", text: "Hey everyone!", isAI: false, time: "10:15 AM" },
        { sender: "StudySphere AI", text: "Welcome to StudySphere!", isAI: true, time: "10:16 AM" }
      ]
    }
  ]);
  const [roomMsgInput, setRoomMsgInput] = useState("");

  const [tutorMessages, setTutorMessages] = useState([
    { role: "assistant", text: "مرحباً! أنا معلمك الذكي في StudySphere. كيف يمكنني مساعدتك؟" }
  ]);
  const [tutorInput, setTutorInput] = useState("");

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);
    const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress(prev => prev >= 90 ? (clearInterval(interval), 90) : prev + 25);
    }, 200);

    const reader = new FileReader();
    reader.onload = (event) => {
      const textContent = event.target.result || `محتوى الملف ${file.name}`;
      setTimeout(() => {
        const newFileObj = {
          id: `f_${Date.now()}`,
          name: file.name,
          subject: "General",
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          pages: 10,
          uploadDate: new Date().toISOString().split('T')[0],
          content: typeof textContent === 'string' ? textContent.slice(0, 3000) : "محتوى الملف."
        };
        setFiles(prev => [newFileObj, ...prev]);
        setSelectedFile(newFileObj);
        setIsUploading(false);
        setUploadProgress(100);
        setActiveTab('analyzer');
      }, 800);
    };

    if (file.type.includes("text") || file.name.endsWith(".txt")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleGenerateAI = async () => {
    if (!selectedFile) return;
    setIsLoadingAI(true);
    setAiResultText("");

    const prompt = `حلل المستند التالي (${selectedFile.name}): \n"${selectedFile.content}"`;
    const res = await callGeminiAPI(prompt);
    setIsLoadingAI(false);
    setAiResultText(res || `ملخص لـ (${selectedFile.name}): يحتوي المستند على النقاط الرئيسية والمفاهيم الأساسية.`);
  };

  const handleStartExam = () => {
    setActiveExam({
      title: `اختبار: ${selectedFile ? selectedFile.subject : 'عام'}`,
      questions: [
        {
          id: 1,
          question: "ما هي الوظيفة الرئيسية للمايتوكندريا في الخلية؟",
          options: ["تصنيع البروتين", "إنتاج الطاقة ATP", "حفظ المادة الوراثية", "انقسام الخلية"],
          correct: 1,
          explanation: "تنتج المايتوكندريا جزيئات ATP."
        }
      ]
    });
  };

  const handleSendTutor = async () => {
    if (!tutorInput.trim()) return;
    const userMsg = tutorInput;
    setTutorMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTutorInput("");

    const aiRes = await callGeminiAPI(`أجب الطالب: ${userMsg}`);
    setTutorMessages(prev => [...prev, {
      role: "assistant",
      text: aiRes || `إجابة حول "${userMsg}": الفكرة تعتمد على فهم القواعد والتطبيق.`
    }]);
  };

  const handleSendRoomMsg = () => {
    if (!roomMsgInput.trim()) return;
    const currentRoom = rooms[0];
    const newMsg = { sender: user.name, text: roomMsgInput, isAI: false, time: "10:20 AM" };
    let updated = [...currentRoom.messages, newMsg];

    if (roomMsgInput.includes("@AI")) {
      updated.push({ sender: "StudySphere AI", text: "مساعد المجموعة: تمت معالجة طلبك.", isAI: true, time: "10:20 AM" });
    }

    setRooms(rooms.map(r => r.id === currentRoom.id ? { ...r, messages: updated } : r));
    setRoomMsgInput("");
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans dir-${isRTL ? 'rtl' : 'ltr'}`}>
      
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">{t.appName}</h1>
            <p className="text-xs text-slate-400 mt-1">{t.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold">
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg border border-slate-700">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={handleInstallApp} className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1">
            <Smartphone className="w-4 h-4" />
            <span>{t.installApp}</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 pb-24">
        
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-800">
          {[
            { id: 'home', label: t.navHome, icon: BookOpen },
            { id: 'analyzer', label: t.uploadTitle, icon: UploadCloud },
            { id: 'exam', label: t.examTitle, icon: Award },
            { id: 'tutor', label: t.navTutor, icon: Sparkles },
            { id: 'rooms', label: t.navRooms, icon: Users },
            { id: 'mistakes', label: t.navMistakes, icon: AlertCircle },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/40 p-6 rounded-2xl border border-indigo-500/30">
              <h2 className="text-2xl font-bold">{t.welcomeBack}، {user.name}! 👋</h2>
              <p className="text-slate-300 text-sm mt-1">{user.grade}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => setActiveTab('analyzer')} className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-right">
                <UploadCloud className="w-6 h-6 text-indigo-400 mb-2" />
                <h3 className="font-semibold text-sm">{t.uploadMaterial}</h3>
              </button>
              <button onClick={() => setActiveTab('exam')} className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-right">
                <Award className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="font-semibold text-sm">{t.generateExam}</h3>
              </button>
              <button onClick={() => setActiveTab('tutor')} className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-right">
                <Sparkles className="w-6 h-6 text-amber-400 mb-2" />
                <h3 className="font-semibold text-sm">{t.aiTutor}</h3>
              </button>
              <button onClick={() => setActiveTab('rooms')} className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-right">
                <Users className="w-6 h-6 text-emerald-400 mb-2" />
                <h3 className="font-semibold text-sm">{t.createRoom}</h3>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analyzer' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <label className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer text-center">
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs text-slate-300">{t.dropZone}</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="md:col-span-2 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
              {selectedFile && (
                <>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-base">{selectedFile.name}</h3>
                    <button onClick={handleGenerateAI} disabled={isLoadingAI} className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-lg font-semibold">
                      {t.generateSummaryBtn}
                    </button>
                  </div>
                  {aiResultText && (
                    <div className="p-4 bg-slate-950 rounded-xl text-sm border border-slate-800">
                      {aiResultText}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'exam' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-2xl mx-auto space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>{t.examTitle}</span>
            </h3>
            <button onClick={handleStartExam} className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl text-xs">
              {t.startExam}
            </button>
            {activeExam && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 mt-4">
                <p className="font-semibold text-xs">{activeExam.questions[0].question}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tutor' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 h-[400px] flex flex-col max-w-3xl mx-auto">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {tutorMessages.map((m, i) => (
                <div key={i} className={`p-3 rounded-xl text-xs max-w-[80%] ${m.role === 'user' ? 'bg-indigo-600 text-white ml-auto' : 'bg-slate-950 text-slate-200 border border-slate-800'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 bg-slate-950 flex gap-2 border-t border-slate-800">
              <input
                type="text"
                value={tutorInput}
                onChange={e => setTutorInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendTutor()}
                placeholder="اسأل المعلم الذكي..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              />
              <button onClick={handleSendTutor} className="bg-indigo-600 text-white p-2.5 rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 max-w-3xl mx-auto space-y-4">
            <h3 className="font-bold text-base">{rooms[0].name}</h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-48 overflow-y-auto space-y-2 text-xs">
              {rooms[0].messages.map((m, i) => (
                <div key={i}>
                  <span className="font-semibold text-indigo-400">{m.sender}: </span>
                  <span>{m.text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={roomMsgInput}
                onChange={e => setRoomMsgInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendRoomMsg()}
                placeholder={t.sendMsg}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              />
              <button onClick={handleSendRoomMsg} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-semibold">
                إرسال
              </button>
            </div>
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>{t.myMistakes}</span>
            </h3>
            {mistakes.map(m => (
              <div key={m.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
                <p className="font-bold text-slate-200">{m.question}</p>
                <p className="text-emerald-400">الإجابة الصحيحة: {m.correctAns}</p>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
                        }
                   
