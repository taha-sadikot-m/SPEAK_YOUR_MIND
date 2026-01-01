import React from 'react';

export enum PlatformMode {
  DEBATE = 'DEBATE',
  INTERVIEW = 'INTERVIEW'
}

export enum UserType {
  PERSONAL = 'PERSONAL',
  ORGANIZATION = 'ORGANIZATION',
  ORG_ADMIN = 'ORG_ADMIN',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN'
}

export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  DEBATE_DASHBOARD = 'DEBATE_DASHBOARD',
  INTERVIEW_DASHBOARD = 'INTERVIEW_DASHBOARD',
  USER_PROFILE = 'USER_PROFILE',
  ORG_MEMBER_PROFILE = 'ORG_MEMBER_PROFILE',
  // Admin Views
  SYSTEM_ADMIN_DASHBOARD = 'SYSTEM_ADMIN_DASHBOARD',
  ORG_ADMIN_DASHBOARD = 'ORG_ADMIN_DASHBOARD',
  // Debate Sub-views
  DEBATE_PRACTICE = 'DEBATE_PRACTICE',
  DEBATE_PVP = 'DEBATE_PVP',
  DEBATE_EVENTS = 'DEBATE_EVENTS',
  DEBATE_SPECTATE = 'DEBATE_SPECTATE',
  // Prepare Sub-views
  PREPARE_COURSE = 'PREPARE_COURSE'
}

export interface Course {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  ageGroup: string;
  icon: React.ReactNode;
  color: string;
  schedule: {
    day: string;
    time: string;
    platform: 'Zoom' | 'Meet';
  }[];
}

export interface PlaygroundResponse {
  text: string;
  loading: boolean;
  error?: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}