"use client"

import { Layers, GitBranch, MessageCircle, FileText, ClipboardCheck, Network, Microscope, Calculator, Book, GraduationCap } from "lucide-react"

export default function StudentFeatures() {
  return (
    <section id="features" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:px-0 animate-fadeInUp pr-0 pl-0 gap-x-6 gap-y-2 mb-12">
          <h2 className="text-[44px] leading-[0.9] sm:text-6xl lg:text-7xl xl:text-5xl text-[#000000] tracking-tighter text-left font-display">
            Everything Your Students Need to Learn Better
          </h2>
          <p className="sm:text-base text-sm text-zinc-400 tracking-tight mt-1 font-geist">
            Comprehensive AI-powered tools for K-12 and college classrooms. From Biology to Calculus, help students master any subject with adaptive learning tools teachers can assign and track.
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* AI Flashcards - Large Card */}
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-8 border border-slate-200 hover:shadow-xl transition-all relative overflow-hidden group flex flex-col">
            <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
              Most Used by Students
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-geist">AI Flashcards</h3>
            <p className="text-slate-500 mb-6 font-geist">
              Teachers assign chapter readings, students get auto-generated flashcards for review. Uses spaced repetition (FSRS algorithm) to schedule reviews at optimal intervals. Tracks which students need extra help.
            </p>

            {/* Animated Flashcards Visual */}
            <div className="relative h-64 mt-8">
              {/* Flashcard 1 - Blue */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl rotate-[-8deg] flex items-center justify-center text-white text-center p-6 card-pop-1 z-30 border-4 border-white">
                <div>
                  <p className="text-sm mb-2 opacity-80">What is</p>
                  <p className="text-xl font-bold">Photosynthesis?</p>
                </div>
              </div>

              {/* Flashcard 2 - Purple */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl rotate-[2deg] flex items-center justify-center text-white text-center p-6 card-pop-2 z-20 border-4 border-white">
                <div>
                  <p className="text-sm mb-2 opacity-80">Quadratic</p>
                  <p className="text-xl font-bold">Formula?</p>
                </div>
              </div>

              {/* Flashcard 3 - Pink */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-2xl rotate-[8deg] flex items-center justify-center text-white text-center p-6 card-pop-3 z-10 border-4 border-white">
                <div>
                  <p className="text-xl font-bold">Cell Division</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-geist">Used in 200+ classrooms</span>
                <span className="text-blue-600 font-semibold font-geist">→ See Demo</span>
              </div>
            </div>
          </div>

          {/* Mind Maps */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-geist">Mind Maps</h3>
            <p className="text-sm text-slate-500 mb-4 font-geist">
              Auto-generate concept maps from course materials. Helps students visualize how topics connect across units. Perfect for science and history classes.
            </p>

            {/* Mind Map Visualization - Circular Nodes */}
            <div className="relative h-40 flex items-center justify-center">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 285.74999 285.75"
                version="1.1"
                id="svg1"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <g id="layer1">
                  <circle
                    style={{fill:"#0000ff", stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1"
                    cx="68.974358"
                    cy="142.99144"
                    r="11.700001" />
                  <circle
                    style={{fill:"#15a6ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0"
                    cx="122.06098"
                    cy="95.482895"
                    r="11.700001" />
                  <circle
                    style={{fill:"#15a6ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9"
                    cx="124.3717"
                    cy="187.92484"
                    r="11.700001" />
                  <circle
                    style={{fill:"#0077ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9-0"
                    cx="176.15579"
                    cy="59.491108"
                    r="11.700001" />
                  <circle
                    style={{fill:"#0077ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9-0-9"
                    cx="180.4395"
                    cy="122.22087"
                    r="11.700001" />
                  <path
                    style={{fill:"none", stroke:"#000000", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 41.493027,127.78834 c 0.597501,-11.24145 1.194991,-22.48267 6.941127,-28.562409 5.746137,-6.079738 16.64046,-6.997507 27.535,-7.915295"
                    id="path2"
                    transform="translate(33.601714,4.5820519)" />
                  <path
                    style={{fill:"none", stroke:"#000000", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 41.493027,127.78834 c 0.927502,-7.01145 1.854984,-14.02275 7.451117,-18.36246 5.596134,-4.3397 15.860471,-6.00745 26.12501,-7.67524"
                    id="path2-9"
                    transform="translate(88.755769,-40.992753)" />
                  <path
                    style={{fill:"none", stroke:"#000000", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 37.420092,133.13407 c 0.999411,9.78159 1.998801,19.56298 8.183769,25.29727 6.184968,5.73429 17.555016,7.42102 28.925293,9.10778"
                    id="path2-2"
                    transform="translate(37.64428,21.29218)" />
                  <path
                    style={{fill:"none", stroke:"#000000", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 37.420092,133.13407 c 1.296397,4.98741 2.592763,9.9747 8.629239,13.33307 6.036476,3.35836 16.812564,5.08751 27.588869,6.8167"
                    id="path2-2-6"
                    transform="translate(94.155276,-29.909129)" />
                  <circle
                    style={{fill:"#0077ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9-0-5"
                    cx="178.20134"
                    cy="151.44168"
                    r="11.700001" />
                  <circle
                    style={{fill:"#0077ff", fillOpacity:1, stroke:"#ffffff", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    id="path1-0-9-0-9-9"
                    cx="184.77608"
                    cy="224.09921"
                    r="11.700001" />
                  <path
                    style={{fill:"none", stroke:"#000000", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 41.493027,127.78834 c 0.927502,-7.01145 1.854984,-14.02275 7.451117,-18.36246 5.596134,-4.3397 15.860471,-6.00745 26.12501,-7.67524"
                    id="path2-9-6"
                    transform="translate(90.80133,50.957821)" />
                  <path
                    style={{fill:"none", stroke:"#000000", strokeWidth:1, strokeLinecap:"round", strokeLinejoin:"round", strokeOpacity:1, paintOrder:"stroke markers fill"}}
                    d="m 37.420092,133.13407 c 0.787279,7.10873 1.57454,14.2173 8.035286,18.76363 6.460747,4.54633 18.594455,6.53003 30.728406,8.51378"
                    id="path2-2-6-5"
                    transform="translate(96.200837,62.041445)" />
                </g>
              </svg>
            </div>

            <div className="mt-4 text-xs text-slate-400 font-geist">
              Great for visual learners
            </div>
          </div>

          {/* Chat with Docs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-geist">Chat with Docs</h3>
            <p className="text-sm text-slate-500 mb-4 font-geist">
              Students can ask questions about assigned readings 24/7. AI tutor trained on your course materials provides instant help with homework and concepts.
            </p>

            {/* Chat Skeleton */}
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-green-200 flex-shrink-0"></div>
                <div className="flex-1 bg-white rounded-2xl p-3 text-xs text-slate-600 border border-green-200">
                  "Explain osmosis..."
                </div>
              </div>
              <div className="flex items-start gap-2 justify-end">
                <div className="flex-1 bg-green-600 rounded-2xl p-3 text-xs text-white">
                  Response with example...
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-400 font-geist">
              Reduces after-hours questions
            </div>
          </div>

          {/* Smart Notes */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-geist">Smart Notes</h3>
            <p className="text-sm text-slate-500 mb-4 font-geist">
              AI extracts key points from lecture recordings or PDFs. Students get organized, structured notes automatically formatted by topic.
            </p>

            {/* Notes Skeleton - 3 Panels */}
            <div className="relative h-40 flex items-center justify-center mt-4">
              <svg viewBox="0 0 285.75 285.75" className="w-full h-full">
                <rect x="14.4" y="16.56" width="99.36" height="195.12" fill="#3492ff" rx="4"/>
                <rect x="117.39" y="16.63" width="154.08" height="194.76" fill="#72b7ff" rx="4"/>
                <rect x="14.52" y="215.33" width="257.04" height="52.56" fill="#00c6f8" rx="4"/>
              </svg>
            </div>

            <div className="mt-4 text-xs text-slate-400 font-geist">
              Helps struggling note-takers
            </div>
          </div>

          {/* Quiz Gen */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-geist">Quiz Gen</h3>
            <p className="text-sm text-slate-500 mb-4 font-geist">
              Teachers create practice quizzes from any document in 2 minutes. Multiple choice, true/false, fill-in-blank. Auto-graded with instant feedback.
            </p>

            {/* Quiz Visual */}
            <div className="space-y-2 mt-6">
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-orange-200">
                <div className="w-4 h-4 rounded-full border-2 border-orange-400 bg-orange-100"></div>
                <div className="h-2 bg-slate-200 rounded flex-1"></div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                <div className="h-2 bg-slate-200 rounded flex-1"></div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                <div className="h-2 bg-slate-200 rounded flex-1"></div>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-400 font-geist">
              Saves 3 hrs/week per teacher
            </div>
          </div>

          {/* Knowledge Graphs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-geist">Knowledge Graphs</h3>
            <p className="text-sm text-slate-500 mb-4 font-geist">
              Visualize relationships between topics across units. Shows students the big picture of how concepts build on each other throughout the semester.
            </p>

            {/* Knowledge Graph - Rectangular Nodes */}
            <div className="relative h-40 flex items-center justify-center mt-4">
              <svg viewBox="0 0 285.75 285.75" className="w-full h-full">
                <rect x="114.48" y="122.04" width="55.8" height="33.84" fill="#ff0000" stroke="#ff0000" strokeWidth="1" rx="4"/>
                <rect x="107.82" y="41.81" width="55.8" height="33.84" fill="#ff0000" stroke="#ff0000" strokeWidth="1" rx="4"/>
                <rect x="208.93" y="73.51" width="55.8" height="33.84" fill="#ff0000" stroke="#ff0000" strokeWidth="1" rx="4"/>
                <rect x="217.70" y="176.84" width="55.8" height="33.84" fill="#ff0000" stroke="#ff0000" strokeWidth="1" rx="4"/>
                <rect x="154.23" y="233.32" width="55.8" height="33.84" fill="#ff0000" stroke="#ff0000" strokeWidth="1" rx="4"/>
                <rect x="65.42" y="202.71" width="55.8" height="33.84" fill="#ff0000" stroke="#ff0000" strokeWidth="1" rx="4"/>
                <rect x="17.48" y="117.61" width="55.8" height="33.84" fill="#ff0000" stroke="#ff0000" strokeWidth="1" rx="4"/>
                <path d="M 142.17 121.55 L 137.34 75.73" stroke="#ff0000" strokeWidth="1"/>
                <path d="M 208.36 86.42 L 170.30 138.35" stroke="#ff0000" strokeWidth="1"/>
                <path d="M 170.81 139.94 L 216.76 194.86" stroke="#ff0000" strokeWidth="1"/>
                <path d="M 145.08 156.24 L 180.54 232.02" stroke="#ff0000" strokeWidth="1"/>
                <path d="M 91.44 201.60 L 143.10 156.24" stroke="#ff0000" strokeWidth="1"/>
                <path d="M 73.62 133.56 L 113.94 138.96" stroke="#ff0000" strokeWidth="1"/>
              </svg>
            </div>

            <div className="mt-4 text-xs text-slate-400 font-geist">
              Popular in STEM classes
            </div>
          </div>
        </div>

        {/* Aggregate Stats Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-3xl p-8 border border-slate-200 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">15,000+</div>
              <div className="text-sm text-slate-600 font-geist">Study items created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">200+</div>
              <div className="text-sm text-slate-600 font-geist">Active classrooms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">3 hrs/week</div>
              <div className="text-sm text-slate-600 font-geist">Saved per teacher</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">92%</div>
              <div className="text-sm text-slate-600 font-geist">Student engagement rate</div>
            </div>
          </div>
        </div>

        {/* How These Tools Work Together */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 text-center mb-10 font-display">
            How Teachers Use These Tools Together
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2 font-geist">Assign Content</h4>
                  <p className="text-sm text-slate-600 font-geist leading-relaxed">
                    Upload course materials (PDFs, lecture slides). AI processes content and creates study resources students can access 24/7.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Smart Notes</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Chat with Docs</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute top-5 -right-4 text-slate-300 text-2xl">→</div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2 font-geist">Students Study</h4>
                  <p className="text-sm text-slate-600 font-geist leading-relaxed">
                    Students review with AI flashcards, explore mind maps, and use knowledge graphs to understand how concepts connect.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Flashcards</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Mind Maps</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Graphs</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute top-5 -right-4 text-slate-300 text-2xl">→</div>
            </div>

            <div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2 font-geist">Track & Assess</h4>
                  <p className="text-sm text-slate-600 font-geist leading-relaxed">
                    Generate quizzes to assess understanding. See which students are struggling and where the class needs more help.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Quiz Gen</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Perfect For Different Subjects */}
        <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 text-center mb-10 font-display">
            Works Across All Subjects & Grade Levels
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                <Microscope className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-geist">Science Classes</h4>
              <p className="text-sm text-slate-600 font-geist mb-3">
                Knowledge graphs for cell biology, chemistry equations, physics concepts. Mind maps for unit connections.
              </p>
              <div className="text-xs text-blue-600 font-semibold">Biology • Chemistry • Physics</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                <Calculator className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-geist">Math & Calculus</h4>
              <p className="text-sm text-slate-600 font-geist mb-3">
                Auto-generate practice problems. Students get instant feedback on problem-solving steps.
              </p>
              <div className="text-xs text-blue-600 font-semibold">Algebra • Geometry • Calculus</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4 text-orange-600">
                <Book className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-geist">Humanities</h4>
              <p className="text-sm text-slate-600 font-geist mb-3">
                Mind maps for historical timelines, literary themes. Flashcards for vocabulary and key dates.
              </p>
              <div className="text-xs text-blue-600 font-semibold">History • Literature • Languages</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 text-green-600">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-geist">College Courses</h4>
              <p className="text-sm text-slate-600 font-geist mb-3">
                Works for any university course. Engineering, business, medical schools—all subjects supported.
              </p>
              <div className="text-xs text-blue-600 font-semibold">Undergrad • Postgrad • Professional</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-full transition-all shadow-xl transform hover:-translate-y-0.5 hover:shadow-2xl">
            Schedule a Demo for Your School
          </button>
          <p className="text-sm text-slate-500 mt-4">See how Mentron works in your classroom • 30-minute demo</p>
        </div>
      </div>
    </section>
  )
}