'use client';

import { useState } from 'react';
import { Body, Heading, Button } from '@assembly-js/design-system';

type Operation = 'listClients' | 'retrieveClient' | 'listCompanies' | 'retrieveCompany';

const OPERATIONS: { value: Operation; label: string; needsId: boolean }[] = [
  { value: 'listClients', label: 'List Clients', needsId: false },
  { value: 'retrieveClient', label: 'Get Client', needsId: true },
  { value: 'listCompanies', label: 'List Companies', needsId: false },
  { value: 'retrieveCompany', label: 'Get Company', needsId: true },
];

type HistoryEntry = {
  id: string;
  operation: Operation;
  resourceId?: string;
  timestamp: Date;
  duration: number;
  success: boolean;
  response: unknown;
};

export function RequestTester({ token }: { token?: string }) {
  const [operation, setOperation] = useState<Operation>('listClients');
  const [resourceId, setResourceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const selectedOp = OPERATIONS.find((op) => op.value === operation)!;

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation,
          id: selectedOp.needsId ? resourceId : undefined,
          token,
          limit: 5,
        }),
      });

      const data = await res.json();

      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        operation,
        resourceId: selectedOp.needsId ? resourceId : undefined,
        timestamp: new Date(),
        duration: data.duration ?? 0,
        success: data.success,
        response: data.success ? data.data : data.error,
      };

      setHistory((prev) => [entry, ...prev]);
    } catch (error) {
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        operation,
        resourceId: selectedOp.needsId ? resourceId : undefined,
        timestamp: new Date(),
        duration: 0,
        success: false,
        response: error instanceof Error ? error.message : 'Request failed',
      };

      setHistory((prev) => [entry, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  const getIdPlaceholder = () => {
    if (operation === 'retrieveClient') return 'Paste client ID from list results...';
    if (operation === 'retrieveCompany') return 'Paste company ID from list results...';
    return '';
  };

  return (
    <section>
      <div className="mb-4">
        <Heading size="xl">API Request Tester</Heading>
        <Body size="base" className="text-gray-500 mt-1">
          Try out Assembly API requests using the Node SDK
        </Body>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <Body size="sm" className="text-gray-500 mb-1">
              Operation
            </Body>
            <select
              value={operation}
              onChange={(e) => {
                setOperation(e.target.value as Operation);
                setResourceId('');
              }}
              className="block w-48 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {OPERATIONS.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>

          {selectedOp.needsId && (
            <div className="flex-1 min-w-64">
              <Body size="sm" className="text-gray-500 mb-1">
                ID
              </Body>
              <input
                type="text"
                value={resourceId}
                onChange={(e) => setResourceId(e.target.value)}
                placeholder={getIdPlaceholder()}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <Button
            variant="primary"
            label={loading ? 'Loading...' : 'Send Request'}
            onClick={handleSubmit}
            disabled={loading || (selectedOp.needsId && !resourceId)}
          />
        </div>
      </div>

      {history.length > 0 && (
        <div className="space-y-3">
          <Body size="sm" className="text-gray-500 font-medium">
            Request History
          </Body>
          {history.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      entry.success
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {entry.success ? 'Success' : 'Error'}
                  </span>
                  <Body size="sm" className="font-medium">
                    {OPERATIONS.find((op) => op.value === entry.operation)?.label}
                    {entry.resourceId && (
                      <span className="text-gray-500 ml-1">({entry.resourceId})</span>
                    )}
                  </Body>
                </div>
                <Body size="sm" className="text-gray-500">
                  {entry.duration}ms
                </Body>
              </div>
              <pre className="p-4 text-xs overflow-auto max-h-64 bg-gray-900 text-gray-100">
                {JSON.stringify(entry.response, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
