import {
  INITIAL_COMPANIES,
  INITIAL_USERS,
  INITIAL_EMPLOYEES,
  INITIAL_SKILLS,
  INITIAL_PROJECTS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_PERFORMANCE_RECORDS,
  INITIAL_FEEDBACK,
  INITIAL_ACTIVITIES,
} from '../services/data';

export const initialState = {
  // Authentication & Global
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  theme: 'light',
  
  // Relational Tables
  companies: INITIAL_COMPANIES,
  users: INITIAL_USERS,
  employees: INITIAL_EMPLOYEES,
  skills: INITIAL_SKILLS,
  projects: INITIAL_PROJECTS,
  achievements: INITIAL_ACHIEVEMENTS,
  performanceRecords: INITIAL_PERFORMANCE_RECORDS,
  feedback: INITIAL_FEEDBACK,
  activities: INITIAL_ACTIVITIES,

  // Notifications (Global/User-specific)
  notifications: [
    {
      id: 'notif_001',
      userId: 'user_emp_001',
      type: 'employment',
      title: 'Employment Status Updated',
      message: 'Your employment record has ended. Your verified career profile is now under your control.',
      read: false,
      createdAt: '2026-07-26T10:30:00Z',
      link: '/employee/privacy',
    }
  ],

  // Recruiter phase 3 state
  recruiter: {
    savedCandidates: [],
    hiringOpportunities: [],
    discoveryCount: 1,
    matchPercentage: 94,
    searchHistory: [],
  },
  profileViews: [],

  // Contact Us submissions (delivered to the platform administrator)
  contactMessages: [],

  // Demo mode overlay
  guidedDemo: {
    active: false,
    currentStep: 0,
    totalSteps: 8,
  },
};

export const appReducer = (state, action) => {
  switch (action.type) {
    // ---- AUTHENTICATION ----
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'SET_COMPANY':
      return {
        ...state,
        companies: [action.payload],
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };

    // ---- TENANT ISOLATED ENTITIES ----
    case 'REGISTER_COMPANY':
      return {
        ...state,
        companies: [...state.companies, action.payload.company],
        users: [...state.users, action.payload.user],
      };
    case 'APPROVE_COMPANY':
      return {
        ...state,
        companies: state.companies.map(c => 
          c.id === action.payload ? { ...c, verificationStatus: 'APPROVED', approvedAt: new Date().toISOString() } : c
        ),
      };
    case 'REJECT_COMPANY':
      return {
        ...state,
        companies: state.companies.map(c => 
          c.id === action.payload ? { ...c, verificationStatus: 'REJECTED', rejectedAt: new Date().toISOString() } : c
        ),
      };
    case 'SUSPEND_COMPANY':
      return {
        ...state,
        companies: state.companies.map(c => 
          c.id === action.payload ? { ...c, verificationStatus: 'SUSPENDED', suspendedAt: new Date().toISOString() } : c
        ),
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(e => e.id === action.payload.id ? { ...e, ...action.payload } : e),
      };
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'ADD_PERFORMANCE_RECORD':
      return { ...state, performanceRecords: [...state.performanceRecords, action.payload] };
    case 'ADD_ACHIEVEMENT':
      return { ...state, achievements: [...state.achievements, action.payload] };

    // ---- NOTIFICATIONS ----
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    
    // ---- CONTACT MESSAGES ----
    case 'SUBMIT_CONTACT_MESSAGE':
      return {
        ...state,
        contactMessages: [
          action.payload,
          ...(Array.isArray(state.contactMessages) ? state.contactMessages : []),
        ],
      };
    case 'MARK_CONTACT_READ':
      return {
        ...state,
        contactMessages: (Array.isArray(state.contactMessages) ? state.contactMessages : []).map((m) =>
          m.id === action.payload ? { ...m, status: 'READ' } : m
        ),
      };
    // Re-sync the contact inbox from the latest persisted value. Used when a
    // message is submitted in another tab/session so the admin sees it live.
    case 'SYNC_CONTACT_MESSAGES':
      return {
        ...state,
        contactMessages: Array.isArray(action.payload)
          ? action.payload
          : state.contactMessages,
      };

    // ---- ACTIVITIES ----
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };

    // ---- DEMO OVERLAY ----
    case 'START_DEMO':
      return {
        ...state,
        guidedDemo: { active: true, currentStep: 0, totalSteps: 8 },
      };
    case 'DEMO_NEXT':
      return {
        ...state,
        guidedDemo: {
          ...state.guidedDemo,
          currentStep: Math.min(state.guidedDemo.currentStep + 1, 7),
        },
      };
    case 'DEMO_PREV':
      return {
        ...state,
        guidedDemo: {
          ...state.guidedDemo,
          currentStep: Math.max(state.guidedDemo.currentStep - 1, 0),
        },
      };
    case 'EXIT_DEMO':
      return {
        ...state,
        guidedDemo: { active: false, currentStep: 0, totalSteps: 8 },
      };
    case 'RESET_DEMO':
      return {
        ...initialState,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      };

    default:
      return state;
  }
};