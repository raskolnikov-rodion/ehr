'use strict';

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node scripts/serve-lh.mjs',
      startServerReadyPattern: 'Available on',
      startServerReadyTimeout: 60000,
      url: ['http://localhost:4200/login'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance':          ['error', { minScore: 0.8 }],
        'categories:accessibility':        ['error', { minScore: 0.9 }],
        'categories:best-practices':       ['error', { minScore: 0.9 }],
        'categories:seo':                  ['error', { minScore: 0.9 }],
        // CI file server / network conditions don't match production CDN
        'bf-cache':                        'warn',
        'document-latency-insight':        'warn',
        'network-dependency-tree-insight': 'warn',
        // Angular bundles include some non-executed code on the login page
        'unused-javascript':               ['warn', { maxLength: 5 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
