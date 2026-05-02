import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 z-[9999] bg-red-900 text-white p-6 overflow-auto">
                    <h2 className="text-xl font-bold mb-4">モバイルエラー検出</h2>
                    <p className="mb-4">画面が真っ白になるエラーをキャッチしました。</p>
                    <div className="bg-black/50 p-4 rounded text-xs break-all">
                        <p className="text-red-300 font-bold mb-2">{this.state.error?.toString()}</p>
                        <pre className="whitespace-pre-wrap">{this.state.errorInfo?.componentStack}</pre>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
