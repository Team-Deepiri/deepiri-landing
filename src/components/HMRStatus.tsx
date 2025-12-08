import { useEffect, useState } from 'react';
import './HMRStatus.css';

function HMRStatus() {
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Listen for HMR updates
    if (import.meta.hot) {
      const handleBeforeUpdate = () => {
        setUpdateCount(prev => prev + 1);
        setLastUpdate(new Date());
      };

      const handleError = () => {
        setIsConnected(false);
      };

      const handleConnect = () => {
        setIsConnected(true);
      };

      const handleDisconnect = () => {
        setIsConnected(false);
      };

      import.meta.hot.on('vite:beforeUpdate', handleBeforeUpdate);
      import.meta.hot.on('vite:error', handleError);
      import.meta.hot.on('vite:ws:connect', handleConnect);
      import.meta.hot.on('vite:ws:disconnect', handleDisconnect);

      // Cleanup
      return () => {
        if (import.meta.hot) {
          import.meta.hot.off('vite:beforeUpdate', handleBeforeUpdate);
          import.meta.hot.off('vite:error', handleError);
          import.meta.hot.off('vite:ws:connect', handleConnect);
          import.meta.hot.off('vite:ws:disconnect', handleDisconnect);
        }
      };
    }
  }, []);

  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className={`hmr-status ${isConnected ? 'connected' : 'disconnected'}`}>
      <div className="hmr-indicator">
        <span className="hmr-dot"></span>
        <span className="hmr-text">
          HMR {isConnected ? 'Active' : 'Disconnected'}
        </span>
      </div>
      {updateCount > 0 && (
        <div className="hmr-info">
          <span className="hmr-count">{updateCount} updates</span>
          {lastUpdate && (
            <span className="hmr-time">
              {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default HMRStatus;

