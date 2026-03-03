import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAssignments } from '../api/assignmentApi';
import './AssignmentList.scss';

const DIFFICULTY_ORDER = { Easy: 1, Medium: 2, Hard: 3 };

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await getAssignments();
                setAssignments(res.data.data);
            } catch (err) {
                setError('Failed to load assignments. Is the backend running?');
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    if (loading) {
        return (
            <div className="page">
                <div className="container">
                    <div className="assignment-list__loading">
                        <span className="spinner"></span>
                        <p>Loading assignments...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <div className="container">
                    <div className="assignment-list__error">
                        <span className="assignment-list__error-icon">⚠️</span>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                {/* Hero Section */}
                <div className="assignment-list__hero">
                    <h1 className="assignment-list__title">SQL Assignments</h1>
                    <p className="assignment-list__subtitle">
                        Master SQL through hands-on practice. Select an assignment to begin writing queries.
                    </p>
                    <div className="assignment-list__stats">
                        <div className="assignment-list__stat">
                            <span className="assignment-list__stat-value">{assignments.length}</span>
                            <span className="assignment-list__stat-label">Assignments</span>
                        </div>
                        <div className="assignment-list__stat">
                            <span className="assignment-list__stat-value">
                                {assignments.filter((a) => a.difficulty === 'Easy').length}
                            </span>
                            <span className="assignment-list__stat-label">Easy</span>
                        </div>
                        <div className="assignment-list__stat">
                            <span className="assignment-list__stat-value">
                                {assignments.filter((a) => a.difficulty === 'Medium').length}
                            </span>
                            <span className="assignment-list__stat-label">Medium</span>
                        </div>
                        <div className="assignment-list__stat">
                            <span className="assignment-list__stat-value">
                                {assignments.filter((a) => a.difficulty === 'Hard').length}
                            </span>
                            <span className="assignment-list__stat-label">Hard</span>
                        </div>
                    </div>
                </div>

                {/* Assignment Cards Grid */}
                <div className="grid grid--cards">
                    {assignments.map((assignment, idx) => (
                        <div
                            key={assignment._id}
                            className="assignment-card animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.08}s` }}
                        >
                            <div className="assignment-card__top">
                                <span
                                    className={`assignment-card__badge assignment-card__badge--${assignment.difficulty.toLowerCase()}`}
                                >
                                    {assignment.difficulty}
                                </span>
                            </div>
                            <h3 className="assignment-card__title">{assignment.title}</h3>
                            <p className="assignment-card__desc">{assignment.description}</p>
                            <Link
                                to={`/assignment/${assignment._id}`}
                                className="btn btn--primary assignment-card__btn"
                            >
                                Start Assignment →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssignmentList;
