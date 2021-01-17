export interface GhIssuesSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GhIssuesSearchItem[];
}

export interface GhIssuesSearchItem {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GhIssuesSearchUser;
  labels: GhIssuesSearchLabel[];
  state: string;
  locked: boolean;
  assignee: null;
  assignees: any[];
  milestone: null;
  comments: number;
  created_at: GhIssuesSearchDate;
  updated_at: GhIssuesSearchDate;
  closed_at: null;
  author_association: string;
  active_lock_reason: null;
  body: string;
  performed_via_github_app: null;
  score: number;
}

export interface GhIssuesSearchLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: null | string;
}

export interface GhIssuesSearchUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

type GhIssuesSearchDate = string;
