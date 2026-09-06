export interface WebMcpParameter {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface WebMcpToolMetadata {
  name: string;
  description: string;
  parameters: WebMcpParameter[];
  readOnlyHint?: boolean;
}

export interface WebMcpExecutionLog {
  id: string;
  toolName: string;
  timestamp: number;
  args: Record<string, unknown>;
  status: 'pending' | 'success' | 'error';
  result?: unknown;
  error?: string;
  durationMs?: number;
}
