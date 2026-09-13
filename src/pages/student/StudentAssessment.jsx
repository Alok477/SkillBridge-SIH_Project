import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { useToast } from '../../context/ToastContext';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ASSESSMENT_DOMAINS } from '../../data/assessmentQuestions';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  Play, CheckCircle2, XCircle, ChevronRight, ChevronLeft, 
  Clock, AlertTriangle, RefreshCw, BarChart2, Code2, HelpCircle, BookOpen
  , History, TrendingUp
} from 'lucide-react';

export const StudentAssessment = () => {
  const { addToast } = useToast();

  // Test states
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30);
  const [results, setResults] = useState(null);
  const [showDetailedReview, setShowDetailedReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [integrityWarning, setIntegrityWarning] = useState(false);
  const [attemptId, setAttemptId] = useState(null);
  const [assessmentHistory, setAssessmentHistory] = useState([]);

  useEffect(() => {
    fetchAssessment(selectedDomain);
  }, [selectedDomain]);

  useEffect(() => {
    studentService.getProfile().then(profile => setAssessmentHistory(profile.assessmentHistory || [])).catch(() => {});
  }, []);

  const fetchAssessment = async (domain) => {
    setLoading(true);
    try {
      const data = await studentService.getAssessment(domain);
      setAssessment(data);
      setQuestionTimeLeft(30);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Each question gets its own short window, which keeps the assessment paced and predictable.
  useEffect(() => {
    if (!testStarted || results || isSubmitting) return;

    if (questionTimeLeft <= 0) {
      if (currentQuestionIdx < (assessment?.questions?.length || 1) - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setQuestionTimeLeft(30);
      } else {
        handleSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setQuestionTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, questionTimeLeft, currentQuestionIdx, assessment, results, isSubmitting]);

  useEffect(() => {
    if (!testStarted || results) return;
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'hidden') return;
      setTabSwitchCount(previous => {
        const nextCount = previous + 1;
        setIntegrityWarning(true);
        addToast(nextCount === 1 ? 'Please stay on the assessment tab. This switch was recorded.' : 'Assessment submitted after repeated tab switching.', nextCount === 1 ? 'warning' : 'error');
        if (nextCount >= 2) handleSubmit();
        return nextCount;
      });
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testStarted, results]);

  const handleStartTest = async () => {
    try {
      const attempt = await studentService.startAssessment(assessment.questions.length);
      setAttemptId(attempt.id);
    } catch (err) {
      addToast(err.message || 'Unable to start a secure assessment attempt.', 'error');
      return;
    }
    setTestStarted(true);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setQuestionTimeLeft(30);
    setTabSwitchCount(0);
    setIntegrityWarning(false);
    addToast('Assessment started. You have 30 seconds per question.', 'info');
  };

  const handleSelectOption = (questionId, optionIdx) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting || results) return;
    setIsSubmitting(true);
    setLoading(true);
    try {
      const evaluation = await studentService.submitAssessment(answers, assessment?.questions, attemptId, selectedDomain);
      setResults(evaluation);
      const profile = await studentService.getProfile();
      setAssessmentHistory(profile.assessmentHistory || []);
      addToast('Assessment submitted successfully!', 'success');
    } catch (err) {
      addToast(err.message || 'Submission failed', 'error');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setResults(null);
    setAnswers({});
    setTestStarted(false);
    setCurrentQuestionIdx(0);
    setQuestionTimeLeft(30);
    setTabSwitchCount(0);
    setIntegrityWarning(false);
    setAttemptId(null);
    setShowDetailedReview(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading && !testStarted) {
    return (
      <DashboardLayout>
        <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
          <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Loading Assessment Module...</span>
        </div>
      </DashboardLayout>
    );
  }

  // ==========================================
  // RESULTS & ANALYSIS PAGE
  // ==========================================
  if (results) {
    const radarData = [
      { subject: 'Syntax & Logic', score: results.score, fullMark: 100 },
      { subject: 'Algorithm Runtime', score: Math.min(100, results.score + 5), fullMark: 100 },
      { subject: 'System Design', score: Math.max(30, results.score - 10), fullMark: 100 },
      { subject: 'API & Standards', score: Math.min(100, results.score + 10), fullMark: 100 }
    ];

    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Assessment Performance Insights</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Domain: <span className="font-semibold text-brand">{selectedDomain}</span> • Completed in 30-Minute Allocated Window
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleRetake} variant="outline" className="gap-1.5 text-xs">
                <RefreshCw className="w-4 h-4" /> Retake Test
              </Button>
              <Button onClick={() => setShowDetailedReview(!showDetailedReview)} variant="primary" className="gap-1.5 text-xs">
                <BookOpen className="w-4 h-4" /> {showDetailedReview ? 'Hide Answers' : 'Review Question Explanations'}
              </Button>
            </div>
          </div>
          
          {/* Performance Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <Card className="flex items-center justify-between p-6">
                <div>
                  <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase block">Overall Accuracy Score</span>
                  <span className="text-4xl font-extrabold text-white mt-1">{results.score}%</span>
                  <p className="text-xs text-zinc-400 mt-2">
                    Correctly answered <span className="font-bold text-white">{results.correctCount}</span> out of <span className="font-bold text-white">{results.totalCount}</span> questions.
                  </p>
                </div>
                <div className="px-4 py-3 bg-brand/10 border border-brand/20 rounded-xl text-center">
                  <span className="text-[10px] text-brand font-semibold block uppercase tracking-wider">Readiness Rank</span>
                  <span className="text-xs font-bold text-white mt-1 block">
                    {results.score >= 80 ? '🏆 Senior Placement Tier' : results.score >= 60 ? '⚡ Industry Ready' : '📚 Fundamentals Review Required'}
                  </span>
                </div>
              </Card>

              {/* Strengths & Weak Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-accent-green" /> Key Strengths Identified
                  </h4>
                  {results.strengths.length > 0 ? (
                    <ul className="space-y-2">
                      {results.strengths.map((s, idx) => (
                        <li key={idx} className="text-xs text-zinc-200 flex items-start gap-1.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-1.5 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-zinc-500">Keep practicing foundational concepts.</span>
                  )}
                </Card>

                <Card className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-accent-amber" /> Recommended Focus Areas
                  </h4>
                  {results.weakAreas.length > 0 ? (
                    <ul className="space-y-2">
                      {results.weakAreas.map((w, idx) => (
                        <li key={idx} className="text-xs text-zinc-200 flex items-start gap-1.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-1.5 flex-shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-xs text-accent-green font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Exceptional domain alignment!
                    </span>
                  )}
                </Card>
              </div>
            </div>

            {/* Competency Analysis Radar */}
            <div className="lg:col-span-5 flex items-center justify-center bg-[#121214] border border-zinc-800 rounded-2xl p-6 min-h-[350px]">
              <div className="w-full h-full flex flex-col justify-between">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <BarChart2 className="w-4.5 h-4.5 text-brand" /> Domain Competency Radar
                </h4>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#27272a" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#a1a1aa', fontSize: 8 }} />
                      <Radar name="Competency" dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.25} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Question Explanations Review Section */}
          {showDetailedReview && (
            <div className="space-y-6 pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand" /> Detailed Question Solutions & Explanations
              </h3>

              <div className="space-y-4">
                {assessment.questions.map((q, idx) => {
                  const userAnswerIdx = answers[q.id];
                  const isCorrect = userAnswerIdx === q.correctAnswerIndex;

                  return (
                    <Card key={q.id} className={`p-5 space-y-4 border ${isCorrect ? 'border-accent-green/30 bg-accent-green/5' : 'border-red-500/30 bg-red-500/5'}`}>
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300">
                            Q{idx + 1}
                          </span>
                          <span className="text-xs text-zinc-400 font-semibold">{q.category}</span>
                        </div>
                        <Badge variant={isCorrect ? 'success' : 'danger'} className="gap-1 text-[11px]">
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </Badge>
                      </div>

                      <h4 className="text-sm font-semibold text-white leading-relaxed">{q.question}</h4>

                      {/* Code Snippet if present */}
                      {q.codeSnippet && (
                        <div className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto my-2 leading-relaxed shadow-inner">
                          <pre>{q.codeSnippet}</pre>
                        </div>
                      )}

                      {/* Options listing */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {q.options.map((opt, oIdx) => {
                          const isUserPick = userAnswerIdx === oIdx;
                          const isRightPick = q.correctAnswerIndex === oIdx;

                          let bgStyle = 'bg-zinc-900/60 border-zinc-800 text-zinc-400';
                          if (isRightPick) bgStyle = 'bg-accent-green/15 border-accent-green text-accent-green font-semibold';
                          else if (isUserPick && !isRightPick) bgStyle = 'bg-red-500/15 border-red-500 text-red-400 font-semibold';

                          return (
                            <div key={oIdx} className={`p-3 rounded-lg border text-xs flex items-center gap-2.5 ${bgStyle}`}>
                              <span className="font-bold text-[10px] uppercase w-4 h-4 rounded-full border flex items-center justify-center border-current">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="flex-1">{opt}</span>
                              {isRightPick && <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />}
                              {isUserPick && !isRightPick && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Detailed Explanation */}
                      {q.explanation && (
                        <div className="mt-3 p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-300 space-y-1">
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-brand" /> Technical Explanation
                          </span>
                          <p className="leading-relaxed text-zinc-300">{q.explanation}</p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // ==========================================
  // PRE-TEST SETUP PAGE (DOMAIN SELECTOR & 30-MIN INFO)
  // ==========================================
  if (!testStarted) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-5xl py-6 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto text-brand">
                <Clock className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Interactive Technical Skill Assessment</h2>
              <p className="text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
                Test your practical code comprehension, algorithm runtime complexity, and syntax edge-cases across core industry tech stacks.
              </p>
            </div>

            {/* Domain Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-brand" /> Select Technology Domain to Test
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ASSESSMENT_DOMAINS.map((domain) => (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => setSelectedDomain(domain.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      selectedDomain === domain.id
                        ? 'bg-brand/10 border-brand text-white font-semibold'
                        : 'bg-background border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-xs">{domain.label}</span>
                    <Badge variant={selectedDomain === domain.id ? 'brand' : 'outline'} className="text-[10px]">
                      30 Mins
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Assessment Details Bar */}
            <div className="grid grid-cols-3 gap-3 bg-[#121214] border border-zinc-800/80 rounded-xl p-4 text-center">
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Total Questions</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{assessment?.questions?.length || 12} MCQs</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Allocated Time</span>
                <span className="text-sm font-bold text-white mt-0.5 block">30 Minutes</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Question Format</span>
                <span className="text-sm font-bold text-white mt-0.5 block">Code & Theory</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <Button onClick={handleStartTest} className="w-full max-w-sm py-3 text-xs font-semibold tracking-wider uppercase gap-2">
                Start 30-Min Assessment <Play className="w-4 h-4 fill-current" />
              </Button>
            </div>
          </Card>
          <Card className="space-y-5 border-brand/20 bg-gradient-to-br from-brand/10 via-[#121214] to-[#121214]">
            <div className="flex items-center gap-2"><History className="h-5 w-5 text-brand" /><div><h2 className="text-lg font-bold text-white">Assessment history & analysis</h2><p className="mt-1 text-xs text-zinc-500">Review previous attempts, strengths, weak areas, and recommended next steps.</p></div></div>
            {assessmentHistory.length ? <div className="space-y-3">{[...assessmentHistory].reverse().map((attempt, index) => <div key={attempt.id || attempt.createdAt || index} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><Badge variant="brand">{attempt.domain || 'All domains'}</Badge><Badge variant={attempt.score >= 75 ? 'success' : attempt.score >= 50 ? 'warning' : 'danger'}>{attempt.score}%</Badge><span className="text-sm font-semibold text-white">Assessment attempt {assessmentHistory.length - index}</span></div><p className="mt-1 text-[11px] text-zinc-500">{attempt.createdAt ? new Date(attempt.createdAt).toLocaleString() : 'Previous attempt'} · {attempt.correctCount}/{attempt.totalCount} correct</p></div><div className="flex items-center gap-1 text-xs text-zinc-400"><TrendingUp className="h-3.5 w-3.5 text-brand" />{attempt.score >= 75 ? 'Strong performance' : 'Keep building fundamentals'}</div></div><div className="mt-3 grid gap-3 sm:grid-cols-3"><div><span className="text-[10px] font-semibold uppercase text-accent-green">Strengths</span><p className="mt-1 text-xs text-zinc-300">{(attempt.strengths || []).join(', ') || 'Not recorded'}</p></div><div><span className="text-[10px] font-semibold uppercase text-accent-amber">Focus areas</span><p className="mt-1 text-xs text-zinc-300">{(attempt.weakAreas || []).join(', ') || 'No focus areas recorded'}</p></div><div><span className="text-[10px] font-semibold uppercase text-brand">Recommended skills</span><p className="mt-1 text-xs text-zinc-300">{(attempt.recommendedSkills || []).join(', ') || 'No recommendations recorded'}</p></div></div>{Object.keys(attempt.skillScores || {}).length ? <div className="mt-3 flex flex-wrap gap-2 border-t border-zinc-800 pt-3">{Object.entries(attempt.skillScores).map(([skill, score]) => <span key={skill} className="rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 text-[10px] text-blue-200">{skill}: {score}%</span>)}</div> : null}</div>)}</div> : <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-center text-sm text-zinc-500">No previous assessments yet. Complete your first assessment to start building your history.</div>}
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // ==========================================
  // ACTIVE TESTING ENVIRONMENT
  // ==========================================
  const currentQ = assessment.questions[currentQuestionIdx];
  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round(((currentQuestionIdx + 1) / assessment.questions.length) * 100);
  const isTimeLow = questionTimeLeft <= 10;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Test Header with Timer & Palette Toggle */}
        <div className="flex justify-between items-center bg-[#121214] border border-zinc-800 rounded-xl px-5 py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white">
              Question {currentQuestionIdx + 1} of {assessment.questions.length}
            </span>
            <Badge variant="outline" className="text-[10px]">
              {currentQ.category}
            </Badge>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
            isTimeLow 
              ? 'bg-red-500/10 border-red-500 text-red-400 animate-pulse' 
              : 'bg-accent-amber/10 border-accent-amber/30 text-accent-amber'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(questionTimeLeft)}</span>
          </div>
        </div>

        {integrityWarning && (
          <div className="flex items-start gap-3 rounded-xl border border-accent-amber/30 bg-accent-amber/10 px-4 py-3 text-xs text-accent-amber">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Tab switching is recorded for assessment integrity. Returning to another tab again will submit this attempt.</span>
            <span className="ml-auto shrink-0 font-semibold">{tabSwitchCount}/2</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-brand h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Interactive Question Palette Navigation Bar */}
        <div className="bg-[#121214] border border-zinc-800 rounded-xl p-3 flex items-center justify-between flex-wrap gap-2">
          <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Quick Navigation:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {assessment.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIdx;

              let btnStyle = 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700';
              if (isCurrent) btnStyle = 'bg-brand border-brand text-white font-bold ring-2 ring-brand/40';
              else if (isAnswered) btnStyle = 'bg-accent-green/20 border-accent-green/40 text-accent-green font-semibold';

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => { setCurrentQuestionIdx(idx); setQuestionTimeLeft(30); }}
                  className={`w-7 h-7 rounded-lg border text-xs flex items-center justify-center transition-all ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Question Card */}
        <Card className="p-6 sm:p-8 space-y-6">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Render Code Snippet if present */}
          {currentQ.codeSnippet && (
            <div className="bg-[#09090b] border border-zinc-800/80 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
              <pre>{currentQ.codeSnippet}</pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 pt-1">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = answers[currentQ.id] === oIdx;
              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, oIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all leading-normal ${
                    isSelected 
                      ? 'bg-brand/10 border-brand text-white font-semibold shadow-inner' 
                      : 'bg-background border-zinc-800 text-zinc-300 hover:border-zinc-700/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? 'border-brand bg-brand text-white' : 'border-zinc-700 bg-zinc-900 text-zinc-500'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Question Navigation Controls */}
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={() => { setCurrentQuestionIdx(prev => Math.max(0, prev - 1)); setQuestionTimeLeft(30); }}
            disabled={currentQuestionIdx === 0}
            variant="outline"
            className="gap-1 text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          <span className="text-xs text-zinc-500 font-semibold hidden sm:inline">
            Answered {answeredCount} / {assessment.questions.length}
          </span>

          {currentQuestionIdx < assessment.questions.length - 1 ? (
            <Button
              onClick={() => { setCurrentQuestionIdx(prev => prev + 1); setQuestionTimeLeft(30); }}
              className="gap-1 text-xs"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="primary"
              className="gap-1 text-xs font-semibold uppercase tracking-wider"
            >
              Submit Assessment
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
