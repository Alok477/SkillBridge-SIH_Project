import { QUESTION_BANK } from '../data/assessmentQuestions';
import { apiRequest } from './api';

export const studentService = {
  getProfile: () => apiRequest('/api/profile'),

  updateProfile: (updatedData) => apiRequest('/api/profile', {
    method: 'PUT',
    body: JSON.stringify({ profile: updatedData }),
  }),

  addProject: async (project) => {
    const profile = await studentService.getProfile();
    const projects = [...(profile.projects || []), project];
    await studentService.updateProfile({ projects });
    return project;
  },

  saveResume: (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const resume = { name: file.name, type: file.type, dataUrl: reader.result };
        await studentService.updateProfile({ resume });
        resolve(resume);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Unable to read resume file.'));
    reader.readAsDataURL(file);
  }),

  getAssessment: async (domain = 'All') => {
    let selectedQuestions = [];
    if (domain && domain !== 'All' && QUESTION_BANK[domain]) {
      selectedQuestions = [...QUESTION_BANK[domain]];
    } else {
      Object.keys(QUESTION_BANK).forEach((category) => {
        const pool = QUESTION_BANK[category];
        if (pool?.length) selectedQuestions.push(...pool.slice(0, 2));
      });
      selectedQuestions = selectedQuestions.slice(0, 15);
    }
    return { durationMinutes: 30, questions: selectedQuestions };
  },

  startAssessment: (questionCount) => apiRequest(`/api/assessments/start?question_count=${questionCount}`, {
    method: 'POST',
  }),

  submitAssessment: async (answers, activeQuestions, attemptId, domain = 'All') => {
    const questions = activeQuestions || [];
    let correctCount = 0;
    const categoryScores = {};
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswerIndex) correctCount += 1;
      const category = question.category || 'General';
      if (!categoryScores[category]) categoryScores[category] = { correct: 0, total: 0 };
      categoryScores[category].total += 1;
      if (answers[question.id] === question.correctAnswerIndex) categoryScores[category].correct += 1;
    });
    const scorePct = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;
    const skillScores = Object.fromEntries(Object.entries(categoryScores).map(([category, result]) => [
      category,
      result.total ? Math.round((result.correct / result.total) * 100) : 0,
    ]));
    const feedback = {
      score: scorePct,
      correctCount,
      totalCount: questions.length,
      strengths: scorePct >= 75 ? ['Strong syntax comprehension', 'Version control fundamentals'] : ['Basic concepts clear'],
      weakAreas: scorePct < 100 ? ['Testing architectures', 'API boundary handling'] : [],
      recommendedSkills: scorePct < 75 ? ['React', 'JavaScript', 'Testing (Jest/Cypress)'] : ['Testing (Jest/Cypress)'],
      careerReadiness: scorePct,
      skillScores,
    };

    await apiRequest('/api/assessments', {
      method: 'POST',
      body: JSON.stringify({
        attempt_id: attemptId,
        score: scorePct,
        correct_count: correctCount,
        total_count: questions.length,
        strengths: feedback.strengths,
        weak_areas: feedback.weakAreas,
        recommended_skills: feedback.recommendedSkills,
        skill_scores: skillScores,
        domain,
      }),
    });
    return feedback;
  },

  getApplications: async () => {
    const data = await apiRequest('/api/applications');
    return data.map((application) => ({
      ...application,
      timeline: [
        { stage: 'Applied', date: application.appliedDate, current: application.status === 'Applied' },
        ...(application.status && application.status !== 'Applied'
          ? [{ stage: application.status, date: application.appliedDate, current: true }]
          : []),
      ],
    }));
  },

  applyForOpportunity: async (oppId) => apiRequest('/api/applications', {
    method: 'POST',
    body: JSON.stringify({ opportunity_id: oppId }),
  }),
};
