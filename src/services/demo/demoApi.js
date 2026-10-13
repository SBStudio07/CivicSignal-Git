import { demoIssues, demoUpdates } from './demoData';
import { DemoModeError } from '../errors';

const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 250));

export const listIssues = () => delay([...demoIssues]);
export const getIssue = (id) => delay(demoIssues.find((i) => i.id === id) ?? null);
export const listIssueUpdates = (id) => delay(demoUpdates[id] ?? []);

export const updateIssueStatus = async () => { throw new DemoModeError('Updating issues'); };
export const submitReport = async () => { throw new DemoModeError('Submitting reports'); };

export const signIn = async () => { throw new DemoModeError('Admin sign-in'); };
export const signOut = async () => {};
export const getSession = async () => null;
export const onAuthChange = () => () => {};
export const isAdminSession = () => false;
