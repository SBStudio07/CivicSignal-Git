import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services';
import { computeStats } from '@/lib/issueUtils';

export const issueKeys = {
  all: ['issues'],
  detail: (id) => ['issues', id],
  updates: (id) => ['issues', id, 'updates'],
};

export const useIssues = () => useQuery({ queryKey: issueKeys.all, queryFn: api.listIssues });

export const useIssue = (id) => useQuery({
  queryKey: issueKeys.detail(id),
  queryFn: () => api.getIssue(id),
  enabled: Boolean(id),
});

export const useIssueUpdates = (id) => useQuery({
  queryKey: issueKeys.updates(id),
  queryFn: () => api.listIssueUpdates(id),
  enabled: Boolean(id),
});

/** Public stats are derived from the same issue list the map uses. */
export function useStats() {
  const query = useIssues();
  const stats = useMemo(() => (query.data ? computeStats(query.data) : null), [query.data]);
  return { ...query, stats };
}

export function useSubmitReport() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: api.submitReport,
    onSuccess: () => client.invalidateQueries({ queryKey: issueKeys.all }),
  });
}

export function useUpdateIssueStatus() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: api.updateIssueStatus,
    onSuccess: () => client.invalidateQueries({ queryKey: issueKeys.all }),
  });
}
