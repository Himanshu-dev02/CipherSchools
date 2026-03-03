import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { getAssignmentById } from '../api/assignmentApi';
import { executeQuery } from '../api/executeApi';
import { getHint } from '../api/hintApi';
import ResultsTable from '../components/ResultsTable';
import HintCard from '../components/HintCard';
import './AssignmentEditor.scss';

const AssignmentEditor = () => {
    const { id } = useParams();

    // Assignment data
    const [assignment, setAssignment] = useState(null);
    const [loadingAssignment, setLoadingAssignment] = useState(true);

    // Editor state
    const [query, setQuery] = useState('-- Write your SQL query here\nSELECT ');

    // Execution state
    const [results, setResults] = useState(null);
    const [executing, setExecuting] = useState(false);
    const [execError, setExecError] = useState(null);

    // Hint state
    const [hint, setHint] = useState(null);
    const [hintLoading, setHintLoading] = useState(false);

    // Fetch assignment details on mount
    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const res = await getAssignmentById(id);
                setAssignment(res.data.data);
            } catch {
                setAssignment(null);
            } finally {
                setLoadingAssignment(false);
            }
        };
        fetchAssignment();
    }, [id]);

    /**
     * Execute the student's SQL query against the sandbox.
     */
    const handleExecute = async () => {
        setExecuting(true);
        setExecError(null);
        setResults(null);

        try {
            const res = await executeQuery(query);
            if (res.data.success) {
                setResults({
                    columns: res.data.columns,
                    rows: res.data.rows,
                    rowCount: res.data.rowCount,
                });
            }
        } catch (err) {
            const msg =
                err.response?.data?.error || 'Failed to execute query. Please try again.';
            setExecError(msg);
        } finally {
            setExecuting(false);
        }
    };

    /**
     * Get an AI-powered hint for the current query.
     */
    const handleGetHint = async () => {
        setHintLoading(true);
        setHint(null);

        try {
            const res = await getHint(query, assignment.question);
            if (res.data.success) {
                setHint(res.data.hint);
            }
        } catch {
            setHint('Unable to generate a hint right now. Please try again.');
        } finally {
            setHintLoading(false);
        }
    };

    /**
     * Handle keyboard shortcut: Ctrl/Cmd + Enter to execute.
     */
    const handleEditorMount = (editor) => {
        editor.addCommand(
            // Monaco KeyMod.CtrlCmd | Monaco KeyCode.Enter
            2048 | 3,
            handleExecute
        );
    };

    if (loadingAssignment) {
        return (
            <div className="page">
                <div className="container">
                    <div className="editor-page__loading">
                        <span className="spinner"></span>
                        <p>Loading assignment...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className="page">
                <div className="container">
                    <div className="editor-page__error">
                        <p>Assignment not found.</p>
                        <Link to="/" className="btn btn--secondary">
                            ← Back to Assignments
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page editor-page">
            <div className="container">
                {/* Back Link */}
                <Link to="/" className="editor-page__back">
                    ← Back to Assignments
                </Link>

                {/* Question Panel */}
                <section className="editor-page__panel editor-page__question">
                    <div className="editor-page__panel-header">
                        <h1 className="editor-page__title">{assignment.title}</h1>
                        <span
                            className={`editor-page__badge editor-page__badge--${assignment.difficulty.toLowerCase()}`}
                        >
                            {assignment.difficulty}
                        </span>
                    </div>
                    <p className="editor-page__question-text">{assignment.question}</p>
                </section>

                {/* Sample Data Viewer */}
                <section className="editor-page__panel editor-page__tables">
                    <h2 className="editor-page__section-title">📊 Available Tables</h2>
                    <div className="editor-page__table-tags">
                        {assignment.expectedTables.map((table) => (
                            <span key={table} className="editor-page__table-tag">
                                {table}
                            </span>
                        ))}
                    </div>
                    <p className="editor-page__table-hint">
                        Tip: Use <code>SELECT * FROM table_name LIMIT 5;</code> to preview table data.
                    </p>
                </section>

                {/* Monaco SQL Editor */}
                <section className="editor-page__panel editor-page__editor">
                    <h2 className="editor-page__section-title">✏️ SQL Editor</h2>
                    <div className="editor-page__monaco-wrapper">
                        <Editor
                            height="280px"
                            defaultLanguage="sql"
                            value={query}
                            onChange={(value) => setQuery(value || '')}
                            onMount={handleEditorMount}
                            theme="vs-dark"
                            options={{
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                minimap: { enabled: false },
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                wordWrap: 'on',
                                padding: { top: 12 },
                                suggestOnTriggerCharacters: true,
                                tabSize: 2,
                                renderLineHighlight: 'all',
                                automaticLayout: true,
                            }}
                        />
                    </div>
                    <div className="editor-page__shortcut">
                        Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to execute
                    </div>
                </section>

                {/* Action Buttons */}
                <div className="editor-page__actions">
                    <button
                        className="btn btn--success btn--lg"
                        onClick={handleExecute}
                        disabled={executing || !query.trim()}
                    >
                        {executing ? (
                            <>
                                <span className="spinner"></span> Executing...
                            </>
                        ) : (
                            '▶ Execute Query'
                        )}
                    </button>
                    <button
                        className="btn btn--secondary btn--lg"
                        onClick={handleGetHint}
                        disabled={hintLoading}
                    >
                        {hintLoading ? (
                            <>
                                <span className="spinner"></span> Thinking...
                            </>
                        ) : (
                            '💡 Get Hint'
                        )}
                    </button>
                </div>

                {/* Results Panel */}
                {execError && (
                    <section className="editor-page__panel editor-page__error-panel animate-fade-in">
                        <div className="editor-page__error-header">❌ Query Error</div>
                        <pre className="editor-page__error-body">{execError}</pre>
                    </section>
                )}

                {results && (
                    <section className="editor-page__panel animate-fade-in-up">
                        <h2 className="editor-page__section-title">📋 Results</h2>
                        <ResultsTable columns={results.columns} rows={results.rows} />
                    </section>
                )}

                {/* Hint Panel */}
                {(hint || hintLoading) && (
                    <section className="editor-page__panel">
                        <HintCard
                            hint={hint}
                            loading={hintLoading}
                            onClose={() => setHint(null)}
                        />
                    </section>
                )}
            </div>
        </div>
    );
};

export default AssignmentEditor;
