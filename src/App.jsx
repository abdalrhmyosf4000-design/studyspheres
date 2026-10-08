import React, { useState } from 'react';
import AiAndTools from './components/AiAndTools';

export default function App() {
  const [theme, setTheme] = useState('purple');
  const [activeTab, setActiveTab] = useState('home');
  const [userName, setUserName] = useState('عبدالرحيم يوسف');
  const [userGrade, setUserGrade] = useState('الصف الأول الثانوي - WE ATS');

  const themes = {
    purple: { primary: 'from-purple-600 to-indigo-600', bg: 'bg-slate-950', card: 'bg-slate-900/90', text: 'text-purple-400', border: 'border-purple-500/20' },
    blue: { primary: 'from-blue-600 to-cyan-600', bg: 'bg-zinc-950', card: 'bg-zinc-900/90', text: 'text-blue-400', border: 'border-blue-500/20' },
    emerald: { primary: 'from-emerald-600 to-teal-600', bg: 'bg-gray-950', card: 'bg-gray-900/90', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  };
  const currentTheme = themes[theme] || themes.purple;

  // الغرف الجماعية
  const [rooms, setRooms] = useState([
    { id: 'room-1', name: 'غرفة البرمجة المتقدمة', owner: 'عبدالرحيم', members: 4, link: 'studysphere.app/room/1' }
  ]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [roomInput, setRoomInput] = useState('');
  const [newRoomName, setNewRoomName] = useState('');

  const sendRoomMsg = (e) => {
    e.preventDefault();
    if (!roomInput.trim()) return;
    setRoomMessages(prev => [...prev, { sender: userName, text: roomInput, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setRoomInput('');
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} text-slate-100 font-sans pb-20 selection:bg-purple-500 selection:text-white`}>
      <header className={`border-b border-slate-800 ${currentTheme.card} backdrop-blur sticky top-0 z-50 px-4 py-3 flex justify-between items-center shadow-md`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('home'); setCurrentRoom(null); }}>
          <div className={`bg-gradient-to-tr ${currentTheme.primary} p-2 rounded-xl text-white font-bold shadow-lg`}>🚀</div>
          <div>
            <h1 className="font-extrabold text-base tracking-wide text-white">StudySphere <span className="text-xs px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-md">Pro Max</span></h1>
            <span className="text-[10px] text-slate-400">منظومة الدراسة الذكية المتكاملة</span>
          </div>
        </div>
        <button onClick={() => setActiveTab('settings')} className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-sm transition border border-slate-700">⚙️</button>
      </header>

      <main className="max-w-3xl mx-auto p-4 mt-2">
        {activeTab === 'home' && !currentRoom && (
          <div className="space-y-5">
            <div className={`bg-gradient-to-r ${currentTheme.primary} p-5 rounded-2xl shadow-xl text-white`}>
              <h2 className="text-lg font-bold mb-1">أهلاً بك مجدداً، {userName} 👋</h2>
              <p className="text-xs text-white/80">{userGrade}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setActiveTab('ai')} className={`p-4 ${currentTheme.card} border ${currentTheme.border} rounded-2xl text-right transition`}>
                <div className="text-2xl mb-2">✨</div>
                <h3 className={`font-bold text-sm ${currentTheme.text}`}>المعلم الذكي Gemini</h3>
                <p className="text-[11px] text-slate-400 mt-1">شرح وتوضيح فوري لكل الأسئلة</p>
              </button>

              <button onClick={() => setActiveTab('rooms')} className={`p-4 ${currentTheme.card} border ${currentTheme.border} rounded-2xl text-right transition`}>
                <div className="text-2xl mb-2">👥</div>
                <h3 className={`font-bold text-sm ${currentTheme.text}`}>الغرف الجماعية</h3>
                <p className="text-[11px] text-slate-400 mt-1">روابط دعوة ومحادثات ومشاركة</p>
              </button>

              <button onClick={() => setActiveTab('pdf')} className={`p-4 ${currentTheme.card} border ${currentTheme.border} rounded-2xl text-right transition`}>
                <div className="text-2xl mb-2">📄</div>
                <h3 className={`font-bold text-sm ${currentTheme.text}`}>محلل وملخص PDF</h3>
                <p className="text-[11px] text-slate-400 mt-1">تلخيص الملفات وتنزيلها بصيغة PDF</p>
              </button>

              <button onClick={() => setActiveTab('quiz')} className={`p-4 ${currentTheme.card} border ${currentTheme.border} rounded-2xl text-right transition`}>
                <div className="text-2xl mb-2">🎯</div>
                <h3 className={`font-bold text-sm ${currentTheme.text}`}>صانع الاختبارات</h3>
                <p className="text-[11px] text-slate-400 mt-1">اختبر معلوماتك في أي مادة</p>
              </button>
            </div>
          </div>
        )}

        {(activeTab === 'ai' || activeTab === 'pdf' || activeTab === 'quiz') && (
          <AiAndTools 
            tab={activeTab} 
            theme={currentTheme} 
            onBack={() => setActiveTab('home')} 
          />
        )}

        {activeTab === 'rooms' && !currentRoom && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <h3 className={`font-bold ${currentTheme.text} text-sm`}>👥 غرف الدراسة الجماعية</h3>
              <button onClick={() => setActiveTab('home')} className="text-xs bg-slate-800 px-3 py-1 rounded-lg">العودة</button>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs text-slate-400 font-bold">إنشاء غرفة جديدة:</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="اسم الغرفة (مثلاً: فيزياء)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
                <button onClick={() => {
                  if(!newRoomName.trim()) return;
                  setRooms([...rooms, { id: Date.now(), name: newRoomName, owner: userName, members: 1, link: `studysphere.app/room/${Date.now()}` }]);
                  setNewRoomName('');
                }} className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold">إنشاء</button>
              </div>
            </div>

            <div className="space-y-3">
              {rooms.map(room => (
                <div key={room.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-xs text-white">{room.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">المنشئ: {room.owner} • الأعضاء: {room.members}</p>
                    <span className="text-[9px] text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900 mt-1 inline-block">رابط: {room.link}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentRoom(room)} className="bg-purple-600 text-xs px-3 py-2 rounded-lg text-white font-bold">دخول</button>
                    {room.owner === userName && (
                      <button onClick={() => setRooms(rooms.filter(r => r.id !== room.id))} className="bg-red-900/40 text-xs px-2 py-2 rounded-lg text-red-300 border border-red-800">إغلاق</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentRoom && (
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div>
                <h3 className="font-bold text-xs text-white">🟢 أنت داخل: {currentRoom.name}</h3>
                <span className="text-[10px] text-slate-400">رابط الدعوة: {currentRoom.link}</span>
              </div>
              <button onClick={() => setCurrentRoom(null)} className="bg-red-600 text-xs px-3 py-1.5 rounded-lg text-white font-bold">خروج</button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 h-72 overflow-y-auto space-y-2 flex flex-col">
              {roomMessages.length === 0 && <p className="text-center text-xs text-slate-500 my-auto">لا توجد رسائل بعد. ابدأ المراسلة!</p>}
              {roomMessages.map((m, idx) => (
                <div key={idx} className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 max-w-[85%] text-xs">
                  <div className="flex justify-between text-[10px] text-purple-400 mb-1 font-bold">
                    <span>{m.sender}</span>
                    <span className="text-slate-500">{m.time}</span>
                  </div>
                  <p className="text-slate-200">{m.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={sendRoomMsg} className="flex gap-2">
              <input 
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                placeholder="اكتب رسالة..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none"
              />
              <button type="submit" className="bg-purple-600 text-white px-4 rounded-xl text-xs font-bold">إرسال</button>
            </form>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <h3 className={`font-bold ${currentTheme.text} text-sm`}>⚙️ إعدادات الحساب والنسق</h3>
              <button onClick={() => setActiveTab('home')} className="text-xs bg-slate-800 px-3 py-1 rounded-lg">العودة</button>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-bold">اسم المستخدم:</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 font-bold">المستوى الدراسي:</label>
                <input type="text" value={userGrade} onChange={(e) => setUserGrade(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-2 font-bold">اختر نسق وألوان التطبيق:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setTheme('purple')} className={`p-2.5 rounded-xl border text-xs font-bold ${theme === 'purple' ? 'border-purple-500 bg-purple-950/40 text-purple-300' : 'border-slate-800 bg-slate-950 text-slate-400'}`}>🟣 بنفسجي</button>
                  <button onClick={() => setTheme('blue')} className={`p-2.5 rounded-xl border text-xs font-bold ${theme === 'blue' ? 'border-blue-500 bg-blue-950/40 text-blue-300' : 'border-slate-800 bg-slate-950 text-slate-400'}`}>🔵 أزرق</button>
                  <button onClick={() => setTheme('emerald')} className={`p-2.5 rounded-xl border text-xs font-bold ${theme === 'emerald' ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300' : 'border-slate-800 bg-slate-950 text-slate-400'}`}>🟢 أخضر</button>
                </div>
              </div>

              <button onClick={() => { alert('تم حفظ الإعدادات بنجاح!'); setActiveTab('home'); }} className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-xl text-xs">حفظ التعديلات</button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-2 flex justify-around items-center z-50 max-w-3xl mx-auto shadow-lg">
        <button onClick={() => { setActiveTab('home'); setCurrentRoom(null); }} className={`flex flex-col items-center text-[10px] ${activeTab === 'home' && !currentRoom ? 'text-purple-400 font-bold' : 'text-slate-400'}`}>🏠 الرئيسية</button>
        <button onClick={() => { setActiveTab('ai'); setCurrentRoom(null); }} className={`flex flex-col items-center text-[10px] ${activeTab === 'ai' ? 'text-purple-400 font-bold' : 'text-slate-400'}`}>✨ المعلم الذكي</button>
        <button onClick={() => { setActiveTab('rooms'); setCurrentRoom(null); }} className={`flex flex-col items-center text-[10px] ${activeTab === 'rooms' ? 'text-purple-400 font-bold' : 'text-slate-400'}`}>👥 الغرف</button>
        <button onClick={() => { setActiveTab('pdf'); setCurrentRoom(null); }} className={`flex flex-col items-center text-[10px] ${activeTab === 'pdf' ? 'text-purple-400 font-bold' : 'text-slate-400'}`}>📄 الملخصات</button>
        <button onClick={() => { setActiveTab('quiz'); setCurrentRoom(null); }} className={`flex flex-col items-center text-[10px] ${activeTab === 'quiz' ? 'text-purple-400 font-bold' : 'text-slate-400'}`}>🎯 الاختبارات</button>
      </nav>
    </div>
  );
            }
        
