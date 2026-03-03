import './HintCard.scss';

/**
 * Displays an AI-generated hint in a styled card.
 * Shows a loading state while the hint is being fetched.
 */
const HintCard = ({ hint, loading, onClose }) => {
    if (!hint && !loading) return null;

    return (
        <div className="hint-card animate-fade-in-up">
            <div className="hint-card__header">
                <div className="hint-card__title">
                    <span className="hint-card__icon">💡</span>
                    AI Hint
                </div>
                {onClose && (
                    <button className="hint-card__close" onClick={onClose} aria-label="Close hint">
                        ✕
                    </button>
                )}
            </div>
            <div className="hint-card__body">
                {loading ? (
                    <div className="hint-card__loading">
                        <span className="spinner"></span>
                        <span>Thinking...</span>
                    </div>
                ) : (
                    <p className="hint-card__text">{hint}</p>
                )}
            </div>
            <div className="hint-card__footer">
                <span className="hint-card__disclaimer">
                    💬 This is a guiding hint — not the full answer. Try solving it yourself!
                </span>
            </div>
        </div>
    );
};

export default HintCard;
