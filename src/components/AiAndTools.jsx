import React, { useState } from 'react';

export default function AiAndTools({ tab, theme, onBack }) {
  // حالة المعلم الذكي
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChat, setAiChat] = useState([
    { role: 'ai', text: 'أهلاً بك! أنا معلمك الذكي Gemini، اطرح سؤالك لنبدأ.' }
  ]);

  // حالة محلل PDF
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfSummary, setPdfSummary] = useState('');

  // حالة صانع الاختبارات
  const [quizTopic, setQuizTopic] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    const q = aiPrompt;
    setAiPrompt('');
    setAiChat(prev => [...prev, { role: 'user', text: q }]);
    setTimeout(() => {
      setAiChat(prev => [...prev, { role: 'ai', text: `تحليل Gemini لسؤالك "${q}": ركز على الفكرة الأساسية وقم بتطبيق أمثلة عملية.` }]);
    }, 1000);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFileName(file.name);
      setPdfSummary(`ملخص ذكي لملف (${file.name}):\n1. المفاهيم الأساسية منظمة بدقة.\n2. النقاط البارزة: كفاءة الأداء وتنظيم البيانات.\n3. الخلاصة جاهزة للاستذكار.`);
    }
  };

  const downloadPdfFile = () => {
    const element = document.createElement("a");
    const file = new Blob([pdfSummary], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "StudySphere-Summary.pdf";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-4">
      {/* 1. المعلم الذكي */}
      {tab === 'ai' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
            <h3 className={`font-bold ${theme.text} text-sm flex items-center gap-2`}>✨ المعلم الذكي (Gemini Pro)</h3>
            <button onClick={onBack} className="text-xs bg-slate-800 px-3 py-1 rounded-lg">العودة</button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 h-80 overflow-y-auto space-y-3 flex flex-col">
            {aiChat.map((msg, index) => (
              <div key={index} className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${msg.role === 'user' ? 'bg-purple-600 text-white self-end ml-auto' : 'bg-slate-800 text-slate-200 self-start mr-auto border border-slate-700'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleAiSend} className="flex gap-2">
            <input 
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="اسأل المعلم الذكي أي استفسار..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none"
            />
            <button type="submit" className="bg-purple-600 text-white px-5 rounded-xl font-bold text-xs">إرسال</button>
          </form>
        </div>
      )}

      {/* 2. محلل وملخص PDF */}
      {tab === 'pdf' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
            <h3 className={`font-bold ${theme.text} text-sm`}>📄 محلل وملخص المستندات (PDF)</h3>
            <button onClick={onBack} className="text-xs bg-slate-800 px-3 py-1 rounded-lg">العودة</button>
          </div>

          <div className="bg-slate-900/50 border border-dashed border-slate-700 rounded-2xl p-6 text-center space-y-3">
            <div className="text-3xl">📁</div>
            <p className="text-xs text-slate-300">ارفع ملف PDF أو مستند ليقوم الذكاء الاصطناعي بتلخيصه</p>
            <input type="file" accept=".pdf,.txt" onChange={handlePdfUpload} className="block w-full text-[11px] text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-purple-600 file:text-white cursor-pointer mx-auto max-w-xs" />
          </div>

          {pdfFileName && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-xs text-purple-300">الملف: {pdfFileName}</h4>
              <div className="bg-slate-950 p-3 rounded-lg text-xs text-slate-300 whitespace-pre-line border border-slate-800">{pdfSummary}</div>
              <button onClick={downloadPdfFile} className="w-full bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs">
                ⬇️ تنزيل الملخص كملف PDF / نصي
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. صانع الاختبارات */}
      {tab === 'quiz' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
            <h3 className={`font-bold ${theme.text} text-sm`}>🎯 صانع الاختبارات الذكي</h3>
            <button onClick={onBack} className="text-xs bg-slate-800 px-3 py-1 rounded-lg">العودة</button>
          </div>

          {!quizStarted ? (
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <label className="text-xs text-slate-400 font-bold">أدخل موضوع أو مادة الاختبار:</label>
              <input 
                type="text" 
                value={quizTopic} 
                onChange={(e) => setQuizTopic(e.target.value)}
                placeholder="مثلاً: فيزياء، برمجة، تاريخ..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none" 
              />
              <button onClick={() => { if(!quizTopic.trim()) return; setQuizStarted(true); }} className="w-full bg-purple-600 text-white py-2.5 rounded-xl text-xs font-bold">إنشاء الاختبار</button>
            </div>
          ) : (
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-xs text-purple-300">اختبار في: {quizTopic}</h4>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                <p className="font-bold mb-2">سؤال 1: ما هو الهدف الأساسي من تطوير واجهات الويب التفاعلية؟</p>
                <div className="space-y-1.5 text-[11px]">
                  <button onClick={() => setQuizScore(100)} className="w-full text-right p-2 bg-slate-900 hover:bg-purple-950 rounded border border-slate-800">أ) تحسين تجربة المستخدم وسرعة الاستجابة</button>
                  <button onClick={() => setQuizScore(0)} className="w-full text-right p-2 bg-slate-900 hover:bg-red-950 rounded border border-slate-800">ب) تعطيل الخوادم والسيرفرات</button>
                </div>
              </div>
              {quizScore !== null && (
                <div className={`p-3 rounded-xl text-xs font-bold text-center ${quizScore === 100 ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-800' : 'bg-red-900/40 text-red-300 border border-red-800'}`}>
                  {quizScore === 100 ? '🎉 إجابة صحيحة تماماً!' : '❌ إجابة خاطئة، حاول مجدداً.'}
                </div>
              )}
              <button onClick={() => { setQuizStarted(false); setQuizScore(null); setQuizTopic(''); }} className="w-full bg-slate-800 text-slate-300 py-2 rounded-xl text-xs">إعادة ضبط الاختبار</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
